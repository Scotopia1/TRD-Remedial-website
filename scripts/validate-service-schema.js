#!/usr/bin/env node

/**
 * Service Schema Validator
 *
 * Validates schema.org data integrity for TRD services.
 * Checks required fields, formats, and data quality.
 */

import { SERVICES } from '../src/data/services.ts';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Validation rules
const REQUIRED_FIELDS = [
  'title',
  'slug',
  'description',
  'heroImage',
  'tagline',
];

const SLUG_PATTERN = /^[a-z0-9-]+$/;
const MIN_DESCRIPTION_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 160;
const PLACEHOLDER_PROJECT_PATTERN = /^project-\d{3}$/;

// Validation results storage
const validationResults = [];
let totalErrors = 0;
let totalWarnings = 0;

/**
 * Validate a single service
 */
function validateService(service) {
  const errors = [];
  const warnings = [];
  const serviceName = service.title || service.slug || 'Unknown Service';

  // 1. Required fields validation
  REQUIRED_FIELDS.forEach(field => {
    if (!service[field]) {
      errors.push(`Missing required field: ${field}`);
    } else if (typeof service[field] === 'string' && service[field].trim() === '') {
      errors.push(`Empty required field: ${field}`);
    }
  });

  // 2. Slug format validation
  if (service.slug) {
    if (!SLUG_PATTERN.test(service.slug)) {
      errors.push(`Invalid slug format: "${service.slug}" - must be lowercase with hyphens only (^[a-z0-9-]+$)`);
    }
  }

  // 3. Description length validation (SEO optimization)
  if (service.description) {
    const descLength = service.description.length;
    if (descLength < MIN_DESCRIPTION_LENGTH) {
      warnings.push(`Description too short (${descLength} chars) - recommended ${MIN_DESCRIPTION_LENGTH}-${MAX_DESCRIPTION_LENGTH} for SEO`);
    } else if (descLength > MAX_DESCRIPTION_LENGTH) {
      warnings.push(`Description too long (${descLength} chars) - recommended ${MIN_DESCRIPTION_LENGTH}-${MAX_DESCRIPTION_LENGTH} for SEO`);
    }
  }

  // 4. URL validation (absolute paths or full URLs)
  const urlFields = ['heroImage', 'featureImage', 'processImage', 'icon', 'visual'];
  urlFields.forEach(field => {
    if (service[field]) {
      const value = service[field];
      const isAbsolutePath = value.startsWith('/');
      const isFullURL = value.startsWith('http://') || value.startsWith('https://');

      if (!isAbsolutePath && !isFullURL) {
        errors.push(`Invalid URL format for ${field}: "${value}" - must be absolute path (/) or full URL (http/https)`);
      }
    }
  });

  // 5. Related projects validation (no placeholder IDs)
  if (service.relatedProjects && Array.isArray(service.relatedProjects)) {
    service.relatedProjects.forEach((projectId, index) => {
      if (PLACEHOLDER_PROJECT_PATTERN.test(projectId)) {
        warnings.push(`Related project at index ${index} appears to be placeholder: "${projectId}"`);
      }
    });
  }

  // 6. Additional data quality checks
  if (service.stats && Array.isArray(service.stats)) {
    service.stats.forEach((stat, index) => {
      if (!stat.value || !stat.label) {
        warnings.push(`Incomplete stat at index ${index}: missing value or label`);
      }
    });
  }

  if (service.process && Array.isArray(service.process)) {
    service.process.forEach((step, index) => {
      if (!step.step || !step.title || !step.description) {
        warnings.push(`Incomplete process step at index ${index}: missing step, title, or description`);
      }
    });
  }

  if (service.faqs && Array.isArray(service.faqs)) {
    service.faqs.forEach((faq, index) => {
      if (!faq.question || !faq.answer) {
        warnings.push(`Incomplete FAQ at index ${index}: missing question or answer`);
      }
    });
  }

  if (service.testimonials && Array.isArray(service.testimonials)) {
    service.testimonials.forEach((testimonial, index) => {
      if (!testimonial.quote || !testimonial.author || !testimonial.role || !testimonial.company) {
        warnings.push(`Incomplete testimonial at index ${index}: missing quote, author, role, or company`);
      }
    });
  }

  return {
    serviceName,
    errors,
    warnings,
    passed: errors.length === 0,
  };
}

/**
 * Print validation result for a single service
 */
function printServiceResult(result) {
  const { serviceName, errors, warnings, passed } = result;

  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}Service: ${serviceName}${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);

  if (passed && warnings.length === 0) {
    console.log(`${colors.green}✓ All validation checks passed${colors.reset}`);
  } else {
    if (errors.length > 0) {
      console.log(`\n${colors.red}Errors (${errors.length}):${colors.reset}`);
      errors.forEach((error, index) => {
        console.log(`  ${colors.red}✗ ${index + 1}. ${error}${colors.reset}`);
      });
    }

    if (warnings.length > 0) {
      console.log(`\n${colors.yellow}Warnings (${warnings.length}):${colors.reset}`);
      warnings.forEach((warning, index) => {
        console.log(`  ${colors.yellow}⚠ ${index + 1}. ${warning}${colors.reset}`);
      });
    }
  }
}

/**
 * Print summary of all validation results
 */
function printSummary() {
  const totalServices = validationResults.length;
  const passedServices = validationResults.filter(r => r.passed).length;
  const failedServices = totalServices - passedServices;

  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}VALIDATION SUMMARY${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`Total Services: ${totalServices}`);
  console.log(`${colors.green}Passed: ${passedServices}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failedServices}${colors.reset}`);
  console.log(`${colors.red}Total Errors: ${totalErrors}${colors.reset}`);
  console.log(`${colors.yellow}Total Warnings: ${totalWarnings}${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  if (failedServices === 0) {
    console.log(`${colors.green}✓ All services passed validation!${colors.reset}\n`);
  } else {
    console.log(`${colors.red}✗ ${failedServices} service(s) failed validation${colors.reset}\n`);
  }
}

/**
 * Main validation execution
 */
function main() {
  console.log(`\n${colors.blue}╔═══════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║  TRD Service Schema Validator         ║${colors.reset}`);
  console.log(`${colors.blue}╚═══════════════════════════════════════╝${colors.reset}\n`);

  console.log(`Validating ${SERVICES.length} services...\n`);

  // Validate each service
  SERVICES.forEach(service => {
    const result = validateService(service);
    validationResults.push(result);
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
    printServiceResult(result);
  });

  // Print summary
  printSummary();

  // Exit with appropriate code
  const hasErrors = totalErrors > 0;
  process.exit(hasErrors ? 1 : 0);
}

// Execute validation
main();
