# ARCHIT — portfolio

A black shoebox on a white table. Click it, the lid lifts off, and each
sticker inside opens a project page laid out like a Notion case study.

## Preview it

Double-click `index.html`. Or, for auto-refresh while editing, open the folder
in VS Code, install **Live Server**, right-click `index.html` → **Open with Live Server**.

## What's in the folder

| File | What it does |
|---|---|
| `index.html` | The page: the box and the 8 stickers |
| `css/base.css` | Colours, **fonts**, logo, menu, footer |
| `css/box.css` | The 3D box and the lid animation |
| `css/keepsakes.css` | The drawn stickers: their design, size and position |
| `css/project.css` | The project pages |
| `js/content.js` | **All text, images and videos on the project pages** |
| `js/app.js` | The interactions (you shouldn't need to touch it) |
| `assets/` | Your images, videos, stickers and logos |

## Project pages (`js/content.js`)

Each project has a `cover`, `title`, `company`, `tags`, `year` and a list of
`blocks` that stack down the page like Notion blocks:

```
{ heading: "Observation" }
{ text: "A paragraph…" }
{ image: "assets/images/olive-1.jpg", caption: "…" }
{ video: "assets/videos/reel.mp4" }
{ quote: "…" }   { subheading: "…" }   { callout: "…", icon: "💡" }   { divider: true }
```

Put images in `assets/images/` and videos in `assets/videos/`.
Cover: `cover: "assets/images/olive-cover.jpg"` (a wide image, about 4:1).
Optional cover settings (any page, including About and Resume):
`coverPosition: "center 30%"` (which part shows), `coverFit: "contain"` (show the whole image),
`coverHeight: "420px"`, `coverBg: "#0d1512"` (colour around a "contain" image).

## Changing the stickers

**Easiest: use your own artwork.** Design a sticker in Figma/Illustrator/Photoshop,
export a **PNG with a transparent background** (about 1200px wide), and save it as:

| Project | Sticker file |
|---|---|
| Duolingo Telugu Launch | `assets/stickers/duotelugu.png` |
| TheMotherOfAllMomos | `assets/stickers/momos.png` |
| Sizzl Launch | `assets/stickers/launch-event.png` |
| Sizzl Packaging | `assets/stickers/packaging.png` |
| MoralCode Shoot | `assets/stickers/mancode.png` |
| DuolingoXLakmeFashionWeek | `assets/stickers/duolingo-lfw.png` |
| Licious FNS2.0 | `assets/stickers/fns.png` |
| Olive Branding | `assets/stickers/olive-hotel.png` |
| The Ultimate Reminder | `assets/stickers/duoultimatum.png` |

Use **lowercase file names** exactly as above — most web hosts treat
`Packaging.png` and `packaging.png` as different files.

It replaces the drawn version automatically (in the box and on its project page).
Don't add a shadow: the site adds one that lifts on hover.

**Size / position / rotation:** in `css/keepsakes.css`, each sticker has a line like
`.k-fish { --wn: 38; --x: 39.4%; --y: 6%; --r: -8deg; --z: 4; }`
(`--wn` width, `--x`/`--y` position, `--r` rotation, `--z` which sits on top).
Phone positions are at the bottom of that file.

**Editing the drawn versions:** the markup is in `index.html` (search for the
sticker's name, e.g. `MORAL CODE`), and the styling is in `css/keepsakes.css`.

## Changing the fonts

1. Pick fonts at https://fonts.google.com, click **Get font → Get embed code**, and copy the `<link …>` line.
2. In `index.html`, replace the existing Google Fonts `<link rel="stylesheet" href="https://fonts.googleapis.com/…">` with yours.
3. In `css/base.css`, change the font names at the top:
   ```
   --f-display: "Archivo", …;            /* logo, titles, headings, body */
   --f-marker:  "Permanent Marker", …;   /* loud handwriting ("CLICK TO OPEN") */
   --f-hand:    "Caveat", …;             /* notes on stickers */
   ```
The word **ARCHIT** printed on the box lid is part of your photo, so it won't change.

## Company logos on the Resume

Save each logo in `assets/logos/companies/` as `licious.png`, `digitas.png`,
`schbang.png` and `epsilon.png` (square-ish, white or transparent background).
Until then, the company's initials show in the slot.

## Other edits

- **Colours:** top of `css/base.css`.
- **Box photos:** replace `assets/box/lid.jpg` and `assets/box/inside.jpg` (same names, about 1.74:1).

Keyboard: `←` / `→` move between projects, `Esc` goes back to the homepage.
Links: `index.html#/` opens the box; `index.html#/olive-hotel` jumps to a project.
