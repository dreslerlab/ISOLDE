import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TEAM_FILE, teamEntriesFromYaml } from './lib/team';

// Test builds point this at tests/fixtures/sites to exercise the map with data.
const SITES_DIR = process.env.ISOLDE_SITES_DIR ?? './src/content/sites';

// Pages CMS (.pages.yml) leaves cleared fields out, but hand edits may leave `field: ""` or `field:`.
const blankToUndefined = (value: unknown) => (value === '' || value === null ? undefined : value);
const optionalText = z.preprocess(blankToUndefined, z.string().trim().min(1).optional());
const optionalEmail = z.preprocess(blankToUndefined, z.email().optional());

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string({ error: 'Every page needs a title' }).min(1),
    description: z
      .string({ error: 'Every page needs a description (used by search engines and link previews)' })
      .min(1)
      .max(160, 'Keep the description at 160 characters or fewer'),
    // Contact page: the postal address block under its own heading.
    address: z
      .object({
        heading: z.string().min(1),
        lines: z.array(z.string().min(1)).min(1, 'The address needs at least one line'),
      })
      .optional(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string({ error: 'Each FAQ entry needs a question' }).min(1),
    order: z.number({ error: 'Each FAQ entry needs an order number (1 = first)' }).int(),
  }),
});

// All coordinators in one list (src/content/team/coordinators.yml), so Pages CMS can reorder them by
// dragging. The list position becomes `order` and the name becomes the id (see src/lib/team.ts).
const team = defineCollection({
  loader: file(TEAM_FILE, { parser: teamEntriesFromYaml }),
  schema: ({ image }) =>
    z.object({
      name: z.string().trim().min(1),
      affiliation: z.string().min(1),
      photo: image(),
      photoAlt: optionalText,
      role: z.enum(['coordinator', 'researcher']).default('coordinator'),
      email: optionalEmail,
      order: z.number().int(),
    }),
});

const sites = defineCollection({
  // One file per site, named after its city: nijmegen.md → id "nijmegen".
  loader: glob({ pattern: '*.md', base: SITES_DIR }),
  schema: z.object({
    city: z.string().min(1),
    country: z.string().min(1),
    institution: optionalText,
    lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
    lon: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    contactEmail: optionalEmail,
    recruiting: z.boolean().default(true),
  }),
});

export const collections = { pages, faq, team, sites };
