# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Repository purpose

Shared UI package (`@isotc211/astro-ui`) replacing the `jekyll-theme-isotc211` Ruby gem for the ISO/TC 211 sites migration (Astro 7 + Vite 8 + Vue islands + Tailwind 4). See epic ISO-TC211/schemas-isotc211.github.io#98 and child issue #93.

## Commands

```sh
pnpm install
pnpm dev      # playground dev server
pnpm build    # playground production build — the integration gate
pnpm check    # astro check
pnpm changeset  # record a change for the next release
```

## Architecture

- pnpm workspace: `packages/astro-ui` (published package) + `packages/playground` (integration-test site, template for site ports).
- **Ship unbundled source**: `packages/astro-ui/package.json` `exports` maps point directly at `.astro` / `.vue` / `.ts` / `.css` files. No build step for the package. `sideEffects: ["**/*.css"]` keeps CSS imports alive.
- `peerDependencies`: `astro ^7`, `vue ^3.5`, `tailwindcss ^4`, `@tailwindcss/typography ^0.5`. No runtime dependencies.
- Ports come from `jekyll-theme-isotc211` (`../jekyll-theme-isotc211/` locally): `src/theme.css` = the gem's `application.css` (Tailwind 4 preset: typography plugin, `@custom-variant dark (&:where(.dark, .dark *))`, `@theme` tokens — Inter/Noto Sans Mono, `--color-primary-50..900` with 500=#0061ad); `src/components/*.css` = verbatim ports of the gem's `css/{header,footer,typography,page,home}.css` (BEM, ISO red #e3000f in header.css).
- `BaseLayout.astro` reproduces the gem `head.html` contract in order: meta/title, description (160-char truncation), favicons, `<script is:inline>` FOUC script (byte-identical, `iso-tc211-theme` localStorage key — legacy visitors keep their preference), Google Fonts, `head` slot, inline critical CSS (fixed `#nav-header` 64px, body overrides), GA (prod only via `loadGtag`).
- `ThemeToggle.vue` is the only client island (`client:load`); it wires its own handler through `useTheme` (port of `theme.js`, including `window.__theme` parity and OS-preference sync). No global inline toggle script.
- `Header.astro`/`Footer.astro` are server-rendered; external links (`://`) get `target="_blank" rel="noopener"`; footer social icons switch on twitter/github substrings; awards banner renders `config.awards[0]`.

## Rules

- **No utility classes in package templates.** Package markup must rely on the BEM component classes in `src/components/*.css`. Tailwind 4 does not scan node_modules; consumers add `@source "../node_modules/@isotc211/astro-ui"` only as a safety net — do not lean on it.
- **Keep the dark-mode contract stable**: `iso-tc211-theme` key, `html.dark` class, FOUC-before-paint.
- CSS changes: prefer editing the verbatim-ported files only when the gem behavior requires it; keep diffs against the gem reviewable.
- Releases: changesets only. The version is a product decision — never bump a major/minor without the owner's explicit number.
