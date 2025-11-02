/**
 * Animation Text Overflow Checker
 * Uses Puppeteer to detect text overflow issues during animations
 * Focuses on responsive text handling in animated sections
 */

const puppeteer = require('puppeteer');

const viewports = [
  { name: 'Mobile Small', width: 360, height: 800 },
  { name: 'Mobile Medium', width: 375, height: 667 },
  { name: 'Mobile Large', width: 414, height: 896 },
  { name: 'Tablet Portrait', width: 768, height: 1024 },
  { name: 'Tablet Landscape', width: 1024, height: 768 },
  { name: 'Desktop Small', width: 1280, height: 720 },
  { name: 'Desktop Medium', width: 1440, height: 900 },
  { name: 'Desktop Large', width: 1920, height: 1080 },
];

async function checkTextOverflow(page, viewport) {
  console.log(`\n🔍 Checking ${viewport.name} (${viewport.width}x${viewport.height})`);

  await page.setViewport({
    width: viewport.width,
    height: viewport.height
  });

  // Wait for page load
  await page.waitForSelector('body', { timeout: 10000 });
  await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for opening animation

  // Check Why Copy section specifically (word-by-word animation)
  const whyCopyOverflow = await page.evaluate(() => {
    const issues = [];

    // Check Why Copy section
    const whyCopySection = document.querySelector('.why-copy');
    if (whyCopySection) {
      const animeText = whyCopySection.querySelector('.anime-text');
      if (animeText) {
        const words = animeText.querySelectorAll('.word');
        const containerRect = animeText.getBoundingClientRect();

        words.forEach((word, index) => {
          const wordRect = word.getBoundingClientRect();

          // Check if word overflows container horizontally
          if (wordRect.right > containerRect.right) {
            issues.push({
              section: 'Why Copy',
              word: word.textContent,
              wordIndex: index,
              overflow: `${(wordRect.right - containerRect.right).toFixed(2)}px to the right`,
              wordWidth: wordRect.width,
              containerWidth: containerRect.width
            });
          }

          // Check if word overflows viewport
          if (wordRect.right > window.innerWidth) {
            issues.push({
              section: 'Why Copy',
              word: word.textContent,
              wordIndex: index,
              overflow: `${(wordRect.right - window.innerWidth).toFixed(2)}px beyond viewport`,
              wordWidth: wordRect.width,
              viewportWidth: window.innerWidth
            });
          }
        });
      }
    }

    return issues;
  });

  // Check all text elements for overflow
  const generalOverflow = await page.evaluate(() => {
    const issues = [];

    // Check all sections
    const sections = [
      '.why-choose-trd',
      '.services-gallery',
      '.cs-header',
      '.team-hero',
      '.team-member-name'
    ];

    sections.forEach(selector => {
      const section = document.querySelector(selector);
      if (section) {
        const textElements = section.querySelectorAll('h1, h2, h3, p, span');

        textElements.forEach(el => {
          const rect = el.getBoundingClientRect();

          // Check horizontal overflow
          if (rect.right > window.innerWidth) {
            issues.push({
              section: selector,
              element: el.tagName,
              text: el.textContent.substring(0, 50) + '...',
              overflow: `${(rect.right - window.innerWidth).toFixed(2)}px beyond viewport`,
              width: rect.width,
              viewportWidth: window.innerWidth
            });
          }

          // Check if text is cut off (ellipsis or overflow hidden)
          const style = window.getComputedStyle(el);
          if (style.overflow === 'hidden' || style.textOverflow === 'ellipsis') {
            if (el.scrollWidth > el.clientWidth) {
              issues.push({
                section: selector,
                element: el.tagName,
                text: el.textContent.substring(0, 50) + '...',
                overflow: `Text truncated - ${el.scrollWidth - el.clientWidth}px hidden`,
                scrollWidth: el.scrollWidth,
                clientWidth: el.clientWidth
              });
            }
          }
        });
      }
    });

    return issues;
  });

  // Check font sizes at viewport
  const fontSizeIssues = await page.evaluate(() => {
    const issues = [];
    const minReadableSize = 14; // pixels

    const textElements = document.querySelectorAll('h1, h2, h3, p');
    textElements.forEach(el => {
      const style = window.getComputedStyle(el);
      const fontSize = parseFloat(style.fontSize);

      if (fontSize < minReadableSize && fontSize > 0) {
        const rect = el.getBoundingClientRect();
        // Only report if element is visible
        if (rect.width > 0 && rect.height > 0) {
          issues.push({
            element: el.tagName,
            text: el.textContent.substring(0, 30) + '...',
            fontSize: fontSize,
            minRequired: minReadableSize
          });
        }
      }
    });

    return issues.slice(0, 5); // Return first 5 only
  });

  // Report findings
  let hasIssues = false;

  if (whyCopyOverflow.length > 0) {
    console.log(`  ⚠️  Why Copy Animation Overflow (${whyCopyOverflow.length} issues):`);
    whyCopyOverflow.slice(0, 5).forEach(issue => {
      console.log(`     - Word "${issue.word}" overflows by ${issue.overflow}`);
    });
    hasIssues = true;
  }

  if (generalOverflow.length > 0) {
    console.log(`  ⚠️  General Text Overflow (${generalOverflow.length} issues):`);
    generalOverflow.slice(0, 5).forEach(issue => {
      console.log(`     - ${issue.section} ${issue.element}: ${issue.overflow}`);
    });
    hasIssues = true;
  }

  if (fontSizeIssues.length > 0) {
    console.log(`  ⚠️  Small Font Sizes (${fontSizeIssues.length} issues):`);
    fontSizeIssues.forEach(issue => {
      console.log(`     - ${issue.element}: ${issue.fontSize}px (min: ${issue.minRequired}px)`);
    });
    hasIssues = true;
  }

  if (!hasIssues) {
    console.log(`  ✅ No text overflow issues detected`);
  }

  return {
    viewport: viewport.name,
    whyCopyOverflow,
    generalOverflow,
    fontSizeIssues,
    hasIssues
  };
}

async function run() {
  console.log('🚀 Starting Animation Text Overflow Check\n');
  console.log('================================================');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Navigate to the site
  console.log('📍 Navigating to http://localhost:3000');
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  const allResults = [];

  // Test each viewport
  for (const viewport of viewports) {
    const result = await checkTextOverflow(page, viewport);
    allResults.push(result);
  }

  await browser.close();

  // Summary
  console.log('\n\n================================================');
  console.log('📊 SUMMARY');
  console.log('================================================\n');

  const viewportsWithIssues = allResults.filter(r => r.hasIssues);

  if (viewportsWithIssues.length === 0) {
    console.log('✅ All viewports passed - No text overflow issues!');
  } else {
    console.log(`⚠️  Issues found on ${viewportsWithIssues.length}/${viewports.length} viewports:\n`);

    viewportsWithIssues.forEach(result => {
      console.log(`${result.viewport}:`);
      if (result.whyCopyOverflow.length > 0) {
        console.log(`  - Why Copy: ${result.whyCopyOverflow.length} words overflowing`);
      }
      if (result.generalOverflow.length > 0) {
        console.log(`  - General: ${result.generalOverflow.length} elements overflowing`);
      }
      if (result.fontSizeIssues.length > 0) {
        console.log(`  - Fonts: ${result.fontSizeIssues.length} too small`);
      }
    });

    console.log('\n💡 Recommendations:');
    console.log('  1. Review "Why Copy" section text width on mobile');
    console.log('  2. Consider adding text-wrap or reducing font size on small screens');
    console.log('  3. Test with actual device to verify readability');
  }

  console.log('\n================================================');
}

// Run the check
run().catch(error => {
  console.error('❌ Error running overflow check:', error);
  process.exit(1);
});
