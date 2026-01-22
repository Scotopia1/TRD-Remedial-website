const fs = require('fs');
const path = require('path');

function copyAndRenameImage(sourcePath, targetPath) {
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.copyFileSync(sourcePath, targetPath);
  console.log(`✓ Copied: ${path.basename(sourcePath)} → ${path.basename(targetPath)}`);
}

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

  const selections = JSON.parse(fs.readFileSync(selectionsPath, 'utf8'));

  console.log(`Copying images for ${selections.projects.length} projects...\n`);

  for (const project of selections.projects) {
    console.log(`📦 ${project.name}`);

    for (const image of project.images) {
      const targetPath = path.join(
        __dirname,
        '..',
        'public',
        'images',
        'projects',
        project.slug,
        image.targetFilename
      );

      try {
        copyAndRenameImage(image.sourcePath, targetPath);
      } catch (error) {
        console.error(`✗ Error copying ${image.sourcePath}:`, error.message);
      }
    }
    console.log('');
  }

  console.log('✓ All images copied and renamed');
}

processAllProjects();
