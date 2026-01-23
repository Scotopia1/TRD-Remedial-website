const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(inputPath, outputPath, width, height, quality = 85) {
  try {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Get base filename without extension
    const ext = path.extname(outputPath);
    const baseOutputPath = outputPath.slice(0, -ext.length);

    // Generate WebP version
    const webpPath = `${baseOutputPath}.webp`;
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality })
      .toFile(webpPath);

    // Generate JPEG version
    const jpgPath = `${baseOutputPath}.jpg`;
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality, mozjpeg: true })
      .toFile(jpgPath);

    console.log(`✓ Optimized: ${path.basename(baseOutputPath)} (WebP + JPG)`);
    return { webp: webpPath, jpg: jpgPath };
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function processProjectImages(projectSlug, imageSelections) {
  const projectDir = path.join(__dirname, '..', 'public', 'images', 'projects', projectSlug);

  for (const selection of imageSelections) {
    const inputPath = selection.sourcePath;
    const outputPath = path.join(projectDir, selection.targetFilename);

    let width, height;
    switch (selection.purpose) {
      case 'hero':
        width = 1920;
        height = 800;
        break;
      case 'featured':
      case 'thumbnail':
        width = 1200;
        height = 800;
        break;
      case 'gallery':
      case 'before':
      case 'after':
        width = 1200;
        height = 800;
        break;
      default:
        width = 1200;
        height = 800;
    }

    await optimizeImage(inputPath, outputPath, width, height);
  }
}

async function main() {
  const selectionsPath = path.join(__dirname, 'image-selections.json');

  if (!fs.existsSync(selectionsPath)) {
    console.error('✗ image-selections.json not found. Create it first with project image mappings.');
    console.log('\nExpected format:');
    console.log(JSON.stringify({
      projects: [
        {
          name: 'Project Name',
          slug: 'project-slug',
          serviceType: 'Service Type',
          images: [
            {
              sourcePath: 'path/to/source/image.jpg',
              targetFilename: 'hero.jpg',
              purpose: 'hero'
            }
          ]
        }
      ]
    }, null, 2));
    process.exit(1);
  }

  const selections = JSON.parse(fs.readFileSync(selectionsPath, 'utf8'));

  console.log(`Processing ${selections.projects.length} projects...\n`);

  for (const project of selections.projects) {
    console.log(`📦 Processing: ${project.name}`);
    await processProjectImages(project.slug, project.images);
    console.log('');
  }

  console.log('✓ All images optimized successfully');
}

main().catch(console.error);
