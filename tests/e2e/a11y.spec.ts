import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// best-practice adds rules such as heading-order that are not strict WCAG failures.
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
const PATHS = ['', 'research/', 'participate/', 'faq/', 'contact/', 'does-not-exist/'];

for (const path of PATHS) {
  test(`axe: /${path} has no WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(results.violations).toEqual([]);
  });
}

test.describe('mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('axe: open mobile menu has no WCAG 2.2 AA violations', async ({ page }) => {
    await page.goto('');
    await page.getByRole('button', { name: 'Menu' }).click();
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(results.violations).toEqual([]);
  });
});
