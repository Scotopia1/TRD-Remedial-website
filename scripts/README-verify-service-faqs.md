# Service FAQ Verification Script

## Overview
The `verify-service-faqs.js` script validates the quality of FAQ content across all TRD services to ensure consistency, completeness, and SEO optimization.

## Usage

### Via npm script (recommended)
```bash
npm run verify:service-faqs
```

### Direct execution
```bash
node scripts/verify-service-faqs.js
```

## Validation Checks

The script performs the following quality checks for each service:

### 1. FAQ Count
- **Requirement**: 4-6 FAQs per service
- **Error**: Less than 4 FAQs
- **Warning**: More than 6 FAQs

### 2. Question Format
- **Requirement**: All questions must end with "?"
- **Error**: Missing question mark

### 3. Answer Length
- **Recommended**: 100-400 characters
- **Warning**: Less than 100 characters (too short)
- **Warning**: More than 400 characters (too long)

### 4. Service Keywords
- **Requirement**: Answer should contain service-related keywords
- **Keywords**: Extracted from service title (words > 3 chars)
- **Warning**: Missing service keywords in answer

## Exit Codes

- **0**: All checks passed (may include warnings)
- **1**: Validation failed (errors found)

## Sample Output

```
======================================================================
SERVICE FAQ VALIDATION REPORT
======================================================================

Service: Crack Injection (crack-injection)
----------------------------------------------------------------------
  ✓ FAQ count: 6 (within 4-6 range)
  ✓ FAQ #1 question format valid
  ✓ FAQ #1 answer length: 297 chars (optimal)
  ✓ FAQ #1 contains service keywords
  ...

  Summary: All checks passed ✓

======================================================================
OVERALL SUMMARY
======================================================================
Total Services: 9
Total Errors: 0
Total Warnings: 7

⚠️  VALIDATION PASSED WITH WARNINGS: Consider addressing warnings
```

## Integration

### Pre-commit Hook
Consider adding to Git pre-commit hooks to ensure FAQ quality before commits:

```bash
npm run verify:service-faqs
```

### CI/CD Pipeline
Add to your continuous integration pipeline:

```yaml
- name: Verify Service FAQs
  run: npm run verify:service-faqs
```

## Current Status (as of last run)

- **Total Services**: 9
- **Total Errors**: 0
- **Total Warnings**: 7
- **Status**: ✅ PASSED WITH WARNINGS

### Common Warnings
1. Missing service keywords in some FAQ answers
2. Some answers slightly under recommended 100-character minimum

## Maintenance

When adding or editing FAQs in `src/data/services.ts`, ensure:

1. Each service has 4-6 FAQs
2. Questions end with "?"
3. Answers are 100-400 characters for optimal readability
4. Answers naturally include service-related keywords for SEO

## Technical Details

### Data Source
- **File**: `src/data/services.ts`
- **Type**: TypeScript Service array
- **Parsing**: Regex-based extraction (fallback if ts-node unavailable)

### Dependencies
- Node.js (built-in modules only)
- No external npm dependencies required
