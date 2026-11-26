import { describe, expect, it } from 'vitest';
import { groupByCountry, sortSites } from '../../src/lib/sites';

const site = (id: string, city: string, country: string) => ({ id, data: { city, country } });

const input = [
  site('utrecht', 'Utrecht', 'Netherlands'),
  site('sydney', 'Sydney', 'Australia'),
  site('nijmegen', 'Nijmegen', 'Netherlands'),
  site('berlin', 'Berlin', 'Germany'),
];

describe('sortSites', () => {
  it('sorts by country, then city', () => {
    expect(sortSites(input).map((s) => s.id)).toEqual(['sydney', 'berlin', 'nijmegen', 'utrecht']);
  });

  it('falls back to the id when country and city are equal', () => {
    const twins = [site('berlin-2', 'Berlin', 'Germany'), site('berlin', 'Berlin', 'Germany')];
    expect(sortSites(twins).map((s) => s.id)).toEqual(['berlin', 'berlin-2']);
  });

  it('does not mutate its input', () => {
    const copy = [...input];
    sortSites(input);
    expect(input).toEqual(copy);
  });
});

describe('groupByCountry', () => {
  it('groups sorted sites under their country', () => {
    expect(groupByCountry(input).map((g) => [g.country, g.sites.map((s) => s.data.city)])).toEqual([
      ['Australia', ['Sydney']],
      ['Germany', ['Berlin']],
      ['Netherlands', ['Nijmegen', 'Utrecht']],
    ]);
  });

  it('returns an empty list for no sites', () => {
    expect(groupByCountry([])).toEqual([]);
  });
});
