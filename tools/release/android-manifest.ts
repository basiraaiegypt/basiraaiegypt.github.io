/**
 * Reads the version fields out of an APK's `AndroidManifest.xml`.
 *
 * Android stores that file as packed binary, not text, so it has to be decoded
 * before the values are readable. We only want a handful of attributes, so this
 * decoder walks the chunks, keeps the string table, and reads the attributes of
 * the two elements we care about (`manifest` and `uses-sdk`). Everything else in
 * the file is skipped.
 *
 * Format reference: AOSP `ResourceTypes.h`.
 */

/** Chunk types that appear in a binary XML file. */
const CHUNK = {
  stringPool: 0x0001,
  startElement: 0x0102,
} as const;

/** Attribute value types we read. Others are ignored. */
const VALUE_TYPE = {
  string: 0x03,
  intDec: 0x10,
  intHex: 0x11,
} as const;

/** Set in the string pool flags when entries are UTF-8 rather than UTF-16. */
const UTF8_FLAG = 1 << 8;

/** Each attribute record inside a start-element chunk is this many bytes. */
const ATTRIBUTE_SIZE = 20;

/** Bytes from the start of a start-element chunk to its body (chunk header + line + comment). */
const ELEMENT_BODY_OFFSET = 16;

/** Marks "no string" in an index field. */
const NO_STRING = 0xffffffff;

/** The fields we lift out of the manifest. Null means the APK did not declare it. */
export interface AndroidManifestInfo {
  readonly packageId: string | null;
  readonly versionName: string | null;
  readonly versionCode: number | null;
  readonly minSdkVersion: number | null;
}

/** One decoded attribute: its name and whichever of the two value kinds applies. */
interface DecodedAttribute {
  readonly name: string;
  readonly stringValue: string | null;
  readonly intValue: number | null;
}

/** Decodes a binary `AndroidManifest.xml` into the few fields the site shows. */
export function readAndroidManifest(binaryXml: Buffer): AndroidManifestInfo {
  const strings = readStringPool(binaryXml);

  let packageId: string | null = null;
  let versionName: string | null = null;
  let versionCode: number | null = null;
  let minSdkVersion: number | null = null;

  forEachElement(binaryXml, strings, (elementName, attributes) => {
    if (elementName === 'manifest') {
      packageId = attributes.get('package')?.stringValue ?? packageId;
      versionName = attributes.get('versionName')?.stringValue ?? versionName;
      versionCode = attributes.get('versionCode')?.intValue ?? versionCode;
    }
    if (elementName === 'uses-sdk') {
      minSdkVersion = attributes.get('minSdkVersion')?.intValue ?? minSdkVersion;
    }
  });

  return {packageId, versionName, versionCode, minSdkVersion};
}

/**
 * Walks every chunk in the file and calls `visit` for each start element.
 * Chunks carry their own length, so unknown ones are stepped over safely.
 */
function forEachElement(
  binaryXml: Buffer,
  strings: readonly string[],
  visit: (name: string, attributes: Map<string, DecodedAttribute>) => void,
): void {
  // The first 8 bytes are the file header (magic + total size); chunks follow.
  let cursor = 8;

  while (cursor + 8 <= binaryXml.length) {
    const chunkType = binaryXml.readUInt16LE(cursor);
    const chunkSize = binaryXml.readUInt32LE(cursor + 4);
    if (chunkSize < 8) break; // A zero-length chunk would loop forever.

    if (chunkType === CHUNK.startElement) {
      const name = stringAt(strings, binaryXml.readUInt32LE(cursor + 20));
      if (name !== null) visit(name, readAttributes(binaryXml, strings, cursor));
    }

    cursor += chunkSize;
  }
}

/** Reads the attribute records that follow a start-element header. */
function readAttributes(
  binaryXml: Buffer,
  strings: readonly string[],
  elementStart: number,
): Map<string, DecodedAttribute> {
  const attributesOffset = binaryXml.readUInt16LE(elementStart + 24);
  const attributeCount = binaryXml.readUInt16LE(elementStart + 28);
  const attributes = new Map<string, DecodedAttribute>();

  for (let index = 0; index < attributeCount; index += 1) {
    // `attributesOffset` is counted from the element body, which starts after
    // the chunk header and line/comment fields.
    const at = elementStart + ELEMENT_BODY_OFFSET + attributesOffset + index * ATTRIBUTE_SIZE;
    if (at + ATTRIBUTE_SIZE > binaryXml.length) break;

    const name = stringAt(strings, binaryXml.readUInt32LE(at + 4));
    if (name === null) continue;

    const valueType = binaryXml.readUInt8(at + 15);
    const rawValue = binaryXml.readUInt32LE(at + 16);
    const isInteger = valueType === VALUE_TYPE.intDec || valueType === VALUE_TYPE.intHex;

    attributes.set(name, {
      name,
      // A string attribute stores an index into the pool, not the text itself.
      stringValue: valueType === VALUE_TYPE.string ? stringAt(strings, rawValue) : null,
      intValue: isInteger ? rawValue : null,
    });
  }

  return attributes;
}

/** Looks up a pool index, treating the "no string" marker and out-of-range as null. */
function stringAt(strings: readonly string[], index: number): string | null {
  if (index === NO_STRING || index >= strings.length) return null;
  return strings[index];
}

/**
 * Reads the file's string table. Every name and text value in the document is an
 * index into this list, so it has to be decoded before anything else makes sense.
 */
function readStringPool(binaryXml: Buffer): readonly string[] {
  const poolStart = findStringPoolChunk(binaryXml);
  if (poolStart === null) return [];

  const stringCount = binaryXml.readUInt32LE(poolStart + 8);
  const flags = binaryXml.readUInt32LE(poolStart + 16);
  const stringsStart = poolStart + binaryXml.readUInt32LE(poolStart + 20);
  const isUtf8 = (flags & UTF8_FLAG) !== 0;
  const offsetTable = poolStart + 28;

  const strings: string[] = [];
  for (let index = 0; index < stringCount; index += 1) {
    const at = stringsStart + binaryXml.readUInt32LE(offsetTable + index * 4);
    strings.push(isUtf8 ? readUtf8String(binaryXml, at) : readUtf16String(binaryXml, at));
  }
  return strings;
}

/** Finds the string-pool chunk, which is normally the first chunk after the header. */
function findStringPoolChunk(binaryXml: Buffer): number | null {
  let cursor = 8;
  while (cursor + 8 <= binaryXml.length) {
    const chunkType = binaryXml.readUInt16LE(cursor);
    const chunkSize = binaryXml.readUInt32LE(cursor + 4);
    if (chunkSize < 8) return null;
    if (chunkType === CHUNK.stringPool) return cursor;
    cursor += chunkSize;
  }
  return null;
}

/**
 * UTF-8 entries store two lengths: the character count, then the byte count.
 * Only the byte count matters for slicing.
 */
function readUtf8String(binaryXml: Buffer, at: number): string {
  const afterCharCount = skipUtf8Length(binaryXml, at);
  const byteLength = readUtf8Length(binaryXml, afterCharCount);
  const textStart = skipUtf8Length(binaryXml, afterCharCount);
  return binaryXml.toString('utf8', textStart, textStart + byteLength);
}

/** UTF-16 entries store the character count, then that many 2-byte units. */
function readUtf16String(binaryXml: Buffer, at: number): string {
  let length = binaryXml.readUInt16LE(at);
  let textStart = at + 2;
  // A length over 0x7fff is written across two 16-bit words.
  if ((length & 0x8000) !== 0) {
    length = ((length & 0x7fff) << 16) | binaryXml.readUInt16LE(textStart);
    textStart += 2;
  }
  return binaryXml.toString('utf16le', textStart, textStart + length * 2);
}

/** Reads one UTF-8 length field, which is 1 byte, or 2 when the high bit is set. */
function readUtf8Length(binaryXml: Buffer, at: number): number {
  const first = binaryXml.readUInt8(at);
  if ((first & 0x80) === 0) return first;
  return ((first & 0x7f) << 8) | binaryXml.readUInt8(at + 1);
}

/** Returns the offset just past one UTF-8 length field. */
function skipUtf8Length(binaryXml: Buffer, at: number): number {
  return (binaryXml.readUInt8(at) & 0x80) === 0 ? at + 1 : at + 2;
}
