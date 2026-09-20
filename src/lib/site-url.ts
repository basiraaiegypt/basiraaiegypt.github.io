/**
 * Turns a path stored in the release manifest into a URL the browser can use.
 *
 * The site is not always served from the root of a domain. On GitHub Pages a
 * project site lives at `https://<user>.github.io/<repo>/`, so `/download/x.apk`
 * would point at the wrong place entirely. Vite knows the prefix it was built
 * with and exposes it as `BASE_URL` (always ending in `/`), so every link the
 * page builds at runtime goes through here.
 *
 * Links written straight into JSX or `index.html` do not need this — Vite
 * rewrites those itself at build time.
 */
export function siteUrl(pathFromRoot: string): string {
  return `${import.meta.env.BASE_URL}${pathFromRoot}`;
}
