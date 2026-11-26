# Editing the ISOLDE website

All text lives in Markdown files with a short YAML block (front matter) at the top. The easiest way to
edit is **Pages CMS** (see below); you can also use the GitHub web editor or edit locally and commit to
`main`. CI builds and tests the site and deploys it about
1–2 minutes later. If the build fails (red ✗ in the Actions tab), **nothing is deployed** and the live
site stays as it was. The error message names the file and field.

Check locally before pushing: `npm run dev` (live preview at http://localhost:4321/ISOLDE/) or
`npm run build && npm run check`.

## Where things live

| What | File |
|---|---|
| Page text (About, Research, Participate, FAQ intro, Contact) | `src/content/pages/<page>.md`: `title`, `description` (max. 160 characters, used by search engines), then the text |
| Discord section on Participate | the `discord:` block in `src/content/pages/participate.md` |
| FAQ questions | `src/content/faq/*.md`: one file per question (`question`, `order`), with the answer below |
| Study coordinators | `src/content/team/*.md` + photo in `src/content/team/photos/` |
| Study sites (map + lists) | `src/content/sites/<city>.md`: one file per site |
| Study title, contact email, footer text, Discord invite link | `src/data/site.json` (also editable in Pages CMS, see below) |

## Common tasks

**Add a FAQ question.** Copy an existing file in `src/content/faq/` and change `question`, `order`
(1 = first) and the answer. The file name becomes the link anchor (`/faq/#file-name`).

**Add a study site.** Create `src/content/sites/<city>.md`:

```markdown
---
city: Nijmegen
country: Netherlands
institution: Donders Institute    # optional
lat: 51.8425                      # decimal degrees (right-click the place on openstreetmap.org)
lon: 5.8528
contactEmail: someone@example.org # optional
recruiting: true                  # optional, default true
---

Optional text shown in the map popup.
```

The site appears on the map (About and Participate), in the list under the map, and on Contact under
"Participating research groups". A site outside the map's area (e.g. Hawaii) is shown in the lists only.
If one city gets a second site, name the file `<city>-2.md`.

**Swap a team photo.** Replace the file in `src/content/team/photos/` and keep the same name; no code change
is needed. Photos of at least 320×320 px look sharp on high-resolution screens. If the file type changes
(e.g. `.png` → `.jpg`), update the `photo:` line in that person's `.md`.

**Change the Discord invite link.** In Pages CMS open **Site settings** and edit **Discord invite link**, or
edit `discordInviteUrl` in `src/data/site.json`. It must look like `https://discord.gg/abc123` (or
`https://discord.com/invite/abc123`); anything else fails the build, so the old link stays live. Create the
invite in Discord with **Expire after: Never**, or the link will stop working.

## Pages CMS

Open https://app.pagescms.org, sign in with GitHub and pick `dreslerlab/ISOLDE` and the `main` branch.
The sidebar has:

| Pages CMS section | Edits |
|---|---|
| Pages | the five pages: heading, search engine description, text; the Discord section (Participate) and postal address (Contact) |
| FAQ questions | one entry per question; **Position** sets the order (1 = first) |
| Study coordinators | name, affiliation, photo (upload in the photo picker), email, position |
| Study sites | city, country, institution, latitude/longitude, contact email, recruiting, popup text |
| Site settings | study title, contact email, footer text, Discord invite link |

Every **Save** is a commit to `main`, so it goes through the same build, tests and deploy (1–2 minutes).
If a value is invalid, the build fails and the live site keeps the previous version; the failed run in
the Actions tab names the file and field.

Things to know:
- The file name of a new FAQ question becomes its link anchor (`/ISOLDE/faq/#<file-name>`), so renaming
  it later breaks links to that question.
- Upload team photos through the photo picker. They are stored in `src/content/team/photos/` and written
  as `photos/<file>`, which is the form the build expects.
- Images can't be inserted into page text; the pages don't use any.
- The configuration is `.pages.yml`. `tests/unit/pages-cms.test.ts` fails if a content field is missing
  from it, because Pages CMS would drop that field the next time someone saves the entry.

**Links between pages** in Markdown must include the `/ISOLDE/` prefix, e.g. `[FAQ](/ISOLDE/faq/)`, because
the site is served from `/ISOLDE/`. Relative links like `../faq/` break on the home page and in map
popups, which appear on several pages. The link check in CI catches mistakes. If the site moves to a
custom domain, the check will flag every such link to update.

## For developers

- Swap the world map: replace `src/assets/world-map.svg` and, if its projection differs, update
  `project()`/`MAP_FIT` in `src/lib/map-projection.ts` and its tests (`tests/unit/map-projection.test.ts`).
- Custom domain: in `astro.config.mjs`, set `site` to `https://<domain>` and remove `base`. Then set the
  domain under Settings → Pages and add `public/robots.txt`.
- After changing the logo: `npm run generate:icons`.
- Tests: `npm test` (unit), `npm run test:e2e` (Playwright + axe; builds and serves the site itself),
  `npm run check:links` (after a build).
