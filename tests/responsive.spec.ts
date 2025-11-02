import { test, expect } from '@playwright/test';

/**
 * Responsive Testing Suite for TRD Website
 * Tests major breakpoints and common device sizes
 */

const viewports = {
  // Mobile devices
  'iPhone SE': { width: 375, height: 667 },
  'iPhone 12/13/14': { width: 390, height: 844 },
  'iPhone 14 Pro Max': { width: 430, height: 932 },
  'Samsung Galaxy S21': { width: 360, height: 800 },
  'Samsung Galaxy S21 Ultra': { width: 412, height: 915 },

  // Tablets
  'iPad Mini': { width: 768, height: 1024 },
  'iPad Air': { width: 820, height: 1180 },
  'iPad Pro 11"': { width: 834, height: 1194 },
  'iPad Pro 12.9"': { width: 1024, height: 1366 },
  'Samsung Galaxy Tab': { width: 800, height: 1280 },

  // Desktop
  'Laptop 1366': { width: 1366, height: 768 },
  'Laptop 1440': { width: 1440, height: 900 },
  'Desktop 1920': { width: 1920, height: 1080 },
  'Desktop 2K': { width: 2560, height: 1440 },
  'Desktop 4K': { width: 3840, height: 2160 },
};

const sections = [
  { name: 'Hero', selector: '.hero' },
  { name: 'Why Choose TRD', selector: '.why-choose-trd' },
  { name: 'Why Copy', selector: '.why-copy' },
  { name: 'Services Gallery', selector: '.services-gallery' },
  { name: 'Case Studies Header', selector: '.cs-header' },
  { name: 'Case Studies Work', selector: '.cs-work-items' },
  { name: 'Team Hero', selector: '.team-hero' },
  { name: 'Team Reveal', selector: '.team-reveal' },
];

test.describe('TRD Website Responsive Design Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:3000');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Wait for opening animation to complete (if present)
    await page.waitForTimeout(3000);
  });

  for (const [deviceName, viewport] of Object.entries(viewports)) {
    test(`${deviceName} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      // Set viewport size
      await page.setViewportSize(viewport);

      // Wait for any animations to settle
      await page.waitForTimeout(1000);

      // Take full page screenshot
      await page.screenshot({
        path: `tests/screenshots/${deviceName.replace(/[^a-zA-Z0-9]/g, '_')}.png`,
        fullPage: true
      });

      // Check for horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = viewport.width;

      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // Allow 5px tolerance for scrollbars

      // Check that all major sections are visible
      for (const section of sections) {
        const element = await page.$(section.selector);
        if (element) {
          const isVisible = await element.isVisible();
          expect(isVisible).toBeTruthy();

          // Check section doesn't overflow horizontally
          const box = await element.boundingBox();
          if (box) {
            expect(box.width).toBeLessThanOrEqual(viewportWidth + 5);
          }
        }
      }

      // Check for common responsive issues
      const issues = await page.evaluate(() => {
        const problems = [];

        // Check for elements wider than viewport
        const allElements = document.querySelectorAll('*');
        allElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width > window.innerWidth) {
            const tagName = el.tagName.toLowerCase();
            const className = el.className;
            problems.push(`Element ${tagName}.${className} is wider than viewport: ${rect.width}px`);
          }
        });

        return problems;
      });

      // Log any issues found
      if (issues.length > 0) {
        console.log(`\n⚠️  Issues found on ${deviceName}:`);
        issues.forEach(issue => console.log(`  - ${issue}`));
      }

      // Expect no critical overflow issues
      expect(issues.length).toBe(0);
    });
  }

  test('Common breakpoint transitions', async ({ page }) => {
    const breakpoints = [
      { name: 'Mobile', width: 375 },
      { name: 'Tablet Portrait', width: 768 },
      { name: 'Tablet Landscape', width: 1024 },
      { name: 'Desktop', width: 1440 },
      { name: 'Large Desktop', width: 1920 },
    ];

    for (const bp of breakpoints) {
      await page.setViewportSize({ width: bp.width, height: 900 });
      await page.waitForTimeout(500);

      // Check page renders without errors
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(bp.width + 5);

      console.log(`✓ ${bp.name} (${bp.width}px): No overflow detected`);
    }
  });

  test('Touch targets on mobile devices', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check all clickable elements have adequate touch target size (minimum 44x44)
    const smallTargets = await page.evaluate(() => {
      const minSize = 44;
      const clickable = document.querySelectorAll('a, button, input, [role="button"]');
      const small = [];

      clickable.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width < minSize || rect.height < minSize) {
          small.push({
            tag: el.tagName,
            width: rect.width,
            height: rect.height,
            text: el.textContent?.substring(0, 30)
          });
        }
      });

      return small;
    });

    if (smallTargets.length > 0) {
      console.log('\n⚠️  Small touch targets found (recommended minimum 44x44px):');
      smallTargets.forEach(t => {
        console.log(`  - ${t.tag}: ${t.width}x${t.height}px - "${t.text}"`);
      });
    }
  });

  test('Font sizes are readable on all devices', async ({ page }) => {
    const viewportSizes = [
      { name: 'Mobile', width: 375 },
      { name: 'Tablet', width: 768 },
      { name: 'Desktop', width: 1440 },
    ];

    for (const vp of viewportSizes) {
      await page.setViewportSize({ width: vp.width, height: 900 });

      // Check minimum font sizes
      const smallFonts = await page.evaluate(() => {
        const minSize = 14; // Minimum readable size
        const allText = document.querySelectorAll('p, span, a, button, h1, h2, h3, h4, h5, h6');
        const small = [];

        allText.forEach((el) => {
          const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
          if (fontSize < minSize && fontSize > 0) {
            small.push({
              tag: el.tagName,
              fontSize: fontSize,
              text: el.textContent?.substring(0, 30)
            });
          }
        });

        return small.slice(0, 5); // Return first 5 only
      });

      if (smallFonts.length > 0) {
        console.log(`\n⚠️  Small fonts on ${vp.name}:`);
        smallFonts.forEach(f => {
          console.log(`  - ${f.tag}: ${f.fontSize}px - "${f.text}"`);
        });
      }
    }
  });
});
