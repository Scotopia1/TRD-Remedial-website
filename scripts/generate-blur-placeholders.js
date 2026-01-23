const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Generates Low Quality Image Placeholders (LQIP) for all optimized images
 * Creates 10px wide base64-encoded blur placeholders for 0 CLS (Cumulative Layout Shift)
 */

async function generateBlurPlaceholder(imagePath) {
  try {
    const buffer = await sharp(imagePath)
      .resize(10) // 10px width, height auto-calculated
      .blur(2) // Blur for LQIP effect
      .jpeg({ quality: 50 }) // Low quality for small file size
      .toBuffer();

    const base64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    return base64;
  } catch (error) {
    console.error(`✗ Error generating placeholder for ${path.basename(imagePath)}:`, error.message);
    return null;
  }
}

async function generateAllPlaceholders() {
  const projectsDir = path.join(__dirname, '..', 'public', 'images', 'projects');
  const blurPlaceholdersPath = path.join(__dirname, '..', 'src', 'data', 'blurPlaceholders.json');

  // Initialize or load existing placeholders
  let placeholders = {};
  if (fs.existsSync(blurPlaceholdersPath)) {
    placeholders = JSON.parse(fs.readFileSync(blurPlaceholdersPath, 'utf8'));
    console.log(`Loaded existing placeholders file with ${Object.keys(placeholders).length} entries\n`);
  }

  // Get all project directories
  const projectDirs = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  let generatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  console.log(`Processing ${projectDirs.length} project directories...\n`);

  for (const projectSlug of projectDirs) {
    const projectPath = path.join(projectsDir, projectSlug);
    const imageFiles = fs.readdirSync(projectPath).filter(file => file.endsWith('.jpg'));

    if (imageFiles.length === 0) {
      console.log(`⊘ ${projectSlug}: No images found, skipping...`);
      continue;
    }

    console.log(`📦 ${projectSlug} (${imageFiles.length} images):`);

    for (const imageFile of imageFiles) {
      const imagePath = path.join(projectPath, imageFile);
      const placeholderKey = `/images/projects/${projectSlug}/${imageFile}`;

      // Skip if placeholder already exists
      if (placeholders[placeholderKey]) {
        console.log(`  ⊘ ${imageFile}: Placeholder exists, skipping...`);
        skippedCount++;
        continue;
      }

      // Generate placeholder
      const placeholder = await generateBlurPlaceholder(imagePath);

      if (placeholder) {
        placeholders[placeholderKey] = placeholder;
        console.log(`  ✓ ${imageFile}: Placeholder generated`);
        generatedCount++;
      } else {
        console.log(`  ✗ ${imageFile}: Failed to generate placeholder`);
        errorCount++;
      }
    }

    console.log('');
  }

  // Save updated placeholders
  fs.writeFileSync(
    blurPlaceholdersPath,
    JSON.stringify(placeholders, null, 2),
    'utf8'
  );

  console.log('═══════════════════════════════════════════════════════════');
  console.log('BLUR PLACEHOLDER GENERATION COMPLETE');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`✓ Generated:  ${generatedCount} new placeholders`);
  console.log(`⊘ Skipped:    ${skippedCount} existing placeholders`);
  console.log(`✗ Errors:     ${errorCount} failed generations`);
  console.log(`📊 Total:      ${Object.keys(placeholders).length} placeholders in database`);
  console.log(`💾 Saved to:   ${blurPlaceholdersPath}`);
  console.log('═══════════════════════════════════════════════════════════\n');

  // Show sample placeholder
  const sampleKey = Object.keys(placeholders)[0];
  if (sampleKey) {
    const samplePlaceholder = placeholders[sampleKey];
    const sampleSize = Buffer.from(samplePlaceholder.split(',')[1], 'base64').length;
    console.log(`Sample placeholder: ${sampleKey}`);
    console.log(`Sample size: ${(sampleSize / 1024).toFixed(2)} KB`);
    console.log(`Sample data: ${samplePlaceholder.substring(0, 100)}...`);
  }
}

generateAllPlaceholders().catch(console.error);
