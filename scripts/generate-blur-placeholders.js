const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

/**
 * Generate Low Quality Image Placeholder (LQIP) for zero CLS
 * @param {string} imagePath - Absolute path to image file
 * @returns {Promise<string>} Base64 data URI
 */
async function generateBlurPlaceholder(imagePath) {
  try {
    const buffer = await sharp(imagePath)
      .resize(10, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: 50,
        mozjpeg: true
      })
      .toBuffer();

    const base64 = buffer.toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error(`✗ Failed to process ${path.basename(imagePath)}:`, error.message);
    return null;
  }
}

/**
 * Recursively get all image files from a directory
 * @param {string} dir - Directory path
 * @returns {Promise<string[]>} Array of image file paths
 */
async function getImageFiles(dir) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const files = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await getImageFiles(fullPath);
        files.push(...subFiles);
      } else if (imageExtensions.includes(path.extname(entry.name).toLowerCase())) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`✗ Failed to read directory ${dir}:`, error.message);
  }

  return files;
}

/**
 * Extract project slug and image name from file path
 * @param {string} filePath - Full file path
 * @param {string} baseDir - Base directory path
 * @returns {{projectSlug: string, imageName: string}}
 */
function parseImagePath(filePath, baseDir) {
  const relativePath = path.relative(baseDir, filePath);
  const parts = relativePath.split(path.sep);

  return {
    projectSlug: parts[0],
    imageName: path.basename(filePath, path.extname(filePath))
  };
}

/**
 * Main function to generate all blur placeholders
 */
async function main() {
  console.log('🖼️  TRD Blur Placeholder Generator\n');
  console.log('━'.repeat(50));

  const projectRoot = path.join(__dirname, '..');
  const imagesDir = path.join(projectRoot, 'public', 'images', 'projects');
  const outputPath = path.join(projectRoot, 'src', 'data', 'blurPlaceholders.json');

  // Check if images directory exists
  try {
    await fs.access(imagesDir);
  } catch (error) {
    console.error(`✗ Images directory not found: ${imagesDir}`);
    process.exit(1);
  }

  // Get all image files
  console.log(`📂 Scanning: ${imagesDir}\n`);
  const imageFiles = await getImageFiles(imagesDir);

  if (imageFiles.length === 0) {
    console.log('⚠️  No images found');
    process.exit(0);
  }

  console.log(`Found ${imageFiles.length} images\n`);
  console.log('━'.repeat(50) + '\n');

  // Generate placeholders
  const placeholders = {
    projects: {}
  };

  let successCount = 0;
  let failCount = 0;

  for (const imagePath of imageFiles) {
    const { projectSlug, imageName } = parseImagePath(imagePath, imagesDir);

    const placeholder = await generateBlurPlaceholder(imagePath);

    if (placeholder) {
      if (!placeholders.projects[projectSlug]) {
        placeholders.projects[projectSlug] = {};
      }
      placeholders.projects[projectSlug][imageName] = placeholder;
      console.log(`✓ Generated placeholder for: ${projectSlug}/${imageName}`);
      successCount++;
    } else {
      console.log(`✗ Failed: ${projectSlug}/${imageName}`);
      failCount++;
    }
  }

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    console.error(`✗ Failed to create output directory: ${error.message}`);
    process.exit(1);
  }

  // Write output file
  try {
    await fs.writeFile(
      outputPath,
      JSON.stringify(placeholders, null, 2),
      'utf8'
    );
    console.log('\n' + '━'.repeat(50));
    console.log(`\n✅ Success! Generated ${successCount} placeholders`);
    if (failCount > 0) {
      console.log(`⚠️  Failed: ${failCount} images`);
    }
    console.log(`\n📄 Output: ${outputPath}`);
    console.log('\n' + '━'.repeat(50));
  } catch (error) {
    console.error(`\n✗ Failed to write output file: ${error.message}`);
    process.exit(1);
  }
}

// Run script
main().catch(error => {
  console.error('\n💥 Script failed:', error);
  process.exit(1);
});
