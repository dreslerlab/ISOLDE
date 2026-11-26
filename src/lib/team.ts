import { parse } from 'yaml';

/** The file holding every coordinator, as one list in display order (edited in Pages CMS). */
export const TEAM_FILE = 'src/content/team/coordinators.yml';

/** A coordinator as loaded into the team collection: their fields plus a generated id and order. */
export interface TeamEntry extends Record<string, unknown> {
  id: string;
  order: number;
}

/** "Sofía Tzioridou" → "sofia-tzioridou". */
export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Parses coordinators.yml into team collection entries. The position in the list becomes `order`
 * (so dragging in Pages CMS reorders the Contact page) and the name becomes a unique `id`.
 * Field validation happens afterwards in the collection schema.
 */
export function teamEntriesFromYaml(text: string): TeamEntry[] {
  const document: unknown = parse(text);
  const list = isRecord(document) ? document.coordinators : undefined;
  if (!Array.isArray(list)) {
    throw new Error(`${TEAM_FILE} must contain a "coordinators:" list`);
  }

  const idCounts = new Map<string, number>();
  return list.map((item: unknown, index) => {
    if (!isRecord(item)) {
      throw new Error(`${TEAM_FILE}: coordinator #${index + 1} must be a set of fields (name, affiliation, photo, …)`);
    }
    const baseId = slugify(String(item.name ?? '')) || `coordinator-${index + 1}`;
    const count = (idCounts.get(baseId) ?? 0) + 1;
    idCounts.set(baseId, count);
    return { ...item, id: count === 1 ? baseId : `${baseId}-${count}`, order: index + 1 };
  });
}
