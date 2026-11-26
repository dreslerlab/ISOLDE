import { describe, expect, it } from 'vitest';
import rawSettings from '../../src/data/site.json';
import { parseSiteSettings, site } from '../../src/lib/site';

const valid = {
  studyTitle: 'Example study',
  shortName: 'EX',
  contactEmail: 'team@example.org',
  footerText: 'Questions? Write to us.',
};

describe('parseSiteSettings', () => {
  it('accepts valid settings', () => {
    expect(parseSiteSettings(valid)).toEqual(valid);
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

