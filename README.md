# Hello, world!

A plain hello world website with an original, eight-armed SVG octopus centered on the screen. Select **Say hello** to receive a greeting, then **Start again** to reset it.

Text, colors and buttons keep their browser-default appearance. The small stylesheet only positions the content, fits the drawing to the screen, reserves space for the reply and gives the button a comfortable target. Plain HTML and TypeScript keep this small interaction simple; Vite produces the static export.

## Install and develop

Use Node.js 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. Dependencies are pinned in `package-lock.json`; dependency directories and caches are not part of the delivery.

## Typecheck, rebuild and preview

```sh
npm run typecheck
npm run build
npm run preview
```

The complete production website is in `dist/`, including `index.html`, its CSS and JavaScript, the favicon and the 1200 × 630 PNG share image. Serve this directory with a static HTTP server. Vite uses `base: './'`; asset URLs are relative and were checked under `/nested/hello/`. The octopus SVG is embedded into the built HTML by Vite. There are no runtime downloads or external services.

Source files are `index.html`, `src/main.ts`, `src/layout.css` and `src/octopus.svg`. Metadata artwork lives in `public/` and is copied into the export. The source SVG is the editable original; `public/share.png` is a rendered share card made from that drawing.

## Validation

Checked on 2026-10-23 against the production export:

| Check | Actual result |
| --- | --- |
| `npm run typecheck` | Passed; no TypeScript errors. |
| `npm run build` | Passed; Vite emitted the complete static export. |
| Pinned `taste.mjs --out test/scratch/taste --offline` | All 16 checks passed. |
| Chromium interaction checks | Greeting and reset passed with pointer, Enter, Space and emulated touch. |
| Responsive checks | No horizontal overflow at 320, 390, 768, 844 and 1440 pixels wide. |
| Accessibility checks | axe-core reported zero violations in the initial and greeted states; native keyboard focus was visible. |
| Static subpath and disabled JavaScript | Local assets loaded; heading, drawing and a static greeting remained available without JavaScript. |

For this run, the pinned build tools were installed in a temporary directory outside the repository and placed on the command path for the npm scripts. No dependency directory or ignore-file change was added to the repository.

The browser connector returned `Transport closed`; direct Playwright Chromium supplied the rendered checks and screenshots. WebKit was unavailable. Physical devices, screen-reader announcements and native browser zoom were not tested; 200% root text enlargement was tested separately. Automated checks do not establish full accessibility compliance. See [VALIDATION.md](./VALIDATION.md) for coverage and limitations, and [DESIGN.md](./DESIGN.md) for the final implementation.

To repeat the primary interaction manually: open the production preview, Tab to **Say hello**, press Enter, confirm **Hello, friend!**, then press Space on **Start again**. Confirm the greeting clears, the action resets and the octopus stays in place. Repeat with a pointer and a narrow viewport.
