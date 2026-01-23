const fs = require('fs');
const path = require('path');

// Read the service image mapping
const mappingPath = path.join(__dirname, '..', '..', 'service-image-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

const publicDir = path.join(__dirname, '..', 'public', 'images');
const projectsDir = path.join(publicDir, 'projects');
const servicesDir = path.join(publicDir, 'services');

let copiedCount = 0;
let errorCount = 0;
const errors = [];

console.log('🚀 Starting service image copy process...\n');

// Process each service
for (const service of mapping.services) {
  console.log(`📦 Processing: ${service.name} (${service.slug})`);

  const serviceDir = path.join(servicesDir, service.slug);

  // Create service directory if it doesn't exist
  if (!fs.existsSync(serviceDir)) {
    fs.mkdirSync(serviceDir, { recursive: true });
  }

  // Copy each image
  for (const image of service.images) {
    const sourcePath = path.join(projectsDir, image.sourceProject, image.sourceFile);
    const targetPath = path.join(serviceDir, image.targetFile);

    try {
      if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source file not found: ${sourcePath}`);
      }

      fs.copyFileSync(sourcePath, targetPath);
      console.log(`  ✓ Copied: ${image.sourceFile} → ${image.targetFile} (${image.type})`);
      copiedCount++;
    } catch (error) {
      console.error(`  ✗ Error copying ${image.sourceFile}:`, error.message);
      errors.push({
        service: service.name,
        image: image.sourceFile,
        error: error.message
      });
      errorCount++;
    }
  }

  console.log('');
}

console.log('═'.repeat(60));
console.log('📊 Summary:');
console.log(`  Total services processed: ${mapping.services.length}`);
console.log(`  Images successfully copied: ${copiedCount}`);
console.log(`  Errors encountered: ${errorCount}`);

if (errorCount > 0) {
  console.log('\n❌ Errors:');
  errors.forEach((err, i) => {
    console.log(`  ${i + 1}. ${err.service} - ${err.image}: ${err.error}`);
  });
  process.exit(1);
} else {
  console.log('\n✅ All service images copied successfully!');
}
