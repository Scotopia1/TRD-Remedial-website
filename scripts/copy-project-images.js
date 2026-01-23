#!/usr/bin/env node

/**
 * TRD Project Image Copy Script
 *
 * Copies project images from TRD-content source folders to the website's public directory
 * based on the configuration in image-selections.json.
 *
 * Usage: node scripts/copy-project-images.js
 */

const fs = require('fs');
const path = require('path');

// Statistics tracking
const stats = {
  totalProjects: 0,
  totalImages: 0,
  copiedImages: 0,
  failedImages: 0,
  errors: []
};

/**
 * Copy a single image file with error handling
 */
function copyAndRenameImage(sourcePath, targetPath) {
  try {
    // Normalize paths for cross-platform compatibility
    const normalizedSource = path.normalize(sourcePath);
    const normalizedTarget = path.normalize(targetPath);

    // Check if source file exists
    if (!fs.existsSync(normalizedSource)) {
      throw new Error(`Source file not found: ${normalizedSource}`);
    }

    // Ensure target directory exists
    const targetDir = path.dirname(normalizedTarget);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copy the file
    fs.copyFileSync(normalizedSource, normalizedTarget);

    // Get file size for logging
    const sourceStats = fs.statSync(normalizedSource);
    const sizeKB = (sourceStats.size / 1024).toFixed(1);

    console.log(`✓ Copied: ${normalizedSource} → ${normalizedTarget} (${sizeKB}KB)`);
    stats.copiedImages++;
    return true;
  } catch (error) {
    console.error(`✗ Error: ${error.message}`);
    stats.failedImages++;
    stats.errors.push({
      source: sourcePath,
      target: targetPath,
      error: error.message
    });
    return false;
  }
}

/**
 * Process all projects from the configuration file
 */
function processAllProjects() {
  const selectionsPath = path.join(__dirname, 'image-selections.json');

  if (!fs.existsSync(selectionsPath)) {
    console.error('✗ image-selections.json not found');
    console.log('\nExpected format:');
    console.log(JSON.stringify({
      projects: [
        {
          name: 'Project Name',
          slug: 'project-slug',
          images: [
            {
              sourcePath: 'absolute/path/to/source/image.jpg',
              targetFilename: 'hero.jpg'
            }
          ]
        }
      ]
    }, null, 2));
    process.exit(1);
  }

  // Load configuration
  let selections;
  try {
    const configData = fs.readFileSync(selectionsPath, 'utf8');
    selections = JSON.parse(configData);
  } catch (error) {
    console.error(`✗ Failed to parse configuration: ${error.message}`);
    process.exit(1);
  }

  console.log('━'.repeat(80));
  console.log('  TRD Project Image Copy Utility');
  console.log('━'.repeat(80));
  console.log(`\nConfiguration: ${selections.version} (${selections.created})`);
  console.log(`Projects: ${selections.projects.length}`);

  // Count total images
  selections.projects.forEach(project => {
    stats.totalImages += project.images.length;
  });
  console.log(`Total images to copy: ${stats.totalImages}\n`);

  stats.totalProjects = selections.projects.length;

  // Process each project
  selections.projects.forEach((project, index) => {
    console.log(`\n[${ index + 1}/${selections.projects.length}] 📦 ${project.name}`);
    console.log(`    Slug: ${project.slug}`);
    console.log(`    Images: ${project.images.length}\n`);

    project.images.forEach((image) => {
      const targetPath = path.join(
        __dirname,
        '..',
        'public',
        'images',
        'projects',
        project.slug,
        image.targetFilename
      );

      copyAndRenameImage(image.sourcePath, targetPath);
    });
  });

  // Print summary
  console.log('\n' + '━'.repeat(80));
  console.log('  Copy Summary');
  console.log('━'.repeat(80) + '\n');
  console.log(`Total projects processed: ${stats.totalProjects}`);
  console.log(`Total images processed:   ${stats.totalImages}`);
  console.log(`✓ Successfully copied:    ${stats.copiedImages}`);
  console.log(`✗ Failed:                 ${stats.failedImages}`);

  // Display errors if any
  if (stats.errors.length > 0) {
    console.log('\n❌ Errors encountered:\n');
    stats.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.error}`);
      console.log(`   Source: ${error.source}`);
      console.log(`   Target: ${error.target}\n`);
    });
  }

  console.log('━'.repeat(80) + '\n');

  // Exit with appropriate code
  if (stats.failedImages > 0) {
    console.error('⚠️  Copy completed with errors');
    process.exit(1);
  } else {
    console.log('✅ All images copied successfully!\n');
    process.exit(0);
  }
}

// Main execution
if (require.main === module) {
  processAllProjects();
}

module.exports = { copyAndRenameImage };
