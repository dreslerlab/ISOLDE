import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

// Runs against the fixture build (tests/fixtures/sites: Nijmegen, Sydney, Honolulu).
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
const MIN_TARGET_PX = 24;
const MAX_TABS = 40;

const point = (page: Page, name: string) => page.getByRole('button', { name });

test('plots on-map sites and lists every site, including off-map ones', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('.study-map__point')).toHaveCount(2);
  await expect(point(page, 'Nijmegen, Netherlands')).toBeVisible();
  await expect(point(page, 'Sydney, Australia')).toBeVisible();
  await expect(point(page, 'Honolulu, United States')).toHaveCount(0);

  const list = page.locator('.site-list');
  await expect(list.getByRole('heading', { level: 3 })).toHaveText(['Australia', 'Netherlands', 'United States']);
  await expect(list).toContainText('Honolulu');
  await expect(list).toContainText('Sydney – not recruiting at the moment');
});

test('points are at least 24×24 px and positioned by the projection', async ({ page }) => {
  await page.goto('');
  const nijmegen = point(page, 'Nijmegen, Netherlands');
  const box = (await nijmegen.boundingBox())!;
  expect(box.width).toBeGreaterThanOrEqual(MIN_TARGET_PX);
  expect(box.height).toBeGreaterThanOrEqual(MIN_TARGET_PX);

  const map = (await page.locator('.study-map__canvas').boundingBox())!;
  const centreX = ((box.x + box.width / 2 - map.x) / map.width) * 100;
  const centreY = ((box.y + box.height / 2 - map.y) / map.height) * 100;
  expect(centreX).toBeCloseTo(46.73, 0);
  expect(centreY).toBeCloseTo(21.27, 0);
});

test('keyboard: Tab reaches a point, Enter opens its dialog, Escape closes and restores focus', async ({ page }) => {
  await page.goto('');
  let reached = false;
  for (let i = 0; i < MAX_TABS && !reached; i++) {
    await page.keyboard.press('Tab');
    reached = await page.evaluate(() => document.activeElement?.classList.contains('study-map__point') ?? false);
  }
  expect(reached).toBe(true);

  const focusedName = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? '');
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: focusedName });
  await expect(dialog).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(point(page, focusedName)).toBeFocused();
});

test('dialog shows the site details and closes with its button or the backdrop', async ({ page }) => {
  await page.goto('participate/');
  await point(page, 'Nijmegen, Netherlands').click();
  const dialog = page.getByRole('dialog', { name: 'Nijmegen, Netherlands' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('Donders Institute (test fixture)');
  await expect(dialog.getByRole('link', { name: 'coordinator@example.org' })).toHaveAttribute(
    'href',
    'mailto:coordinator@example.org',
  );

  await dialog.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).toBeHidden();

  await point(page, 'Nijmegen, Netherlands').click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(dialog).toBeHidden();
});

test('JS fallback opens dialogs when Invoker Commands are unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    // Simulate a browser without Invoker Commands: hide feature detection and cancel native commands.
    delete (HTMLButtonElement.prototype as { commandForElement?: unknown }).commandForElement;
    document.addEventListener('command', (event) => event.preventDefault(), true);
  });
  await page.goto('');
  await point(page, 'Sydney, Australia').click();
  await expect(page.getByRole('dialog', { name: 'Sydney, Australia' })).toBeVisible();
});

test('axe: map page with an open dialog has no WCAG 2.2 AA violations', async ({ page }) => {
  await page.goto('');
  await point(page, 'Nijmegen, Netherlands').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations).toEqual([]);
});
