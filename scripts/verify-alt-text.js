const fs = require('fs');
const path = require('path');

function verifyAltText() {
  const projectsPath = path.join(__dirname, '..', 'src', 'data', 'projects.ts');

  if (!fs.existsSync(projectsPath)) {
    console.error('✗ projects.ts not found at:', projectsPath);
    process.exit(1);
  }

  const projectsContent = fs.readFileSync(projectsPath, 'utf8');

  // Find images without alt text (simple regex check)
  // Looks for image objects with url but no alt property
  const missingAltPattern = /{[^}]*url:\s*['"][^'"]+['"][^}]*}(?![^{]*alt:)/g;
  const matches = projectsContent.match(missingAltPattern);

  if (matches && matches.length > 0) {
    console.error(`\n✗ Found ${matches.length} potential images without alt text:\n`);
    matches.forEach((match, i) => {
      const truncated = match.length > 80 ? match.substring(0, 77) + '...' : match;
      console.error(`  ${i + 1}. ${truncated}`);
    });
    console.error('\n⚠️  All images must have descriptive alt text for SEO and accessibility.');
    console.error('   Add alt: "descriptive text" to each image object.\n');
    process.exit(1);
  } else {
    console.log('\n✓ All images appear to have alt text');
    console.log('✓ projects.ts passes alt text verification\n');
  }

  // Additional check: Find very short alt text (< 10 chars)
  const shortAltPattern = /alt:\s*['"](.{1,9})['"] /g;
  const shortMatches = [];
  let match;

  while ((match = shortAltPattern.exec(projectsContent)) !== null) {
    shortMatches.push(match[1]);
  }

  if (shortMatches.length > 0) {
    console.warn(`\n⚠️  Warning: Found ${shortMatches.length} images with very short alt text (< 10 chars):`);
    shortMatches.forEach((alt, i) => {
      console.warn(`  ${i + 1}. "${alt}"`);
    });
    console.warn('\n   Consider making alt text more descriptive (50-125 characters recommended).\n');
  } else {
    console.log('✓ All alt text appears to be sufficiently descriptive\n');
  }
}

verifyAltText();
