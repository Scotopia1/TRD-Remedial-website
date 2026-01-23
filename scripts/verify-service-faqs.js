#!/usr/bin/env node

/**
 * Verify Service FAQs Script
 *
 * Validates FAQ content quality for all services:
 * - FAQ count (4-6 required)
 * - Questions end with "?"
 * - Answer length (100-400 chars recommended)
 * - Service keyword present in answer
 *
 * Exit code 1 if errors found, 0 if all pass
 */

const path = require('path');
const fs = require('fs');

// Load services data - using dynamic import with .mjs extension workaround
async function loadServices() {
  try {
    // Try to use ts-node if available
    try {
      require('ts-node/register');
      const servicesModule = require('../src/data/services.ts');
      return servicesModule.SERVICES;
    } catch (tsError) {
      // Fallback: parse the TypeScript file manually
      const servicesPath = path.resolve(__dirname, '../src/data/services.ts');
      const servicesContent = fs.readFileSync(servicesPath, 'utf8');

      // Extract service objects with basic regex parsing
      const services = [];
      const serviceMatches = servicesContent.matchAll(/{\s*id:\s*['"]([^'"]+)['"]/g);

      for (const match of serviceMatches) {
        const serviceId = match[1];

        // Extract service block
        const serviceBlockRegex = new RegExp(
          `{\\s*id:\\s*['"]${serviceId}['"][\\s\\S]*?faqs:\\s*\\[(\\s*{[\\s\\S]*?}\\s*,?\\s*)+\\]`,
          'g'
        );
        const serviceBlockMatch = servicesContent.match(serviceBlockRegex);

        if (serviceBlockMatch) {
          const serviceBlock = serviceBlockMatch[0];

          // Extract title
          const titleMatch = serviceBlock.match(/title:\s*['"]([^'"]+)['"]/);
          const title = titleMatch ? titleMatch[1] : serviceId;

          // Extract slug
          const slugMatch = serviceBlock.match(/slug:\s*['"]([^'"]+)['"]/);
          const slug = slugMatch ? slugMatch[1] : serviceId;

          // Extract FAQs
          const faqsMatch = serviceBlock.match(/faqs:\s*\[([\s\S]*?)\]/);
          const faqs = [];

          if (faqsMatch) {
            const faqsContent = faqsMatch[1];
            const faqMatches = faqsContent.matchAll(/{[\s\S]*?question:\s*['"]([^'"]+)['"][\s\S]*?answer:\s*['"]([^'"]+)['"][\s\S]*?}/g);

            for (const faqMatch of faqMatches) {
              faqs.push({
                question: faqMatch[1],
                answer: faqMatch[2]
              });
            }
          }

          services.push({ id: serviceId, title, slug, faqs });
        }
      }

      return services;
    }
  } catch (error) {
    console.error('ERROR: Failed to load services:', error.message);
    process.exit(1);
  }
}

// Validation configuration
const FAQ_MIN_COUNT = 4;
const FAQ_MAX_COUNT = 6;
const ANSWER_MIN_LENGTH = 100;
const ANSWER_MAX_LENGTH = 400;

async function main() {
  const SERVICES = await loadServices();

  let totalErrors = 0;
  let totalWarnings = 0;

  console.log('='.repeat(70));
  console.log('SERVICE FAQ VALIDATION REPORT');
  console.log('='.repeat(70));
  console.log();

  SERVICES.forEach((service) => {
    const serviceName = service.title;
    const faqs = service.faqs || [];
    let serviceErrors = 0;
    let serviceWarnings = 0;

    console.log(`Service: ${serviceName} (${service.slug})`);
    console.log('-'.repeat(70));

    // Check 1: FAQ count (4-6 required)
    if (faqs.length < FAQ_MIN_COUNT) {
      console.log(`  ✗ ERROR: Only ${faqs.length} FAQs (minimum ${FAQ_MIN_COUNT} required)`);
      serviceErrors++;
    } else if (faqs.length > FAQ_MAX_COUNT) {
      console.log(`  ⚠ WARNING: ${faqs.length} FAQs (maximum ${FAQ_MAX_COUNT} recommended)`);
      serviceWarnings++;
    } else {
      console.log(`  ✓ FAQ count: ${faqs.length} (within ${FAQ_MIN_COUNT}-${FAQ_MAX_COUNT} range)`);
    }

    // Extract service keywords (title words)
    const serviceKeywords = service.title
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3); // Only words longer than 3 chars

    // Check each FAQ
    faqs.forEach((faq, index) => {
      const faqNum = index + 1;

      // Check 2: Question ends with "?"
      if (!faq.question.trim().endsWith('?')) {
        console.log(`  ✗ ERROR: FAQ #${faqNum} question doesn't end with "?"`);
        console.log(`    Question: "${faq.question}"`);
        serviceErrors++;
      } else {
        console.log(`  ✓ FAQ #${faqNum} question format valid`);
      }

      // Check 3: Answer length (100-400 chars recommended)
      const answerLength = faq.answer.length;
      if (answerLength < ANSWER_MIN_LENGTH) {
        console.log(`  ⚠ WARNING: FAQ #${faqNum} answer too short (${answerLength} chars, recommend ${ANSWER_MIN_LENGTH}+)`);
        serviceWarnings++;
      } else if (answerLength > ANSWER_MAX_LENGTH) {
        console.log(`  ⚠ WARNING: FAQ #${faqNum} answer too long (${answerLength} chars, recommend ${ANSWER_MAX_LENGTH} max)`);
        serviceWarnings++;
      } else {
        console.log(`  ✓ FAQ #${faqNum} answer length: ${answerLength} chars (optimal)`);
      }

      // Check 4: Service keyword present in answer
      const answerLower = faq.answer.toLowerCase();
      const hasKeyword = serviceKeywords.some(keyword => answerLower.includes(keyword));

      if (!hasKeyword) {
        console.log(`  ⚠ WARNING: FAQ #${faqNum} answer missing service keywords: ${serviceKeywords.join(', ')}`);
        console.log(`    Answer: "${faq.answer.substring(0, 100)}..."`);
        serviceWarnings++;
      } else {
        console.log(`  ✓ FAQ #${faqNum} contains service keywords`);
      }
    });

    // Service summary
    console.log();
    if (serviceErrors > 0 || serviceWarnings > 0) {
      console.log(`  Summary: ${serviceErrors} error(s), ${serviceWarnings} warning(s)`);
    } else {
      console.log(`  Summary: All checks passed ✓`);
    }
    console.log();

    totalErrors += serviceErrors;
    totalWarnings += serviceWarnings;
  });

  // Overall summary
  console.log('='.repeat(70));
  console.log('OVERALL SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total Services: ${SERVICES.length}`);
  console.log(`Total Errors: ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);
  console.log();

  if (totalErrors > 0) {
    console.log('❌ VALIDATION FAILED: Please fix errors before proceeding');
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log('⚠️  VALIDATION PASSED WITH WARNINGS: Consider addressing warnings for optimal quality');
    process.exit(0);
  } else {
    console.log('✅ VALIDATION PASSED: All FAQ content meets quality standards');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
