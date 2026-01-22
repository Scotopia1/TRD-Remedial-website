const fs = require('fs');
const path = require('path');

function generateAltTextSuggestion(filename, projectName, serviceType) {
  const base = path.basename(filename, path.extname(filename));

  const patterns = {
    hero: `Wide-angle view of ${serviceType} project at ${projectName}`,
    featured: `Close-up detail of ${serviceType} work at ${projectName}`,
    thumbnail: `${serviceType} project thumbnail for ${projectName}`,
    before: `Before ${serviceType}: Original condition at ${projectName}`,
    after: `After ${serviceType}: Completed work at ${projectName}`,
    gallery: `${serviceType} in progress at ${projectName}`,
  };

  for (const [key, template] of Object.entries(patterns)) {
    if (base.includes(key)) {
      return template;
    }
  }

  return `${serviceType} work at ${projectName}`;
}

function main() {
  const selectionsPath = path.join(__dirname, 'image-selections.json');

  if (!fs.existsSync(selectionsPath)) {
    console.error('✗ image-selections.json not found');
    console.log('\nExpected format:');
    console.log(JSON.stringify({
      projects: [
        {
          name: 'Project Name',
          slug: 'project-slug',
          serviceType: 'Service Type',
          images: [
            {
              targetFilename: 'hero.jpg'
            }
          ]
        }
      ]
    }, null, 2));
    process.exit(1);
  }

  const selections = JSON.parse(fs.readFileSync(selectionsPath, 'utf8'));
  const altTextSuggestions = [];

  console.log(`Generating alt text suggestions for ${selections.projects.length} projects...\n`);

  for (const project of selections.projects) {
    console.log(`📦 ${project.name}`);

    for (const image of project.images) {
      const suggestion = generateAltTextSuggestion(
        image.targetFilename,
        project.name,
        project.serviceType || 'structural remediation'
      );

      altTextSuggestions.push({
        project: project.name,
        filename: image.targetFilename,
        suggestion,
      });

      console.log(`  - ${image.targetFilename}: "${suggestion}"`);
    }
    console.log('');
  }

  const csv = [
    'Project,Filename,Suggested Alt Text',
    ...altTextSuggestions.map(s =>
      `"${s.project}","${s.filename}","${s.suggestion}"`
    ),
  ].join('\n');

  const outputPath = path.join(__dirname, 'alt-text-suggestions.csv');
  fs.writeFileSync(outputPath, csv);

  console.log(`✓ Generated ${altTextSuggestions.length} alt text suggestions`);
  console.log(`✓ Saved to: ${outputPath}`);
  console.log('\nReview and edit the CSV file, then use these suggestions when populating projects.ts');
}

main();
