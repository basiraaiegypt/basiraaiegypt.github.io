# Basira AI — download site

A one-page site that hands out the Basira AI Android app. It replaced the old
web app: the product now lives in the [`basira-app`](../basira-app) Flutter
project, and this site exists only to let people install it.

## Running it

```
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
npm run preview  # serve the built site
```

`dist/` is plain static files — any static host will serve it.

## Deploying

The site is published to GitHub Pages at **https://basiraaiegypt.github.io/**.

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
deploys it on every push to `main`. It needs one switch thrown by hand, once:
**Settings → Pages → Source → GitHub Actions**.

The one setting that matters is `BASE_PATH`, the URL prefix the site is served
under. This repository is named `basiraaiegypt.github.io`, which GitHub serves
at the root of the domain, so `BASE_PATH` is `/`. Move the site into an
ordinary repository and GitHub serves it from `https://<org>.github.io/<repo>/`
instead — then `BASE_PATH` has to become `/<repo>/` to match.

Locally `BASE_PATH` is unset and defaults to `/`, which is already right.

### Why not Cloudflare

An earlier version of this site was served from a Cloudflare Worker. Cloudflare
caps a single static asset at 25 MiB and the APK is roughly twice that, so the
download could not be served from there at all. GitHub Pages allows 1 GB per
site and GitHub blocks files only above 100 MiB, which leaves plenty of room.
If the site ever moves back to Cloudflare, the APK has to move somewhere else
first — a GitHub Release asset or an R2 bucket.

## Publishing a new app build

Put the new `.apk` in `public/download/` and build. Nothing else to change —
the version, size, release date and checksum on the page all come from that
file. Full rules in [`docs/swapping-the-apk.md`](docs/swapping-the-apk.md).

## How the pieces fit

The site has one moving part: the APK's details have to reach the page without
anyone typing them in.

```
public/download/app-release.apk
        │  read at build time by tools/release
        ▼
public/download/release-manifest.json   (generated, gitignored)
        │  fetched by the page at runtime
        ▼
src/hooks/useRelease.ts → the download button and the details table
```

`shared/release.ts` holds the shape of that JSON file and is imported by both
sides, so the writer and the reader cannot drift apart. The paths it stores are
relative to the site root, and `src/lib/site-url.ts` prefixes them with
whatever `BASE_PATH` the site was built for.

### Folders

| Path            | What lives there                                                      |
| --------------- | --------------------------------------------------------------------- |
| `public/download/` | The APK to publish, and the manifest generated from it. Published as-is, so nothing else goes here |
| `public/logo/`  | Brand images                                                           |
| `shared/`       | Types and paths used by both the build tooling and the site            |
| `tools/release/`| Reads an APK and writes the manifest                                   |
| `tools/vite/`   | Hooks that into `vite dev` and `vite build`                            |
| `src/config/`   | Brand facts and section anchors, written once                          |
| `src/content/`  | Page copy as data: features, install steps, FAQ, detail rows           |
| `src/lib/`      | Formatting, and the icon and accent registries                         |
| `src/components/` | UI, grouped by `ui/` primitives, `layout/`, `download/`, `sections/` |

### Changing the page

Most edits are data, not code:

- A feature card → `src/content/features.ts`
- An install step → `src/content/install-steps.ts`
- A question → `src/content/faq.ts`
- A row in the download details → `src/content/release-facts.ts`
- The name, tagline or support address → `src/config/site.ts`
- A colour → the `@theme` block in `src/index.css`, which is the only place
  colours are defined

## A note on repo size

The APK is committed, which is what makes "swap the file and build" work. It
also means every published version stays in the git history at around 49 MB
each. That is fine for a handful of releases. If the history gets heavy, move
the APK to Git LFS — the workflow keeps working, as long as checkout fetches
LFS files.

## Reading the APK

`tools/release/` opens the APK (a zip) and decodes `AndroidManifest.xml`, which
Android stores as packed binary rather than text. That is where the version
name, version code, package id and minimum Android level come from. If a future
APK is built in some way the decoder cannot read, those fields come back empty
and the page quietly shows fewer rows — the download itself still works.

## Licence

Proprietary — see [LICENSE](LICENSE). The code is public so the app can be
downloaded, not so it can be reused. Nothing here may be copied, modified or
redistributed without written permission.

Note that a public GitHub repository can be viewed and forked by any GitHub
user whatever the licence says; that is a condition of GitHub's Terms of
Service, not a permission this project grants.
