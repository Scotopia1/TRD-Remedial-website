/**
 * Blur Placeholder Generator
 *
 * Generates base64-encoded blur placeholders for all images in the project
 * using sharp. These placeholders are used for progressive image loading
 * with the OptimizedImage component.
 *
 * Usage: node scripts/generate-blur-placeholders.mjs
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'blurPlaceholders.json');
const BLUR_SIZE = 10; // 10x10 pixels for blur placeholder
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Recursively find all images in a directory
 */
async function findImages(dir, baseDir = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and other non-public directories
      if (!['node_modules', '.next', 'icons'].includes(entry.name)) {
        const subImages = await findImages(fullPath, baseDir);
        images.push(...subImages);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        // Convert to web path (relative to public folder)
        const relativePath = path.relative(baseDir, fullPath);
        const webPath = '/' + relativePath.replace(/\\/g, '/');
        images.push({ fullPath, webPath });
      }
    }
  }

  return images;
}

/**
 * Generate blur placeholder for a single image
 */
async function generateBlurPlaceholder(imagePath) {
  try {
    const buffer = await sharp(imagePath)
      .resize(BLUR_SIZE, BLUR_SIZE, {
        fit: 'inside',
      })
      .blur()
      .png()
      .toBuffer();

    const base64 = `data:image/png;base64,${buffer.toString('base64')}`;
    return base64;
  } catch (error) {
    console.error(`Error generating placeholder for ${imagePath}:`, error.message);
    return null;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Scanning for images...');
  const images = await findImages(PUBLIC_DIR);

  console.log(`\n📸 Found ${images.length} images\n`);

  const placeholders = {};
  let successCount = 0;
  let errorCount = 0;

  for (const { fullPath, webPath } of images) {
    process.stdout.write(`Processing: ${webPath}... `);

    const placeholder = await generateBlurPlaceholder(fullPath);

    if (placeholder) {
      placeholders[webPath] = placeholder;
      successCount++;
      console.log('✓');
    } else {
      errorCount++;
      console.log('✗');
    }
  }

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  await fs.mkdir(outputDir, { recursive: true });

  // Write results to JSON file
  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(placeholders, null, 2),
    'utf-8'
  );

  console.log(`\n✅ Done!`);
  console.log(`   Generated: ${successCount} placeholders`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Output: ${OUTPUT_FILE}`);
}

main().catch(console.error);
