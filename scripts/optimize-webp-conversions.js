#!/usr/bin/env node

/**
 * WebP Optimization - Keep Only Smaller Files
 *
 * Compares WebP files to their JPG originals and:
 * - Keeps WebP if smaller
 * - Deletes WebP if larger (will use JPG instead)
 * - Reports actual savings
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images');

const stats = {
  totalPairs: 0,
  keptWebP: 0,
  deletedWebP: 0,
  savingsKB: 0,
};

/**
 * Get all WebP files recursively
 */
function getAllWebPFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllWebPFiles(filePath, fileList);
    } else if (/\.webp$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Compare WebP to JPG and delete if larger
 */
function optimizeWebP(webpPath) {
  // Find corresponding JPG
  const jpgPath = webpPath.replace(/\.webp$/i, '.jpg');
  const jpegPath = webpPath.replace(/\.webp$/i, '.jpeg');

  let originalPath = null;
  if (fs.existsSync(jpgPath)) {
    originalPath = jpgPath;
  } else if (fs.existsSync(jpegPath)) {
    originalPath = jpegPath;
  } else {
    console.log(`⚠️  No JPG found for: ${path.relative(PUBLIC_IMAGES_DIR, webpPath)}`);
    return;
  }

  stats.totalPairs++;

  const webpSize = fs.statSync(webpPath).size;
  const jpgSize = fs.statSync(originalPath).size;
  const savingsBytes = jpgSize - webpSize;
  const savingsPercent = ((savingsBytes / jpgSize) * 100).toFixed(1);

  const relativePath = path.relative(PUBLIC_IMAGES_DIR, webpPath);

  if (savingsBytes > 0) {
    // WebP is smaller - keep it
    const savingsKB = (savingsBytes / 1024).toFixed(1);
    console.log(`✅ Keep WebP: ${relativePath}`);
    console.log(`   Savings: ${savingsKB}KB (${savingsPercent}%)`);
    stats.keptWebP++;
    stats.savingsKB += parseFloat(savingsKB);
  } else {
    // WebP is larger - delete it
    const wasteKB = (Math.abs(savingsBytes) / 1024).toFixed(1);
    console.log(`❌ Delete WebP: ${relativePath}`);
    console.log(`   Larger by: ${wasteKB}KB (${Math.abs(parseFloat(savingsPercent))}%)`);

    try {
      fs.unlinkSync(webpPath);
      stats.deletedWebP++;
    } catch (error) {
      console.error(`   Error deleting: ${error.message}`);
    }
  }
}

/**
 * Main optimization function
 */
function optimizeAllWebP() {
  console.log('🖼️  WebP Optimization - Keep Only Smaller Files');
  console.log('=' .repeat(60));
  console.log(`📁 Source: ${PUBLIC_IMAGES_DIR}`);
  console.log('=' .repeat(60));
  console.log('');

  const webpFiles = getAllWebPFiles(PUBLIC_IMAGES_DIR);
  console.log(`📊 Found ${webpFiles.length} WebP files`);
  console.log('');

  // Sort by size (largest first)
  webpFiles.sort((a, b) => {
    return fs.statSync(b).size - fs.statSync(a).size;
  });

  // Optimize each file
  webpFiles.forEach((webpPath) => {
    optimizeWebP(webpPath);
  });

  // Print summary
  console.log('');
  console.log('=' .repeat(60));
  console.log('📊 Optimization Summary');
  console.log('=' .repeat(60));
  console.log(`Total WebP files analyzed: ${stats.totalPairs}`);
  console.log(`✅ Kept (smaller): ${stats.keptWebP}`);
  console.log(`❌ Deleted (larger): ${stats.deletedWebP}`);
  console.log('');
  console.log(`💾 Actual savings: ${stats.savingsKB.toFixed(1)}KB`);
  console.log(`💾 Actual savings: ${(stats.savingsKB / 1024).toFixed(2)}MB`);
  console.log('');

  const percentKept = ((stats.keptWebP / stats.totalPairs) * 100).toFixed(1);
  console.log(`📈 ${percentKept}% of WebP files are actually smaller`);
  console.log('');

  console.log('✨ Optimization complete!');
  console.log('');
  console.log('💡 Next.js Image component will automatically:');
  console.log('   - Use .webp files where they exist and are smaller');
  console.log('   - Fall back to .jpg for images where WebP was larger');
  console.log('');
}

// Run optimization
optimizeAllWebP();
