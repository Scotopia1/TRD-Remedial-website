const fs = require('fs');
const path = require('path');

const projects = [
  'caringbah-pavilion',
  'florence-capri-wentworth-point',
  'pelican-road-schofields',
  'marsden-park-phase-1',
  'marsden-park-phase-2',
  'waitara-slab-injection',
  'coles-lindfield',
  'kingswood-slab-scanning',
  'zetland-surelock',
  'enfield-curtain-wall',
  'toongabie-slab-repairs',
  'northbridge-structural-repairs',
];

const services = [
  'crack-injection',
  'concrete-cutting',
  'crack-repairs',
  'structural-alterations',
  'slab-scanning',
  'temporary-moving-joints',
  'concrete-strengthening',
  'curtain-wall-injection',
  'shoring-wall-repairs',
];

const baseDir = path.join(__dirname, '..', 'public', 'images');

console.log('Creating image directory structure...\n');

// Create project directories
projects.forEach(project => {
  const dir = path.join(baseDir, 'projects', project);
  fs.mkdirSync(dir, { recursive: true });
  console.log(`✓ Created: projects/${project}`);
});

console.log('');

// Create service directories
services.forEach(service => {
  const dir = path.join(baseDir, 'services', service);
  fs.mkdirSync(dir, { recursive: true });
  console.log(`✓ Created: services/${service}`);
});

console.log('');

// Create other directories
['hero', 'showcase'].forEach(type => {
  const dir = path.join(baseDir, type);
  fs.mkdirSync(dir, { recursive: true });
  console.log(`✓ Created: ${type}/`);
});

console.log('\n✓ All image directories created successfully');
console.log(`\nTotal directories created: ${projects.length + services.length + 2}`);
