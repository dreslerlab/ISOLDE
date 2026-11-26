import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { slugify, TEAM_FILE, teamEntriesFromYaml } from '../../src/lib/team';

describe('slugify', () => {
  it.each([
    ['Karolina Raczek', 'karolina-raczek'],
    ['Sofía Tzioridou', 'sofia-tzioridou'],
    ['  Dr. Jan-Erik  Ølsen ', 'dr-jan-erik-lsen'],
    ['!!!', ''],
  ])('%j → %j', (input, expected) => {
    expect(slugify(input)).toBe(expected);
  });
});

describe('teamEntriesFromYaml', () => {
  it('uses the list position as order and the name as id', () => {
    const entries = teamEntriesFromYaml(`
coordinators:
  - { name: Ada Lovelace, affiliation: A, photo: photos/a.png }
  - { name: Alan Turing, affiliation: B, photo: photos/b.png, email: alan@example.org }
`);
    expect(entries).toEqual([
      { id: 'ada-lovelace', order: 1, name: 'Ada Lovelace', affiliation: 'A', photo: 'photos/a.png' },
      {
        id: 'alan-turing',
        order: 2,
        name: 'Alan Turing',
        affiliation: 'B',
        photo: 'photos/b.png',
        email: 'alan@example.org',
      },
    ]);
  });

  it('keeps ids unique when two people share a name, and falls back when the name is missing', () => {
    const entries = teamEntriesFromYaml(`
coordinators:
  - { name: Sam Lee }
  - { name: Sam Lee }
  - { affiliation: Unknown }
`);
    expect(entries.map((entry) => entry.id)).toEqual(['sam-lee', 'sam-lee-2', 'coordinator-3']);
  });

  it('accepts an empty list', () => {
    expect(teamEntriesFromYaml('coordinators: []')).toEqual([]);
  });

  it.each(['', 'coordinators:', 'people: []', '- name: Ada'])('rejects %j without a coordinators list', (text) => {
    expect(() => teamEntriesFromYaml(text)).toThrow(/must contain a "coordinators:" list/);
  });

  it('names the position of an entry that is not a set of fields', () => {
    expect(() => teamEntriesFromYaml('coordinators:\n  - { name: Ada }\n  - just text')).toThrow(
      /coordinator #2 must be a set of fields/,
    );
  });

  it('parses the real coordinators file', () => {
    const entries = teamEntriesFromYaml(readFileSync(new URL(`../../${TEAM_FILE}`, import.meta.url), 'utf8'));
    expect(entries.length).toBeGreaterThan(0);
    expect(new Set(entries.map((entry) => entry.id)).size).toBe(entries.length);
  });
});
