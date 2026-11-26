export interface SiteLike {
  id: string;
  data: { city: string; country: string };
}

export interface CountryGroup<T extends SiteLike> {
  country: string;
  sites: T[];
}

const compareText = (a: string, b: string): number => a.localeCompare(b, 'en', { sensitivity: 'base' });

/** Sorted copy: by country, then city, then id. Does not mutate the input. */
export function sortSites<T extends SiteLike>(sites: readonly T[]): T[] {
  return [...sites].sort(
    (a, b) => compareText(a.data.country, b.data.country) || compareText(a.data.city, b.data.city) || compareText(a.id, b.id),
  );
}

/** Groups sites by country (countries and cities in alphabetical order). */
export function groupByCountry<T extends SiteLike>(sites: readonly T[]): CountryGroup<T>[] {
  return sortSites(sites).reduce<CountryGroup<T>[]>((groups, site) => {
    const last = groups.at(-1);
    if (last && last.country === site.data.country) {
      return [...groups.slice(0, -1), { ...last, sites: [...last.sites, site] }];
    }
    return [...groups, { country: site.data.country, sites: [site] }];
  }, []);
}
