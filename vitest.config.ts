/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// getViteConfig gives unit tests the same Vite setup as the site (SVG imports, import.meta.env.BASE_URL).
export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/lib/**/*.ts'],
      // astro:content wrappers: exercised by the e2e suite against a real build.
      exclude: ['src/lib/queries.ts'],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
