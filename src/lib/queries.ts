/**
 * Content queries used by the page routes. Thin wrappers over astro:content
 * (covered by e2e tests; the pure sorting logic lives in ./sites.ts and is unit-tested).
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { sortSites } from './sites';

export type PageId = 'about' | 'research' | 'participate' | 'faq' | 'contact';

interface Ordered {
  id: string;
  data: { order: number };
}

const byOrder = (a: Ordered, b: Ordered): number => a.data.order - b.data.order || a.id.localeCompare(b.id);

export async function getPage(id: PageId): Promise<CollectionEntry<'pages'>> {
  const page = await getEntry('pages', id);
  if (!page) throw new Error(`Missing content file: src/content/pages/${id}.md`);
  return page;
}

export async function getSites(): Promise<CollectionEntry<'sites'>[]> {
  return sortSites(await getCollection('sites'));
}

export async function getFaq(): Promise<CollectionEntry<'faq'>[]> {
  return [...(await getCollection('faq'))].sort(byOrder);
}

export async function getCoordinators(): Promise<CollectionEntry<'team'>[]> {
  return [...(await getCollection('team', (entry) => entry.data.role === 'coordinator'))].sort(byOrder);
}
