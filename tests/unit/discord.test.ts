import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import rawDiscord from '../../src/data/discord.json';
import { DISCORD_INVITE_PATTERN, discord, parseDiscord } from '../../src/lib/discord';

const valid = {
  heading: 'Join us',
  intro: 'A community.',
  dreamersHeading: 'For Dreamers:',
  forDreamers: ['Share tips.'],
  researchersHeading: 'For Researchers:',
  forResearchers: ['Find participants.'],
  joinHeading: 'How to join?',
  joinText: 'Click below.',
  inviteUrl: 'https://discord.gg/example',
};

describe('parseDiscord', () => {
  it('accepts valid content', () => {
    expect(parseDiscord(valid)).toEqual(valid);
  });

  it.each(['https://discord.gg/wHMuJ2XTgU', 'https://discord.com/invite/wHMuJ2XTgU', 'https://discord.gg/abc-123/'])(
    'accepts the invite link %s',
    (inviteUrl) => {
      expect(parseDiscord({ ...valid, inviteUrl }).inviteUrl).toBe(inviteUrl);
    },
  );

  it.each([
    'http://discord.gg/example',
    'https://example.org/example',
    'https://discord.gg/',
    'discord.gg/example',
    'https://discord.gg/example?x=<script>',
  ])('rejects %s as an invite link with a readable message', (inviteUrl) => {
    expect(() => parseDiscord({ ...valid, inviteUrl })).toThrow(/inviteUrl must look like/);
  });

  it('requires at least one point per audience', () => {
    expect(() => parseDiscord({ ...valid, forDreamers: [] })).toThrow(/forDreamers needs at least one point/);
  });

  it('names the file and field when something is missing', () => {
    const { joinText: _omitted, ...withoutJoinText } = valid;
    expect(() => parseDiscord(withoutJoinText)).toThrow(/discord\.json is invalid[\s\S]*joinText/);
  });
});

describe('discord', () => {
  it('is the validated content of src/data/discord.json', () => {
    expect(discord).toEqual(parseDiscord(rawDiscord));
  });
});

describe('.pages.yml', () => {
  it('uses the same invite-link rule as the build, so the CMS cannot save a link the build rejects', () => {
    const config = readFileSync(new URL('../../.pages.yml', import.meta.url), 'utf8');
    const ruleInYaml = DISCORD_INVITE_PATTERN.source.replaceAll('\\/', '/');
    expect(config).toContain(`regex: '${ruleInYaml}'`);
  });
});
