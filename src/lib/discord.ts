import { z } from 'astro/zod';
import rawDiscord from '../data/discord.json';

/** Discord invite links: https://discord.gg/<code> or https://discord.com/invite/<code>. Mirrored in .pages.yml. */
export const DISCORD_INVITE_PATTERN = /^https:\/\/(discord\.gg|discord\.com\/invite)\/[A-Za-z0-9-]+\/?$/;

const text = z.string().trim().min(1);

export const discordSchema = z.object({
  heading: text,
  intro: text,
  dreamersHeading: text,
  forDreamers: z.array(text).min(1, 'forDreamers needs at least one point'),
  researchersHeading: text,
  forResearchers: z.array(text).min(1, 'forResearchers needs at least one point'),
  joinHeading: text,
  joinText: text,
  inviteUrl: z.string().regex(DISCORD_INVITE_PATTERN, 'inviteUrl must look like https://discord.gg/abc123'),
});

export type DiscordContent = z.infer<typeof discordSchema>;

/** Validates the Discord section; throws a readable error so a bad edit fails the build instead of shipping. */
export function parseDiscord(input: unknown): DiscordContent {
  const result = discordSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`src/data/discord.json is invalid:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const discord: DiscordContent = parseDiscord(rawDiscord);
