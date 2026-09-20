/**
 * Pulls a single named file out of a zip archive.
 *
 * An APK is just a zip, and we only ever need one entry out of it
 * (`AndroidManifest.xml`), so this reads that one entry instead of unpacking
 * the whole 48 MB file. Keeping it here means the rest of the release tooling
 * never has to know how a zip is laid out.
 */

import {inflateRawSync} from 'node:zlib';

/** Signature bytes that mark each kind of record inside a zip file. */
const SIGNATURE = {
  endOfCentralDirectory: 0x06054b50,
  centralDirectoryEntry: 0x02014b50,
} as const;

/** Compression methods we can read. Anything else we refuse rather than guess. */
const COMPRESSION = {
  stored: 0,
  deflated: 8,
} as const;

/** A zip file can end with a comment, so the final record is at most this far from the end. */
const MAX_END_RECORD_SEARCH = 0xffff + 22;

/** Set in the size fields when the real numbers live in a zip64 record we do not parse. */
const ZIP64_MARKER = 0xffffffff;

/** Where one entry's data starts and how it is packed. */
interface EntryLocation {
  readonly localHeaderOffset: number;
  readonly compressionMethod: number;
  readonly compressedSize: number;
}

/**
 * Reads one file out of `archive` by its exact path inside the zip.
 * Returns null when the archive has no such entry.
 */
export function readZipEntry(archive: Buffer, entryPath: string): Buffer | null {
  const location = findEntry(archive, entryPath);
  if (location === null) return null;
  return decompress(archive, location);
}

/** Walks the zip's table of contents looking for one path. */
function findEntry(archive: Buffer, entryPath: string): EntryLocation | null {
  const directory = locateCentralDirectory(archive);
  let cursor = directory.offset;

  for (let index = 0; index < directory.entryCount; index += 1) {
    if (archive.readUInt32LE(cursor) !== SIGNATURE.centralDirectoryEntry) {
      throw new Error('Corrupt zip: central directory entry has the wrong signature.');
    }

    const nameLength = archive.readUInt16LE(cursor + 28);
    const extraLength = archive.readUInt16LE(cursor + 30);
    const commentLength = archive.readUInt16LE(cursor + 32);
    const name = archive.toString('utf8', cursor + 46, cursor + 46 + nameLength);

    if (name === entryPath) {
      return {
        localHeaderOffset: archive.readUInt32LE(cursor + 42),
        compressionMethod: archive.readUInt16LE(cursor + 10),
        compressedSize: archive.readUInt32LE(cursor + 20),
      };
    }

    cursor += 46 + nameLength + extraLength + commentLength;
  }

  return null;
}

/** Finds the record at the end of the zip that says where the table of contents is. */
function locateCentralDirectory(archive: Buffer): {offset: number; entryCount: number} {
  const searchStart = Math.max(0, archive.length - MAX_END_RECORD_SEARCH);

  for (let cursor = archive.length - 22; cursor >= searchStart; cursor -= 1) {
    if (archive.readUInt32LE(cursor) !== SIGNATURE.endOfCentralDirectory) continue;

    const entryCount = archive.readUInt16LE(cursor + 10);
    const offset = archive.readUInt32LE(cursor + 16);
    if (offset === ZIP64_MARKER) {
      throw new Error('This APK uses the zip64 format, which this reader does not support.');
    }
    return {offset, entryCount};
  }

  throw new Error('Not a zip file: no end-of-central-directory record found.');
}

/** Reads and, if needed, inflates one entry's bytes. */
function decompress(archive: Buffer, location: EntryLocation): Buffer {
  // The local header repeats the name and extra fields with their own lengths,
  // and those lengths can differ from the central directory's, so read them here.
  const nameLength = archive.readUInt16LE(location.localHeaderOffset + 26);
  const extraLength = archive.readUInt16LE(location.localHeaderOffset + 28);
  const dataStart = location.localHeaderOffset + 30 + nameLength + extraLength;
  const raw = archive.subarray(dataStart, dataStart + location.compressedSize);

  if (location.compressionMethod === COMPRESSION.stored) return Buffer.from(raw);
  if (location.compressionMethod === COMPRESSION.deflated) return inflateRawSync(raw);

  throw new Error(`Unsupported zip compression method: ${location.compressionMethod}.`);
}
