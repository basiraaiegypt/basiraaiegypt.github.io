# Swapping in a new APK

`public/download/` is the one place the published app lives. Everything the website
says about the app — version, size, release date, minimum Android, checksum —
is read out of the APK sitting in it.

## The steps

1. Delete the old `.apk` from `public/download/`.
2. Copy the new one in. Any file name works.
3. Run `npm run build` (or `npm run dev`).

That is the whole job. The build renames the file to `basira-ai.apk`, regenerates
`release-manifest.json` from it, and the page picks up the new version, size,
date and checksum.

## The published name

Whatever you drop in is renamed to **`basira-ai.apk`**, which is also the name
the browser saves it under. `flutter build apk` always produces
`app-release.apk`, and that name says nothing once it is in somebody's downloads
folder next to everything else they have installed.

The name is written once, as `PUBLISHED_APK_NAME` in `shared/release.ts`. Change
it there and the next build renames the file to match.

While `npm run dev` is running you do not even need step 3: the folder is
watched, so dropping a new APK in reloads the page with the new details.

## Rules

- **Exactly one `.apk` at a time.** With none there is nothing to publish, and
  with two there is no way to tell which one is meant, so the build stops and
  says so instead of guessing.
- **Do not edit `release-manifest.json`.** It is generated, it is gitignored,
  and your changes are overwritten on the next build. Change the APK instead.

## Size ceiling

GitHub blocks any file over 100 MiB and warns above 50 MiB, and a published
Pages site may total 1 GB. Today's APK is about 47 MiB, so there is room, but
an APK that grows past 100 MiB cannot be committed at all. At that point the
file has to move to a GitHub Release asset or Git LFS, and the download button
has to point there instead.

## Regenerating on its own

```
npm run release:manifest
```

Useful in CI, or to check what the page will say before building the site.
