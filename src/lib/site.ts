import { z } from 'astro/zod';
import rawSettings from '../data/site.json';

export const siteSettingsSchema = z.object({
  studyTitle: z.string().min(1),
  shortName: z.string().min(1),
  contactEmail: z.email(),
  footerText: z.string().min(1),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;

/** Validates site settings; throws a readable error so a bad edit fails the build instead of shipping. */
export function parseSiteSettings(input: unknown): SiteSettings {
  const result = siteSettingsSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`src/data/site.json is invalid:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const site: SiteSettings = parseSiteSettings(rawSettings);
