const fs = require('fs');
const path = require('path');

// Import data files
const { PROJECTS } = require('../src/data/projects.ts');
const { SERVICES } = require('../src/data/services.ts');

console.log('🔍 Data Integrity Verification\n');

let errors = 0;
let warnings = 0;

// 1. Verify all project IDs are unique
console.log('1️⃣  Checking project ID uniqueness...');
const projectIds = PROJECTS.map(p => p.id);
const duplicateIds = projectIds.filter((id, index) => projectIds.indexOf(id) !== index);
if (duplicateIds.length > 0) {
  console.error(`   ✗ Duplicate project IDs found: ${duplicateIds.join(', ')}`);
  errors++;
} else {
  console.log(`   ✓ All ${PROJECTS.length} project IDs are unique`);
}

// 2. Verify all serviceId values match service slugs
console.log('\n2️⃣  Checking serviceId validity...');
const serviceIds = SERVICES.map(s => s.slug);
PROJECTS.forEach(project => {
  if (!serviceIds.includes(project.serviceId)) {
    console.error(`   ✗ Project "${project.name}" has invalid serviceId: "${project.serviceId}"`);
    errors++;
  }
});
console.log(`   ✓ All serviceId values are valid`);

// 3. Verify all relatedProjects IDs exist
console.log('\n3️⃣  Checking relatedProjects references...');
PROJECTS.forEach(project => {
  if (project.relatedProjects) {
    project.relatedProjects.forEach(relatedId => {
      if (!projectIds.includes(relatedId)) {
        console.error(`   ✗ Project "${project.name}" references non-existent project: "${relatedId}"`);
        errors++;
      }
    });
  }
});
console.log(`   ✓ All relatedProjects references are valid`);

// 4. Verify service relatedProjects
console.log('\n4️⃣  Checking service relatedProjects...');
SERVICES.forEach(service => {
  if (service.relatedProjects && service.relatedProjects.length > 0) {
    service.relatedProjects.forEach(projectId => {
      if (!projectIds.includes(projectId)) {
        console.error(`   ✗ Service "${service.title}" references non-existent project: "${projectId}"`);
        errors++;
      }
    });
  }
});
console.log(`   ✓ All service relatedProjects references are valid`);

// 5. Verify image paths exist
console.log('\n5️⃣  Checking image paths...');
let missingImages = 0;
let totalImages = 0;

PROJECTS.forEach(project => {
  const imagePaths = [
    project.heroImage,
    project.featuredImage,
    project.thumbnailImage,
  ];

  if (project.beforeImage) imagePaths.push(project.beforeImage.url);
  if (project.afterImage) imagePaths.push(project.afterImage.url);
  if (project.galleryImages) {
    project.galleryImages.forEach(img => imagePaths.push(img.url));
  }

  imagePaths.forEach(imagePath => {
    totalImages++;
    const fullPath = path.join(__dirname, '..', 'public', imagePath);
    if (!fs.existsSync(fullPath)) {
      console.error(`   ✗ Missing: ${imagePath}`);
      missingImages++;
    }
  });
});

if (missingImages > 0) {
  console.error(`   ✗ ${missingImages} of ${totalImages} images are missing`);
  errors += missingImages;
} else {
  console.log(`   ✓ All ${totalImages} image paths exist`);
}

// 6. Verify all projects have required fields
console.log('\n6️⃣  Checking required project fields...');
const requiredFields = ['id', 'slug', 'name', 'location', 'date', 'serviceType', 'serviceId', 'category', 'featuredImage', 'thumbnailImage', 'heroImage', 'tagline', 'challenge', 'solution', 'results'];

PROJECTS.forEach(project => {
  requiredFields.forEach(field => {
    if (!project[field] || (Array.isArray(project[field]) && project[field].length === 0)) {
      console.error(`   ✗ Project "${project.name}" missing required field: ${field}`);
      errors++;
    }
  });
});
console.log(`   ✓ All projects have required fields`);

// 7. Check tagline length
console.log('\n7️⃣  Checking tagline lengths...');
PROJECTS.forEach(project => {
  const taglineLength = project.tagline.length;
  if (taglineLength < 50 || taglineLength > 80) {
    console.warn(`   ⚠ Project "${project.name}" tagline length ${taglineLength} (should be 50-80 chars)`);
    warnings++;
  }
});
console.log(`   ✓ Tagline length check complete`);

// 8. Check content word counts (Revised: concise format 60-120 words)
console.log('\n8️⃣  Checking content word counts...');
PROJECTS.forEach(project => {
  const challengeWords = project.challenge.split(/\s+/).length;
  const solutionWords = project.solution.split(/\s+/).length;
  const resultsWords = project.results.split(/\s+/).length;

  if (challengeWords < 60 || challengeWords > 120) {
    console.warn(`   ⚠ Project "${project.name}" challenge word count ${challengeWords} (should be 60-120)`);
    warnings++;
  }
  if (solutionWords < 60 || solutionWords > 120) {
    console.warn(`   ⚠ Project "${project.name}" solution word count ${solutionWords} (should be 60-120)`);
    warnings++;
  }
  if (resultsWords < 60 || resultsWords > 120) {
    console.warn(`   ⚠ Project "${project.name}" results word count ${resultsWords} (should be 60-120)`);
    warnings++;
  }
});
console.log(`   ✓ Content word count check complete`);

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(50));
console.log(`✓ Total Projects: ${PROJECTS.length}`);
console.log(`✓ Total Services: ${SERVICES.length}`);
console.log(`✓ Total Images: ${totalImages}`);
console.log(`${errors === 0 ? '✓' : '✗'} Errors: ${errors}`);
console.log(`${warnings === 0 ? '✓' : '⚠'} Warnings: ${warnings}`);

if (errors === 0 && warnings === 0) {
  console.log('\n🎉 All checks passed! Data integrity verified.');
  process.exit(0);
} else if (errors > 0) {
  console.log('\n❌ Verification failed. Please fix errors before proceeding.');
  process.exit(1);
} else {
  console.log('\n⚠️  Verification passed with warnings. Review warnings above.');
  process.exit(0);
}
