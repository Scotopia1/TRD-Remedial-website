import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const iconsDir = path.join(publicDir, 'icons');
const logoPath = path.join(publicDir, 'trd-logo.svg');

// Icon sizes to generate
const iconSizes = [72, 96, 128, 144, 152, 180, 192, 384, 512];
const faviconSizes = [16, 32, 48];

async function generateIcons() {
  console.log('Reading SVG logo from:', logoPath);

  // Read the SVG file
  const svgBuffer = fs.readFileSync(logoPath);

  // Ensure icons directory exists
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Generate PNG icons at various sizes
  for (const size of iconSizes) {
    const outputPath = size === 180
      ? path.join(iconsDir, 'apple-touch-icon.png')
      : path.join(iconsDir, `icon-${size}x${size}.png`);

    await sharp(svgBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outputPath);

    console.log(`Generated: ${path.basename(outputPath)} (${size}x${size})`);
  }

  // Generate favicon sizes
  const faviconImages = [];
  for (const size of faviconSizes) {
    const buffer = await sharp(svgBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    faviconImages.push({ size, buffer });
  }

  // For favicon.ico, we'll use the 32x32 PNG as a simple ICO
  // (proper multi-size ICO requires additional libraries, using 32x32 as primary)
  const favicon32 = await sharp(svgBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  // Also create a 48x48 version as favicon.ico (browsers handle PNG fine)
  await sharp(svgBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  console.log('Generated: favicon.ico (48x48)');
  console.log('Generated: favicon.png (32x32)');

  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
