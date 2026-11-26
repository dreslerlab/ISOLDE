// Builds the real site (dist/) and a fixture build with test study sites (dist-fixture/),
// then serves both with `astro preview`: real on :4421, fixture on :4422 (started second,
// so Playwright waiting for :4422 implies both are up). Used by playwright.config.ts.
import { execFileSync, spawn } from 'node:child_process';

const HOST = '127.0.0.1';
const SITE_PORT = '4421';
const FIXTURE_PORT = '4422';
const POLL_INTERVAL_MS = 250;
const POLL_TIMEOUT_MS = 30_000;

const astro = (args, env = {}) =>
  execFileSync('npx', ['astro', ...args], { stdio: 'inherit', env: { ...process.env, ...env } });

// --ignore-lock: Astro 7 allows one locked preview per project; e2e runs two, and must not
// clash with a preview the developer already has open.
const preview = (args) =>
  spawn('npx', ['astro', 'preview', '--ignore-lock', '--host', HOST, ...args], { stdio: 'inherit' });

async function waitFor(url) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server not accepting connections yet; retry until the deadline.
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

astro(['build']);
astro(['build', '--outDir', 'dist-fixture'], { ISOLDE_SITES_DIR: './tests/fixtures/sites' });

const servers = [preview(['--port', SITE_PORT])];
await waitFor(`http://${HOST}:${SITE_PORT}/ISOLDE/`);
servers.push(preview(['--outDir', 'dist-fixture', '--port', FIXTURE_PORT]));

const stop = () => {
  servers.forEach((server) => server.kill());
  process.exit(0);
};
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
