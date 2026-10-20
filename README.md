# Thiruvalluvar Academy for Civil Service Exam — website

The public website for **TACSE, Chitharal**: a non-profit academy
preparing rural students for UPSC, TNPSC, SSC, Banking, Police and NDA
examinations.

Applications filled on the site are posted straight into the Academy's Google
Form, so responses collect in a Google Sheet and trigger an e-mail alert — with
no server, no database and no hosting bill.

---

## Running it on your computer

You need [Node.js](https://nodejs.org) version 20 or newer.

```bash
npm install
npm run dev
```

Then open <http://localhost:4321>. The page reloads as you edit.

| Command | What it does |
|---|---|
| `npm run dev` | Start the local preview |
| `npm run build` | Build the finished site into `dist/` |
| `npm run preview` | Preview the built site exactly as it will be published |
| `npm run check` | Check the project for type and template errors |

---

## Before the site goes live

Check these before publishing.

### 1. Connect the Google Form — **required**

Until this is done the application form displays but refuses to submit, and
shows an orange setup notice.

The forms belong to the Academy's Google account, `tacse.chitharal@gmail.com`.
The quickest route is the script in `docs/create-google-forms.gs`, which builds
both forms and prints the settings to paste in. Full instructions:
**[docs/GOOGLE-FORMS-SETUP.md](docs/GOOGLE-FORMS-SETUP.md)**.

### 2. Contact details — done

The phone number, e-mail and address are set in `src/data/site.ts`. Change
them there if they ever change; every page picks up the new values.

### 3. The published address — done

The address is set automatically by the GitHub Pages deploy. The default in
`astro.config.mjs` (`https://tacsechitharal-star.github.io`) is only used for
local builds.

---

## Changing the content later

Almost everything the Academy will want to change lives in two files, both
written as plain lists with comments. Neither requires knowing how the site is
built.

| What you want to change | File |
|---|---|
| Phone, e-mail, address, timings, fee | `src/data/site.ts` |
| The ten programmes — names, durations, descriptions | `src/data/courses.ts` |
| Which four programmes appear on the home page | `featuredCourseIds` in `src/data/courses.ts` |
| The navigation menu | `nav` in `src/data/site.ts` |
| The Thirukkural couplets | `kurals` in `src/data/site.ts` |
| Google Form identifiers | `src/config/google-forms.ts` |

Adding a programme to `src/data/courses.ts` automatically creates its page,
adds it to the courses table, the footer and the application form's checkboxes.
If you add one, add the matching checkbox option to the Google Form as well —
see the setup guide.

### Photographs

Drop a file at `public/images/hero.jpg` and it replaces the designed panel on
the home page. See `public/images/README.txt` for sizes and a note on
permissions.

---

## Publishing it, free

The site is hosted on **GitHub Pages** from the Academy's own GitHub account,
`tacsechitharal-star`, at:

**https://tacsechitharal-star.github.io/**

It republishes itself. Every push to the `main` branch runs
`.github/workflows/deploy.yml`, which builds the site and puts it live, usually
within two minutes. Watch progress under the repository's **Actions** tab.

To publish a change:

```bash
git add -A
git commit -m "Describe the change"
git push
```

### Why not Google Sites?

Google Sites is a page builder, not a host. It cannot serve a site built from
code like this one; it only allows small pasted snippets shown inside boxed
frames. GitHub Pages is equally free, has no page limits or advertising, and
keeps the site exactly as designed.

### Moving later

The built site is plain HTML, CSS and a little JavaScript, so any static host
can serve it: Netlify (`netlify.toml` is included), Cloudflare Pages, or a
custom domain such as `tacse.org.in` pointed at GitHub Pages. Internal links go
through `withBase()` in `src/lib/links.ts`, so the site also works when served
from a sub-folder.

---

## How it is built

| Choice | Why |
|---|---|
| [Astro](https://astro.build) | Ships zero JavaScript by default. Pages are plain HTML, which matters on the slow connections many students browse from. |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling without a separate stylesheet to keep in sync; design tokens live in `src/styles/global.css`. |
| Static output | No server, no database, nothing to patch or pay for. |
| Google Forms as the backend | The Academy already knows how to use Sheets. No new system to learn, and the data stays in the account they control. |

```
src/
  components/   Reusable pieces (header, footer, cards, form fields)
  config/       Google Form identifiers — edited during setup
  data/         Academy details and the ten programmes
  layouts/      The page shell: <head>, header, footer
  lib/          Small build-time helpers
  pages/        One file per page; the URL follows the filename (plus robots.txt)
  scripts/      The browser-side form submission
  styles/       Design tokens and shared classes
docs/           Setup instructions
public/         Files served as-is: favicon, photographs
```

### Accessibility and performance notes

- Every page works with the keyboard alone and carries a skip link.
- Form errors are announced next to the field they belong to, not only as
  colour.
- Tamil text is marked `lang="ta"` and given its own font and line height.
- Icons are inline SVG, so there is no icon font to download.
- The whole site loads about 1.3 KB of JavaScript, all of it the form handler.
