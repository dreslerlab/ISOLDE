// Generates the static icons in public/ from the logo. Run once after the logo changes:
//   npm run generate:icons
// Outputs: public/favicon.svg, public/apple-touch-icon.png (180×180 px), public/og-image.png (1200×630 px).
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const LOGO = new URL('../src/assets/isolde-logo.svg', import.meta.url);
const PUBLIC = new URL('../public/', import.meta.url);
const SURFACE = '#e2e7c6';
const TEXT = '#1b1b1b';
const TOUCH_ICON_PX = 180;
const OG = { width: 1200, height: 630, logoWidth: 520, padding: 64 };
const STUDY_TITLE_LINES = ['International Study', 'on Lucid Dreaming', 'Expertise'];

// Simplified "eye" mark from the logo; legible at 16 px where the full logo is not.
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#000"/>
<ellipse cx="16" cy="16" rx="12.5" ry="8" fill="#fff"/>
<path d="M18 9.6a6.4 6.4 0 0 1 0 12.8 9 9 0 0 0 0-12.8z" fill="#1b1b1b"/>
<circle cx="19" cy="16" r="5.6" fill="#1b1b1b"/>
</svg>
`;

const logoSvg = await readFile(LOGO);

await writeFile(new URL('favicon.svg', PUBLIC), FAVICON_SVG);

const touchLogo = await sharp(logoSvg, { density: 600 }).resize({ width: TOUCH_ICON_PX - 30 }).png().toBuffer();
await sharp({ create: { width: TOUCH_ICON_PX, height: TOUCH_ICON_PX, channels: 4, background: '#ffffff' } })
  .composite([{ input: touchLogo, gravity: 'center' }])
  .png()
  .toFile(new URL('apple-touch-icon.png', PUBLIC).pathname);

const ogLogo = await sharp(logoSvg, { density: 600 }).resize({ width: OG.logoWidth }).png().toBuffer();
const { height: ogLogoHeight } = await sharp(ogLogo).metadata();
const textX = OG.padding * 2 + OG.logoWidth;
const titleSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${OG.width - textX}" height="${OG.height}">
<style>text { font: 700 54px Helvetica, Arial, sans-serif; fill: ${TEXT}; }</style>
${STUDY_TITLE_LINES.map((line, i) => `<text x="0" y="${OG.height / 2 - 60 + i * 66}">${line}</text>`).join('\n')}
</svg>`);

await sharp({ create: { width: OG.width, height: OG.height, channels: 4, background: SURFACE } })
  .composite([
    { input: ogLogo, left: OG.padding, top: Math.round((OG.height - (ogLogoHeight ?? 0)) / 2) },
    { input: titleSvg, left: textX, top: 0 },
  ])
  .png()
  .toFile(new URL('og-image.png', PUBLIC).pathname);

process.stdout.write('Generated public/favicon.svg, public/apple-touch-icon.png, public/og-image.png\n');
