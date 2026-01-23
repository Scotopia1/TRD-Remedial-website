const fs = require('fs');
const path = require('path');

// Dynamic import for ES modules
async function loadServices() {
  const servicesPath = path.join(__dirname, '..', 'src', 'data', 'services.ts');

  // Read file content
  const content = fs.readFileSync(servicesPath, 'utf8');

  // Extract SERVICES array using regex (simple parsing)
  const servicesMatch = content.match(/export const SERVICES[^=]*=\s*\[([\s\S]*?)\];/);

  if (!servicesMatch) {
    throw new Error('Could not find SERVICES export in services.ts');
  }

  // Parse services by looking for top-level id fields (start of each service)
  const servicesStr = servicesMatch[1];
  const services = [];

  // Find all top-level service definitions by matching "id: 'service-name'," at the start
  const idMatches = [...servicesStr.matchAll(/id:\s*['"]([^'"]+)['"]/g)];

  idMatches.forEach((idMatch, idx) => {
    // Get the substring for this service (from this id to the next id or end)
    const startPos = idMatch.index;
    const endPos = idx < idMatches.length - 1 ? idMatches[idx + 1].index : servicesStr.length;
    const serviceBlock = servicesStr.substring(startPos, endPos);

    // Extract fields from this block
    const titleMatch = serviceBlock.match(/title:\s*['"]([^'"]+)['"]/);
    const slugMatch = serviceBlock.match(/slug:\s*['"]([^'"]+)['"]/);
    const heroMatch = serviceBlock.match(/heroImage:\s*['"]([^'"]+)['"]/);
    const featureMatch = serviceBlock.match(/featureImage:\s*['"]([^'"]+)['"]/);
    const processMatch = serviceBlock.match(/processImage:\s*['"]([^'"]+)['"]/);
    const visualMatch = serviceBlock.match(/visual:\s*['"]([^'"]+)['"]/);

    services.push({
      id: idMatch[1],
      title: titleMatch ? titleMatch[1] : 'Unknown',
      slug: slugMatch ? slugMatch[1] : 'unknown',
      heroImage: heroMatch ? heroMatch[1] : null,
      featureImage: featureMatch ? featureMatch[1] : null,
      processImage: processMatch ? processMatch[1] : null,
      visual: visualMatch ? visualMatch[1] : null,
    });
  });

  return services;
}

async function auditServiceImages() {
  let errors = 0;
  let warnings = 0;

  console.log('🔍 Auditing Service Images...\n');

  const publicDir = path.join(__dirname, '..', 'public');
  const services = await loadServices();

  services.forEach((service, idx) => {
    console.log(`${idx + 1}. ${service.title}:`);

    // Check hero image
    if (service.heroImage) {
      const heroPath = path.join(publicDir, service.heroImage);
      if (!fs.existsSync(heroPath)) {
        console.error(`  ✗ ERROR: Hero image not found: ${service.heroImage}`);
        errors++;
      } else {
        console.log(`  ✓ Hero image exists`);
      }
    } else {
      console.warn(`  ⚠ WARNING: No heroImage defined`);
      warnings++;
    }

    // Check feature image
    if (service.featureImage) {
      const featurePath = path.join(publicDir, service.featureImage);
      if (!fs.existsSync(featurePath)) {
        console.error(`  ✗ ERROR: Feature image not found: ${service.featureImage}`);
        errors++;
      } else {
        console.log(`  ✓ Feature image exists`);
      }
    }

    // Check process image
    if (service.processImage) {
      const processPath = path.join(publicDir, service.processImage);
      if (!fs.existsSync(processPath)) {
        console.error(`  ✗ ERROR: Process image not found: ${service.processImage}`);
        errors++;
      } else {
        console.log(`  ✓ Process image exists`);
      }
    }

    // Check for Unsplash fallbacks (should be replaced)
    if (service.visual && service.visual.includes('unsplash')) {
      console.warn(`  ⚠ WARNING: Still using Unsplash fallback for visual`);
      warnings++;
    }

    console.log('');
  });

  console.log(`\n📊 Summary:`);
  console.log(`  Total Services: ${services.length}`);
  console.log(`  Errors: ${errors}`);
  console.log(`  Warnings: ${warnings}`);

  if (errors > 0) {
    console.error('\n❌ FAILED: Fix missing images before deployment');
    process.exit(1);
  } else if (warnings > 0) {
    console.log('\n✅ PASSED: Review warnings for completeness');
  } else {
    console.log('\n✅ PERFECT: All service images present');
  }
}

auditServiceImages().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
