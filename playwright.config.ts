import { defineConfig, devices } from '@playwright/test';

// Not 4321 (Astro's default), so e2e never collides with a developer's own `npm run preview`.
const SITE_URL = 'http://127.0.0.1:4421/ISOLDE/';
const FIXTURE_URL = 'http://127.0.0.1:4422/ISOLDE/';
const SERVER_START_TIMEOUT_MS = 180_000;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { ...devices['Desktop Chrome'], trace: 'retain-on-failure' },
  projects: [
    // Real content (no study sites yet → map empty state).
    { name: 'site', testIgnore: /map\.spec\.ts/, use: { baseURL: SITE_URL } },
    // Same site built with tests/fixtures/sites → map points and dialogs.
    { name: 'fixture', testMatch: /map\.spec\.ts/, use: { baseURL: FIXTURE_URL } },
  ],
  webServer: {
    // Builds dist/ and dist-fixture/, then serves both with `astro preview` (4421, then 4422).
    command: 'node scripts/e2e-serve.mjs',
    url: FIXTURE_URL,
    timeout: SERVER_START_TIMEOUT_MS,
    // Always rebuild: reusing a leftover server would test a stale build.
    reuseExistingServer: false,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
