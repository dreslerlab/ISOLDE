import { expect, test } from '@playwright/test';
import discord from '../../src/data/discord.json' with { type: 'json' };

const isDiscordHost = (hostname: string) => /(^|\.)discord(app)?\.(com|gg)$/.test(hostname);

test('Participate links to the Discord invite from discord.json', async ({ page }) => {
  await page.goto('participate/');
  const join = page.getByRole('link', { name: 'Join our Discord server' });
  await expect(join).toBeVisible();
  await expect(join).toHaveAttribute('href', discord.inviteUrl);
});

test('nothing is loaded from Discord: no widget, no requests', async ({ page }) => {
  const discordRequests: string[] = [];
  page.on('request', (request) => {
    if (isDiscordHost(new URL(request.url()).hostname)) discordRequests.push(request.url());
  });

  await page.goto('participate/');
  await page.waitForLoadState('networkidle');

  expect(discordRequests).toEqual([]);
  await expect(page.locator('iframe')).toHaveCount(0);
});
