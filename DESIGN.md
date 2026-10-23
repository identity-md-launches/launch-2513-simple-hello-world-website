# Implemented design

## Overview

This is a simple hello world page with a centered, smiling octopus. The brief's “no styling” direction is implemented as browser-default typography, colors and button appearance. Authored CSS is limited to the composition, responsive image sizing, a minimum action target and a reserved reply area. There is one heading, one illustration and one greeting interaction.

The implementation is plain HTML, TypeScript and Vite. It does not need a component framework for this single native control. Source references below describe the final implementation rather than a proposed theme.

## Colors

There are no authored interface color tokens, accent ramps or theme overrides. Text, canvas, focus and button colors use browser defaults. In the checked Chromium session, text computed to `rgb(0, 0, 0)` and the native button background to `rgb(239, 239, 239)`; the rendered page canvas was white. These native values can vary with browser and user settings.

`src/octopus.svg` uses `#000` strokes and eyes with a `#fff` head fill. `public/favicon.svg` uses the same pair. The local share image preserves the black drawing on white. The design probe and axe-core passed their text contrast checks; alternate system palettes were not checked.

## Typography

No fonts are downloaded, bundled or explicitly selected. The browser's element defaults define the hierarchy:

| Role | Source | Observed Chromium default |
| --- | --- | --- |
| Page heading | `index.html`, `h1` | Times New Roman, 32px, weight 700 |
| Greeting | `index.html`, `#reply` | Times New Roman, 16px, weight 400 |
| Action label | `index.html`, `button` | Arial, approximately 13.33px, weight 400 |

All three use normal line height and letter spacing. The named faces are computed browser defaults, not promises of font availability on another platform. Natural text selection, user font settings and browser focus behavior are preserved. There is no truncation, capitalization transform or fixed text-container height.

## Layout

`src/layout.css` is the complete layout source. Its actual sizing values are:

| Value | Use |
| --- | --- |
| `1fr auto 1fr` | Three-row main grid with equal flexible space above and below the drawing. |
| `calc(100vh - 16px)` / `calc(100svh - 16px)` | Viewport minimum height, allowing for the default 8px body margins; `vh` is the fallback. |
| `min(20rem, 100%)` | Illustration width; its height follows the SVG's 320:280 aspect ratio. |
| `1.5rem` | Space between the heading and illustration, and between the illustration and action group. |
| `44px` | Minimum action width and height. |
| `1.5em` | Minimum reply block size, keeping the drawing stable when the greeting changes. |

The heading aligns to the bottom of the first row, the drawing occupies the middle row, and the greeting group aligns to the top of the last row. All three share a horizontal center. No breakpoints are needed: the image shrinks to the available width. Text remains in normal flow and can wrap. Short screens can scroll vertically rather than clipping content.

The octopus was measured as centered at 320 × 640, 390 × 844, 768 × 1024 and 1440 × 900. At 390 × 844, the heading, full illustration and action appear together on the first screen. Additional 844 × 390 and 320 × 480 checks confirmed horizontal fit and reachable controls. Root text enlargement to 200% at 390px also fit without horizontal overflow; this was not native browser zoom.

## Elevation & Depth

The page is flat. It defines no shadows, cards, overlays or stacking layers. The only interface border is the native button treatment. Native keyboard focus remains visible and unmodified.

## Shapes

`src/octopus.svg` contains eight individually drawn curling arms behind a rounded head, two eyes and a smile. Its 3-unit strokes use round joins and caps. The SVG remains vector art at all display sizes. There is no illustration frame or clipping mask. Button shape and pressed appearance remain native.

## Components

- **Main composition** (`index.html`, `src/layout.css`): one semantic `main`, one `h1` and the accessible illustration. The image has explicit dimensions and meaningful alternative text.
- **Greeting control** (`src/main.ts`, `#hello`): a native `button` activated by pointer, touch, Enter or Space. It starts as **Say hello**. Activation writes **Hello, friend!** into `#reply` and changes the button to **Start again**. Activating it again clears the reply and restores the original label. Focus stays on the same element.
- **Reply region** (`index.html`, `#reply`): a stable, initially empty `role="status"` with `aria-atomic="true"`. It is intended to announce the complete greeting politely; actual screen-reader announcements remain untested.
- **Progressive enhancement** (`index.html`, `src/main.ts`): the button is initially hidden and is shown after its required elements are found. Without JavaScript the heading, octopus and `noscript` greeting remain visible. There are no loading, pending or network-error states because the interaction is entirely local.
- **Metadata assets** (`public/`): a small SVG favicon and a 1200 × 630 PNG share card. `index.html` references them with relative URLs.

## Do's and Don'ts

- Reuse the main grid, native heading and native button when maintaining this page.
- Keep interface appearance at browser defaults; the requester explicitly asked for an unstyled website.
- Preserve the octopus's eight arms, vector source, alternative text and responsive aspect ratio.
- Keep the reply region stable and in the normal reading order. Do not replace the button with a clickable image or non-semantic element.
- If another page is needed, start with the same native HTML and layout values, and verify that its content still fits. There is no hidden design-token library to reproduce.

The six-domain review and its limitations are recorded in [VALIDATION.md](./VALIDATION.md). Design guidance was supplied from Jakub Krehel's Better Interface (MIT, commit `267330e1adfc66a718fb65fa6918c1f06d0a689e`); the documentation method was supplied from Paul Bakaus's Impeccable (Apache-2.0, commit `9d715cc4f5564a990ca8345abfdd5df6dc9b41c8`). Their notices and license texts are preserved in [docs/DESIGN-GUIDANCE-LICENSE.txt](./docs/DESIGN-GUIDANCE-LICENSE.txt).
