# astro-ui

Shared frontend for ISO/TC 211 Astro sites — the successor to the `jekyll-theme-isotc211` gem. Target stack: **Astro 7 + Vite 8 + Vue islands + Tailwind 4**.

## Layout

- `packages/astro-ui/` — the publishable npm package `@isotc211/astro-ui`
- `packages/playground/` — private Astro site consuming the package via `workspace:*`; living integration test and the copy-paste template for site ports

## Development

```sh
pnpm install
pnpm dev       # playground dev server
pnpm build     # playground production build (integration gate)
pnpm check     # astro check
```

Releases via [changesets](https://github.com/changesets/changesets): open a PR with `pnpm changeset`, merge the automated Version PR on `main` to publish.

## Rules

- **Ship unbundled source** — `exports` points at `.astro`/`.vue`/`.ts`/`.css` sources; the consuming site's Vite pipeline compiles them. Do not add a library build step.
- **No utility classes in package templates** — package markup uses BEM component classes from `src/components/*.css`. If a utility is unavoidable inside a package template, the consuming site's Tailwind must scan this package (`@source "../node_modules/@isotc211/astro-ui"`) — prefer avoiding utilities entirely.
- CSS is ported verbatim from the gem where possible; keep the dark variant (`@custom-variant dark`), the `@theme` tokens, and the `iso-tc211-theme` localStorage key stable — existing visitors' preferences depend on them.
