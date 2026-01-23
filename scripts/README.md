# TRD Site Scripts

Utility scripts for validating and maintaining the TRD website.

## Service Schema Validator

**Location:** `scripts/validate-service-schema.js`

Validates schema.org data integrity for all TRD services defined in `src/data/services.ts`.

### Usage

```bash
# Run validation
npm run validate:services

# Or directly with node
node scripts/validate-service-schema.js
```

### What It Checks

#### Required Fields
- `title` - Service name
- `slug` - URL-friendly identifier
- `description` - Service description
- `heroImage` - Hero image path
- `tagline` - Short service tagline

#### Format Validation
- **Slug Format**: Must be lowercase with hyphens only (regex: `^[a-z0-9-]+$`)
  - ✓ Valid: `crack-injection`, `concrete-cutting`
  - ✗ Invalid: `Crack-Injection`, `crack_injection`

- **URL Validation**: All image URLs must be absolute paths or full URLs
  - ✓ Valid: `/images/services/hero.jpg`, `https://images.unsplash.com/photo-...`
  - ✗ Invalid: `images/hero.jpg`, `../assets/hero.jpg`

- **Description Length**: SEO-optimized length (50-160 characters)
  - Warnings for descriptions outside this range
  - Helps with search engine meta descriptions

#### Data Quality Checks
- **Related Projects**: Flags placeholder project IDs (e.g., `project-001`)
- **Stats**: Validates `value` and `label` fields
- **Process Steps**: Validates `step`, `title`, and `description` fields
- **FAQs**: Validates `question` and `answer` fields
- **Testimonials**: Validates `quote`, `author`, `role`, and `company` fields

### Exit Codes
- **0**: All validations passed (warnings allowed)
- **1**: One or more validation errors (fails CI/CD)

### Output Format

```
╔═══════════════════════════════════════╗
║  TRD Service Schema Validator         ║
╚═══════════════════════════════════════╝

Validating 9 services...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Service: Crack Injection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Warnings (2):
  ⚠ 1. Description too long (276 chars) - recommended 50-160 for SEO
  ⚠ 2. Related project at index 0 appears to be placeholder: "project-004"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VALIDATION SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Services: 9
Passed: 9
Failed: 0
Total Errors: 0
Total Warnings: 16
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ All services passed validation!
```

### Integration with CI/CD

Add to your CI/CD pipeline:

```yaml
# .github/workflows/validate.yml
- name: Validate Service Schema
  run: npm run validate:services
```

The script will fail (exit code 1) if any **errors** are found, blocking deployment.
Warnings are informational and won't block deployment.

### Common Issues

#### Missing Required Fields
```
✗ Missing required field: heroImage
```
**Fix:** Add the missing field to the service object in `src/data/services.ts`

#### Invalid Slug Format
```
✗ Invalid slug format: "Crack-Injection" - must be lowercase with hyphens only
```
**Fix:** Change slug to lowercase: `crack-injection`

#### Invalid URL Format
```
✗ Invalid URL format for heroImage: "images/hero.jpg" - must be absolute path or full URL
```
**Fix:** Add leading slash: `/images/hero.jpg`

#### Description Length Warning
```
⚠ Description too long (276 chars) - recommended 50-160 for SEO
```
**Fix:** Shorten description or move detailed content to expanded fields

#### Placeholder Project IDs
```
⚠ Related project at index 0 appears to be placeholder: "project-004"
```
**Fix:** Replace with actual project slugs when real projects are added

### Extending Validation

To add new validation rules, edit `scripts/validate-service-schema.js`:

```javascript
// Add new validation in validateService() function
if (service.newField) {
  if (!isValid(service.newField)) {
    errors.push(`Invalid newField: ${service.newField}`);
  }
}
```

### Related Files
- `src/data/services.ts` - Service data definitions
- `package.json` - NPM script definitions
- `.github/workflows/` - CI/CD integration (when added)

---

## Blur Placeholder Generator

**Location:** `scripts/generate-blur-placeholders.js`

Generates Low Quality Image Placeholders (LQIP) for zero CLS (Cumulative Layout Shift) SEO optimization.

### Usage

```bash
# Add script to package.json first:
# "generate:placeholders": "node scripts/generate-blur-placeholders.js"

# Run generation
npm run generate:placeholders

# Or directly with node
node scripts/generate-blur-placeholders.js
```

### What It Does

1. **Scans** all images in `public/images/projects/` recursively
2. **Generates** 10px width base64 LQIP (maintains aspect ratio)
3. **Outputs** to `src/data/blurPlaceholders.json` with project-based structure

### Output Structure

```json
{
  "projects": {
    "project-slug": {
      "hero": "data:image/jpeg;base64,...",
      "featured": "data:image/jpeg;base64,...",
      "gallery-01": "data:image/jpeg;base64,..."
    }
  }
}
```

### Technical Details

- **Library**: Sharp (already in dependencies)
- **Size**: 10px width, auto height
- **Format**: JPEG at 50% quality with mozjpeg compression
- **Output**: Base64 data URI for inline embedding
- **Purpose**: Eliminate layout shift during image loading

### Output Example

```
🖼️  TRD Blur Placeholder Generator

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📂 Scanning: .../public/images/projects

Found 127 images

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Generated placeholder for: caringbah-pavilion/hero
✓ Generated placeholder for: caringbah-pavilion/featured
✓ Generated placeholder for: caringbah-pavilion/gallery-01
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Success! Generated 127 placeholders

📄 Output: .../src/data/blurPlaceholders.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### SEO Benefits

- **Zero CLS**: Images reserve space immediately with blur placeholder
- **Faster Perceived Load**: Users see blurred preview instantly
- **Core Web Vitals**: Improved Cumulative Layout Shift score
- **Better UX**: No content jumping during page load

### Usage in Components

```tsx
import blurPlaceholders from '@/data/blurPlaceholders.json';

// Access placeholder
const placeholder = blurPlaceholders.projects['project-slug']['hero'];

// Use with Image component
<Image
  src="/images/projects/project-slug/hero.jpg"
  placeholder="blur"
  blurDataURL={placeholder}
  alt="Hero image"
/>
```

### When to Regenerate

Run the script when:
- New projects are added
- Images are updated or optimized
- Image filenames change
- Image formats change

### Related Files
- `src/data/blurPlaceholders.json` - Generated output
- `public/images/projects/` - Source images
