#!/usr/bin/env node

/**
 * Image WebP Conversion Script
 *
 * Converts all JPG images in public/images to WebP format
 * Uses Sharp for high-quality conversion with 85% quality
 *
 * Expected savings: ~25MB (88% reduction from JPG)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images');
const WEBP_QUALITY = 85; // Balance between quality and size

// Track conversion stats
const stats = {
  totalFiles: 0,
  converted: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  newSize: 0,
};

/**
 * Get all JPG files recursively from a directory
 */
function getAllJpgFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllJpgFiles(filePath, fileList);
    } else if (/\.(jpg|jpeg)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Convert a single JPG to WebP
 */
async function convertToWebP(jpgPath) {
  const webpPath = jpgPath.replace(/\.(jpg|jpeg)$/i, '.webp');

  try {
    // Skip if WebP already exists
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  Skipped (exists): ${path.relative(PUBLIC_IMAGES_DIR, webpPath)}`);
      stats.skipped++;
      return;
    }

    // Get original file size
    const originalStats = fs.statSync(jpgPath);
    stats.originalSize += originalStats.size;

    // Convert to WebP
    await sharp(jpgPath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath);

    // Get new file size
    const newStats = fs.statSync(webpPath);
    stats.newSize += newStats.size;

    const reduction = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
    const originalKB = (originalStats.size / 1024).toFixed(1);
    const newKB = (newStats.size / 1024).toFixed(1);

    console.log(`✅ Converted: ${path.relative(PUBLIC_IMAGES_DIR, jpgPath)}`);
    console.log(`   ${originalKB}KB → ${newKB}KB (${reduction}% reduction)`);

    stats.converted++;
  } catch (error) {
    console.error(`❌ Error converting ${jpgPath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Main conversion function
 */
async function convertAllImages() {
  console.log('🖼️  TRD Website - JPG to WebP Conversion');
  console.log('=' .repeat(60));
  console.log(`📁 Source: ${PUBLIC_IMAGES_DIR}`);
  console.log(`🎨 Quality: ${WEBP_QUALITY}%`);
  console.log('=' .repeat(60));
  console.log('');

  // Get all JPG files
  const jpgFiles = getAllJpgFiles(PUBLIC_IMAGES_DIR);
  stats.totalFiles = jpgFiles.length;

  console.log(`📊 Found ${jpgFiles.length} JPG images`);
  console.log('');

  // Sort by size (largest first) for better progress visibility
  jpgFiles.sort((a, b) => {
    return fs.statSync(b).size - fs.statSync(a).size;
  });

  // Convert each file
  for (const jpgPath of jpgFiles) {
    await convertToWebP(jpgPath);
  }

  // Print summary
  console.log('');
  console.log('=' .repeat(60));
  console.log('📊 Conversion Summary');
  console.log('=' .repeat(60));
  console.log(`Total files: ${stats.totalFiles}`);
  console.log(`✅ Converted: ${stats.converted}`);
  console.log(`⏭️  Skipped: ${stats.skipped}`);
  console.log(`❌ Errors: ${stats.errors}`);
  console.log('');

  if (stats.converted > 0) {
    const totalOriginalMB = (stats.originalSize / 1024 / 1024).toFixed(2);
    const totalNewMB = (stats.newSize / 1024 / 1024).toFixed(2);
    const totalSavingsMB = (totalOriginalMB - totalNewMB).toFixed(2);
    const totalReduction = ((1 - stats.newSize / stats.originalSize) * 100).toFixed(1);

    console.log(`💾 Total savings: ${totalSavingsMB}MB (${totalReduction}% reduction)`);
    console.log(`📦 Original total: ${totalOriginalMB}MB`);
    console.log(`📦 New total: ${totalNewMB}MB`);
  }

  console.log('');
  console.log('✨ Conversion complete!');
  console.log('');
  console.log('⚠️  Next steps:');
  console.log('1. Update image imports from .jpg to .webp');
  console.log('2. Test all pages to ensure images display correctly');
  console.log('3. Consider removing original .jpg files after verification');
  console.log('');
}

// Run conversion
convertAllImages().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
