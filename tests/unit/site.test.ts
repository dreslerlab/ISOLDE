import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import rawSettings from '../../src/data/site.json';
import { DISCORD_INVITE_PATTERN, parseSiteSettings, site } from '../../src/lib/site';

const valid = {
  studyTitle: 'Example study',
  shortName: 'EX',
  contactEmail: 'team@example.org',
  footerText: 'Questions? Write to us.',
  discordInviteUrl: 'https://discord.gg/example',
};

describe('parseSiteSettings', () => {
  it('accepts valid settings', () => {
    expect(parseSiteSettings(valid)).toEqual(valid);
  });

  it.each(['https://discord.gg/wHMuJ2XTgU', 'https://discord.com/invite/wHMuJ2XTgU', 'https://discord.gg/abc-123/'])(
    'accepts the Discord invite link %s',
    (discordInviteUrl) => {
      expect(parseSiteSettings({ ...valid, discordInviteUrl }).discordInviteUrl).toBe(discordInviteUrl);
    },
  );

  it.each([
    'http://discord.gg/example',
    'https://example.org/example',
    'https://discord.gg/',
    'discord.gg/example',
    'https://discord.gg/example?x=<script>',
  ])('rejects %s as an invite link with a readable message', (discordInviteUrl) => {
    expect(() => parseSiteSettings({ ...valid, discordInviteUrl })).toThrow(/discordInviteUrl must look like/);
  });

  it('requires the invite link', () => {
    const { discordInviteUrl: _omitted, ...withoutInvite } = valid;
    expect(() => parseSiteSettings(withoutInvite)).toThrow(/discordInviteUrl/);
  });

  it('rejects an invalid email with a readable message naming the field', () => {
    expect(() => parseSiteSettings({ ...valid, contactEmail: 'not-an-email' })).toThrow(/contactEmail/);
  });

  it('rejects missing fields', () => {
    expect(() => parseSiteSettings({})).toThrow(/studyTitle/);
  });
});

describe('site', () => {
  it('is the validated content of src/data/site.json', () => {
    expect(site).toEqual(parseSiteSettings(rawSettings));
  });
});

describe('.pages.yml', () => {
  it('uses the same invite-link rule as the build, so the CMS cannot save a link the build rejects', () => {
    const config = readFileSync(new URL('../../.pages.yml', import.meta.url), 'utf8');
    const ruleInYaml = DISCORD_INVITE_PATTERN.source.replaceAll('\\/', '/');
    expect(config).toContain(`regex: '${ruleInYaml}'`);
  });
});
