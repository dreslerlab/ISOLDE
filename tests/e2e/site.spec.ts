import { expect, test } from '@playwright/test';

const PAGES = [
  { path: '', title: 'ISOLDE · International Study on Lucid Dreaming Expertise', nav: 'About' },
  { path: 'research/', title: 'Research · ISOLDE', nav: 'Research' },
  { path: 'participate/', title: 'Participate · ISOLDE', nav: 'Participate' },
  { path: 'faq/', title: 'FAQ · ISOLDE', nav: 'FAQ' },
  { path: 'contact/', title: 'Contact · ISOLDE', nav: 'Contact' },
];
const EMPTY_STATE = 'Participating sites will be announced soon.';

for (const page of PAGES) {
  test(`/${page.path} renders under /ISOLDE/ with one h1, head metadata and current nav item`, async ({
    page: browserPage,
  }) => {
    const response = await browserPage.goto(page.path);
    expect(response?.status()).toBe(200);
    await expect(browserPage).toHaveTitle(page.title);
    await expect(browserPage.locator('h1')).toHaveCount(1);

    const canonical = `https://dreslerlab.github.io/ISOLDE/${page.path}`;
    await expect(browserPage.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
    await expect(browserPage.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical);
    await expect(browserPage.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://dreslerlab.github.io/ISOLDE/og-image.png',
    );
    const description = await browserPage.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length).toBeGreaterThan(50);

    const nav = browserPage.getByRole('navigation', { name: 'Main' });
    await expect(nav.getByRole('link', { name: page.nav })).toHaveAttribute('aria-current', 'page');
    await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
  });
}

test('nav links navigate between real URLs', async ({ page }) => {
  await page.goto('');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'FAQ' }).click();
  await expect(page).toHaveURL(/\/ISOLDE\/faq\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/ISOLDE\/$/);
});

test('nav items keep their size when they become the current item', async ({ page }) => {
  const widths = async (path: string) => {
    await page.goto(path);
    const links = page.getByRole('navigation', { name: 'Main' }).getByRole('link');
    return links.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));
  };
  const reference = await widths('research/');
  for (const path of ['', 'faq/', 'contact/']) {
    const current = await widths(path);
    current.forEach((width, i) => expect(width).toBeCloseTo(reference[i], 1));
  }
});

test('unknown URLs get the 404 page', async ({ page }) => {
  const response = await page.goto('does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
});

test('skip link is the first focusable element and moves focus to main', async ({ page }) => {
  await page.goto('research/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('toggle opens and closes the menu, Escape returns focus', async ({ page }) => {
    await page.goto('');
    const toggle = page.getByRole('button', { name: 'Menu' });
    const researchLink = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Research' });

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(researchLink).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(researchLink).toBeVisible();

    await researchLink.focus();
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });

  test('without JavaScript the menu is simply shown', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4421/ISOLDE/');
    await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
    await expect(page.getByRole('link', { name: 'Research' })).toBeVisible();
    await context.close();
  });
});

test('map shows the empty state when no study sites exist', async ({ page }) => {
  for (const path of ['', 'participate/']) {
    await page.goto(path);
    await expect(page.locator('[data-study-map] figcaption')).toHaveText(EMPTY_STATE);
    await expect(page.locator('.study-map__point')).toHaveCount(0);
    await expect(page.locator('dialog')).toHaveCount(0);
  }
});

test('contact page shows self-hosted, optimized team photos and a mailto link', async ({ page }) => {
  await page.goto('contact/');
  const photos = page.locator('.team-grid img');
  await expect(photos).toHaveCount(3);
  for (const name of ['Karolina Raczek', 'Sofia Tzioridou', 'Martin Dresler']) {
    const img = page.getByRole('img', { name: `Portrait of ${name}` });
    await expect(img).toHaveAttribute('src', /^\/ISOLDE\/_astro\/.+\.webp$/);
    await expect(img).toHaveAttribute('srcset', / 2x$/);
    expect(await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await expect(page.locator('img[src*="raw.githubusercontent.com"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'isolde@donders.ru.nl' }).first()).toHaveAttribute(
    'href',
    'mailto:isolde@donders.ru.nl',
  );
  await expect(page.getByText('The full list will be available soon.')).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Coordinating research institute' })).toBeVisible();
  await expect(page.locator('address')).toHaveText(
    'Donders Institute for Brain, Cognition and BehaviorRadboud University MedicalCenter Kapittelweg 29, 6525 EN Nijmegen, The Netherlands',
  );
  await expect(page.locator('address br')).toHaveCount(2);
});

test('FAQ lists every question as a linkable heading', async ({ page }) => {
  await page.goto('faq/');
  await expect(page.getByRole('heading', { level: 2 })).toHaveCount(7);
  await page.getByRole('link', { name: 'Does the study involve any risks?' }).click();
  await expect(page).toHaveURL(/#does-the-study-involve-risks$/);
});

test('sitemap is generated with absolute URLs under the base path', async ({ request }) => {
  const index = await request.get('sitemap-index.xml');
  expect(index.status()).toBe(200);
  const sitemap = await request.get('sitemap-0.xml');
  const xml = await sitemap.text();
  for (const path of ['', 'research/', 'participate/', 'faq/', 'contact/']) {
    expect(xml).toContain(`<loc>https://dreslerlab.github.io/ISOLDE/${path}</loc>`);
  }
});
