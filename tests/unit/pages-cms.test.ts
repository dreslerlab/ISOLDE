// Keeps .pages.yml (Pages CMS) in step with the real content. When the CMS saves an entry, it writes only the
// fields declared in .pages.yml, so an undeclared key in a file could be lost on the next edit.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse, parseDocument } from 'yaml';

interface CmsField {
  name: string;
  type?: string;
  component?: string;
  fields?: CmsField[];
  options?: { media?: string | false };
}

interface CmsEntry {
  name: string;
  type: 'collection' | 'file' | 'group';
  path?: string;
  format?: string;
  fields?: CmsField[];
  items?: CmsEntry[];
}

interface CmsMedia {
  name: string;
  input: string;
  output: string;
}

interface CmsConfig {
  media: CmsMedia[];
  components: Record<string, Omit<CmsField, 'name'>>;
  content: CmsEntry[];
}

type Data = Record<string, unknown>;

const ROOT = new URL('../../', import.meta.url);
const read = (path: string): string => readFileSync(new URL(path, ROOT), 'utf8');
const filesIn = (dir: string, extensions: RegExp): string[] =>
  readdirSync(new URL(`${dir}/`, ROOT))
    .filter((file) => extensions.test(file))
    .map((file) => `${dir}/${file}`);
const markdownFilesIn = (dir: string): string[] => filesIn(dir, /\.md$/);
const CONTENT_FILE = /\.(md|ya?ml|json)$/;

// Same parser options as Pages CMS (lib/config.ts): note they do not enable YAML merge keys (`<<:`).
const rawConfig = read('.pages.yml');
const document = parseDocument(rawConfig, { strict: false, prettyErrors: false });
const config = document.toJSON() as CmsConfig;

const leavesOf = (entries: CmsEntry[]): CmsEntry[] =>
  entries.flatMap((entry) => (entry.type === 'group' ? leavesOf(entry.items ?? []) : [entry]));
const leaves = leavesOf(config.content);
const entryNamed = (name: string): CmsEntry => {
  const entry = leaves.find((leaf) => leaf.name === name);
  if (!entry) throw new Error(`.pages.yml has no content entry "${name}"`);
  return entry;
};

const FRONT_MATTER = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;
function readEntry(path: string, format: string | undefined): { data: Data; body: string } {
  const text = read(path);
  if (format === 'json') return { data: JSON.parse(text) as Data, body: '' };
  if (format === 'yaml') return { data: (parse(text) ?? {}) as Data, body: '' };
  const match = FRONT_MATTER.exec(text);
  if (!match) throw new Error(`${path} has no front matter`);
  return { data: (parse(match[1] ?? '') ?? {}) as Data, body: (match[2] ?? '').trim() };
}

const filesOf = (entry: CmsEntry): string[] =>
  entry.type === 'file' ? [entry.path ?? ''] : markdownFilesIn(entry.path ?? '');

/** Keys present in the data but not declared as fields (nested objects and lists of objects included). */
function undeclaredKeys(data: Data, fields: CmsField[], prefix = ''): string[] {
  const byName = new Map(fields.map((field) => [field.name, field]));
  return Object.entries(data).flatMap(([key, value]) => {
    const field = byName.get(key);
    if (!field) return [`${prefix}${key}`];
    if (!field.fields) return [];
    const items = Array.isArray(value) ? value : [value];
    return items.flatMap((item, index) => {
      if (item === null || typeof item !== 'object' || Array.isArray(item)) return [];
      const at = Array.isArray(value) ? `${prefix}${key}[${index}].` : `${prefix}${key}.`;
      return undeclaredKeys(item as Data, field.fields ?? [], at);
    });
  });
}

function allFields(fields: CmsField[]): CmsField[] {
  return fields.flatMap((field) => [field, ...allFields(field.fields ?? [])]);
}

describe('.pages.yml', () => {
  it('parses cleanly with the options Pages CMS uses, without merge keys it would ignore', () => {
    expect(document.errors.map(String)).toEqual([]);
    expect(document.warnings.map(String)).toEqual([]);
    expect(rawConfig).not.toMatch(/<<\s*:/);
  });

  it('gives every field exactly one of `type` or `component`, and every component exists', () => {
    for (const entry of leaves) {
      for (const field of allFields(entry.fields ?? [])) {
        expect(Boolean(field.type) !== Boolean(field.component), `${entry.name}.${field.name}`).toBe(true);
        if (field.component) expect(config.components).toHaveProperty(field.component);
      }
    }
  });

  it('lets optional fields with a pattern stay empty (Pages CMS checks patterns on empty values too)', () => {
    const resolve = (field: CmsField) => ({ ...(field.component ? config.components[field.component] : {}), ...field });
    for (const entry of leaves) {
      for (const field of allFields(entry.fields ?? []).map(resolve)) {
        const { pattern, required } = field as CmsField & { pattern?: string | { regex: string }; required?: boolean };
        if (!pattern || required) continue;
        const regex = new RegExp(typeof pattern === 'string' ? pattern : pattern.regex);
        expect(regex.test(''), `${entry.name}.${field.name} rejects an empty value`).toBe(true);
      }
    }
  });

  it('writes `list` as true or an object with `collapsible`, as Pages CMS requires', () => {
    for (const entry of leaves) {
      for (const field of allFields(entry.fields ?? [])) {
        const { list } = field as CmsField & { list?: unknown };
        if (list !== undefined && typeof list !== 'boolean') {
          expect(list, `${entry.name}.${field.name}`).toHaveProperty('collapsible');
        }
      }
    }
  });

  it('covers every content file and every data file', () => {
    const managed = new Set(leaves.flatMap(filesOf));
    const contentDirs = ['src/content/pages', 'src/content/faq', 'src/content/team', 'src/content/sites'];
    const dataFiles = readdirSync(new URL('src/data/', ROOT))
      .filter((file) => file.endsWith('.json'))
      .map((file) => `src/data/${file}`);
    for (const file of [...contentDirs.flatMap((dir) => filesIn(dir, CONTENT_FILE)), ...dataFiles]) {
      expect(managed, `${file} is not editable in Pages CMS`).toContain(file);
    }
  });

  describe.each(leaves.map((entry) => [entry.name, entry] as const))('%s', (_name, entry) => {
    // Sites has no real entries yet, so also check the test fixtures, which use every site field.
    const files = [...filesOf(entry), ...(entry.name === 'sites' ? markdownFilesIn('tests/fixtures/sites') : [])];

    it.each(files)('declares every field used in %s', (file) => {
      const { data, body } = readEntry(file, entry.format);
      const fields = entry.fields ?? [];
      expect(undeclaredKeys(data, fields)).toEqual([]);
      if (body) expect(fields.map((field) => field.name)).toContain('body');
    });
  });

  it('resolves team photos to files the CMS media library can show and replace', () => {
    const team = entryNamed('team');
    const listField = team.fields?.find((field) => field.name === 'coordinators');
    const photoField = listField?.fields?.find((field) => field.name === 'photo');
    const media = config.media.find((source) => source.name === photoField?.options?.media);
    expect(media, 'team photo field must name a media source').toBeDefined();
    if (!media) return;

    const [file] = filesOf(team);
    const coordinators = readEntry(file ?? '', team.format).data.coordinators as Data[];
    expect(coordinators.length).toBeGreaterThan(0);
    for (const person of coordinators) {
      const photo = String(person.photo);
      // Pages CMS strips "./" before matching `output`, so values must start with the bare output path.
      expect(photo.startsWith(`${media.output}/`), `${String(person.name)}: ${photo}`).toBe(true);
      expect(existsSync(new URL(`${media.input}/${photo.slice(media.output.length + 1)}`, ROOT))).toBe(true);
    }
  });
});
