import { afterEach, describe, expect, it, vi } from 'vitest';
import { isCurrentPath, joinBase, url } from '../../src/lib/url';

describe('joinBase', () => {
  it.each([
    ['/ISOLDE', 'research/', '/ISOLDE/research/'],
    ['/ISOLDE/', 'research/', '/ISOLDE/research/'],
    ['/ISOLDE/', '/research/', '/ISOLDE/research/'],
    ['/ISOLDE', '', '/ISOLDE/'],
    ['/', 'faq/', '/faq/'],
    ['/', '', '/'],
    ['/ISOLDE/', 'og-image.png', '/ISOLDE/og-image.png'],
  ])('joinBase(%j, %j) → %j', (base, path, expected) => {
    expect(joinBase(base, path)).toBe(expected);
  });

  it('defaults the path to the base itself', () => {
    expect(joinBase('/ISOLDE')).toBe('/ISOLDE/');
  });
});

describe('url', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  // Vitest does not apply Astro's `base` to BASE_URL, so stub it as Astro sets it in the build.
  it('prefixes the configured base path', () => {
    vi.stubEnv('BASE_URL', '/ISOLDE/');
    expect(url('research/')).toBe('/ISOLDE/research/');
    expect(url()).toBe('/ISOLDE/');
  });

  it('works when the site is served from the domain root (custom domain)', () => {
    vi.stubEnv('BASE_URL', '/');
    expect(url('faq/')).toBe('/faq/');
  });
});

describe('isCurrentPath', () => {
  it('matches with or without a trailing slash', () => {
    expect(isCurrentPath('/ISOLDE/faq/', '/ISOLDE/faq/')).toBe(true);
    expect(isCurrentPath('/ISOLDE/faq', '/ISOLDE/faq/')).toBe(true);
    expect(isCurrentPath('/ISOLDE/', '/ISOLDE')).toBe(true);
  });

  it('does not treat a parent path as current', () => {
    expect(isCurrentPath('/ISOLDE/faq/', '/ISOLDE/')).toBe(false);
  });
});
