# TeamScrollReveal Component - Testing Guide

## Overview
This guide provides comprehensive testing procedures for the TeamScrollReveal component Phase 2 implementation.

## Quick Start

### Development Server
```bash
cd C:\Users\johnn\Documents\Private-work\The Elites\Partnerships\TRD\TRD-website\trd-site
npm run dev
```

**URL**: http://localhost:3000

## Testing Checklist

### 1. Entrance Animation Testing

#### Visual Verification
- [ ] **Member 1**: Slides up first (0-15% scroll progress)
- [ ] **Member 2**: Slides up second (15-30% scroll progress)
- [ ] **Member 3**: Slides up last (30-45% scroll progress)
- [ ] **Initial Letters**: Scale from 0 to 1 (delayed 0.4)
- [ ] **Smooth Transitions**: No jank or stuttering

#### Timing Verification
1. Scroll slowly through entrance animation
2. Verify members appear one at a time (staggered)
3. Verify initial letters scale after member starts moving
4. Check that all members are visible by the time section reaches top

**Expected Behavior**:
```
Scroll Position          | State
-------------------------|----------------------------------
Section enters viewport  | All members at 125% (hidden)
15% through             | Member 1 visible, 2 & 3 sliding
30% through             | Members 1 & 2 visible, 3 sliding
45% through             | All members visible
Section reaches top     | All members centered, letters at scale(1)
```

### 2. Card Slide-In Animation Testing

#### Visual Verification
- [ ] **Section Pinning**: Section stays fixed for 3x viewport height
- [ ] **Card 1**: Slides from 300% right to center
- [ ] **Card 2**: Slides from 200% right to center
- [ ] **Card 3**: Slides from 100% right to center
- [ ] **Rotation**: Cards rotate from 20deg to 0deg
- [ ] **Scale**: Cards scale from 0.75 to 1
- [ ] **Smooth Motion**: No jumps or stuttering

#### Timing Verification
1. Scroll slowly through pinned section
2. Verify cards slide in one at a time (staggered)
3. Verify rotation decreases as cards move
4. Verify scale increases throughout scroll

**Expected Behavior**:
```
Scroll Progress | State
----------------|------------------------------------------
0-40%          | Cards positioned off-screen right
40-47%         | Card 1 sliding in with rotation
47-54%         | Card 2 sliding in with rotation
54-61%         | Card 3 sliding in with rotation
40-52%         | Card 1 scaling up
52-64%         | Card 2 scaling up
64-76%         | Card 3 scaling up
100%           | All cards centered, no rotation, full scale
```

### 3. Scroll Speed Testing

#### Different Scroll Speeds
- [ ] **Slow Scroll**: Animations smooth, no skipping
- [ ] **Fast Scroll**: Animations remain smooth, no lag
- [ ] **Reverse Scroll**: Animations reverse correctly
- [ ] **Scroll Wheel**: Smooth with mouse wheel
- [ ] **Trackpad**: Smooth with trackpad gestures
- [ ] **Keyboard**: Smooth with arrow keys/space

#### Testing Procedure
1. Scroll down very slowly through entire animation
2. Scroll down quickly from top to bottom
3. Scroll back up (reverse animation)
4. Use different input methods (mouse, trackpad, keyboard)
5. Verify animations remain synchronized with scroll position

### 4. Responsive Testing

#### Desktop Testing (>1000px)
- [ ] **1920x1080**: Full animations working
- [ ] **1366x768**: Full animations working
- [ ] **2560x1440**: Full animations working
- [ ] **Ultrawide**: Full animations working

#### Mobile Testing (<1000px)
- [ ] **Animations Disabled**: No scroll animations
- [ ] **Final State Shown**: All content immediately visible
- [ ] **Members Visible**: All at translateY(0%)
- [ ] **Letters Visible**: All at scale(1)
- [ ] **Cards Centered**: All at translate(-50%, -50%)
- [ ] **No Performance Issues**: Smooth scrolling

#### Tablet Testing (around 1000px)
- [ ] **Breakpoint Behavior**: Test at exactly 999px and 1001px
- [ ] **Transition**: Verify smooth transition at breakpoint

### 5. Resize Testing

#### Test Procedure
1. Start on desktop size (>1000px)
2. Verify animations working
3. Resize to mobile (<1000px)
4. Verify animations disabled, content visible
5. Resize back to desktop
6. Verify animations re-initialize correctly
7. Repeat multiple times

#### Expected Behavior
- [ ] **Desktop → Mobile**: Animations kill, transforms clear
- [ ] **Mobile → Desktop**: Animations reinitialize
- [ ] **No Memory Leaks**: ScrollTriggers properly killed
- [ ] **Debounce Working**: 250ms delay before reinitialization
- [ ] **No Errors**: Console clean during resize

### 6. Browser Compatibility Testing

#### Chrome
- [ ] Entrance animation smooth
- [ ] Card animation smooth
- [ ] Pin behavior correct
- [ ] Mobile behavior correct
- [ ] DevTools console clean

#### Firefox
- [ ] Entrance animation smooth
- [ ] Card animation smooth
- [ ] Pin behavior correct
- [ ] Mobile behavior correct
- [ ] Console clean

#### Safari
- [ ] Entrance animation smooth
- [ ] Card animation smooth
- [ ] Pin behavior correct
- [ ] Mobile behavior correct
- [ ] Console clean

#### Edge
- [ ] Entrance animation smooth
- [ ] Card animation smooth
- [ ] Pin behavior correct
- [ ] Mobile behavior correct
- [ ] Console clean

### 7. Performance Testing

#### Frame Rate Monitoring
1. Open DevTools (F12)
2. Go to Performance tab
3. Start recording
4. Scroll through animations
5. Stop recording
6. Check frame rate

**Target**: 60fps consistently

#### Performance Checks
- [ ] **No Layout Shift**: CLS = 0
- [ ] **No Repaints**: Minimal red boxes in DevTools
- [ ] **GPU Acceleration**: Transforms use GPU
- [ ] **Memory Stable**: No memory leaks
- [ ] **CPU Usage**: Reasonable during scroll

#### Lighthouse Audit
```bash
npm run build
npm run start
# Open Chrome DevTools > Lighthouse > Run
```

**Target Scores**:
- Performance: >90
- Accessibility: >90
- Best Practices: >90

### 8. Accessibility Testing

#### Reduced Motion
1. Enable reduced motion in OS settings
2. Reload page
3. Verify animations disabled
4. Verify content still accessible

**Expected Behavior**:
- [ ] All transforms reset
- [ ] will-change disabled
- [ ] Content immediately visible
- [ ] No animations

#### Keyboard Navigation
- [ ] Can scroll with arrow keys
- [ ] Can scroll with Page Up/Down
- [ ] Can scroll with Space
- [ ] Animations work with keyboard scroll

#### Screen Reader Testing
- [ ] Content structure makes sense
- [ ] Images have alt text
- [ ] Headings properly structured
- [ ] No animation-only content

### 9. Edge Case Testing

#### Different Team Member Counts
Test with different numbers of team members:
- [ ] 1 member: Animation works
- [ ] 2 members: Animation works
- [ ] 3 members: Animation works (default)
- [ ] 4+ members: Animation works

#### Browser Zoom
Test at different zoom levels:
- [ ] 50%: Animations work
- [ ] 75%: Animations work
- [ ] 100%: Animations work (default)
- [ ] 125%: Animations work
- [ ] 150%: Animations work
- [ ] 200%: Animations work

#### Slow Connections
1. Open DevTools
2. Network tab > Slow 3G
3. Reload page
4. Verify animations still work
5. Check for loading states

### 10. Console Error Testing

#### Check Console
- [ ] **No Errors**: Zero errors in console
- [ ] **No Warnings**: Zero GSAP warnings
- [ ] **Clean Logs**: Only expected logs (if any)

#### Common Issues to Check
- [ ] ScrollTrigger initialized properly
- [ ] Lenis integrated with GSAP ticker
- [ ] No "Invalid property" errors
- [ ] No "target not found" errors
- [ ] No memory leak warnings

## Automated Testing Commands

### Build Test
```bash
npm run build
```
**Expected**: No errors, successful build

### Type Check
```bash
npm run type-check  # if available
# or
npx tsc --noEmit
```
**Expected**: No TypeScript errors

### Lint Test
```bash
npm run lint
```
**Expected**: No linting errors

## Known Issues & Solutions

### Issue: Animations not triggering
**Solution**: Check that GSAP and ScrollTrigger are properly imported and registered

### Issue: Jittery animations
**Solution**: Ensure `will-change` is set on animated elements, check for conflicting CSS

### Issue: Pin not working
**Solution**: Verify `pin: true` in ScrollTrigger config, check for CSS issues

### Issue: Mobile animations not disabling
**Solution**: Check breakpoint logic, verify `clearProps: 'all'` is working

### Issue: Resize causing errors
**Solution**: Ensure ScrollTriggers are killed before re-initialization

## Success Criteria

### Phase 2 Complete When:
- [x] All entrance animations working smoothly
- [x] All card slide-in animations working smoothly
- [x] Section pinning working correctly
- [x] Responsive behavior working (mobile/desktop)
- [x] Resize handling working
- [x] No console errors
- [x] Build successful
- [ ] Performance targets met (60fps)
- [ ] Cross-browser compatibility confirmed
- [ ] Accessibility requirements met

## Testing Report Template

```markdown
# TeamScrollReveal Testing Report

**Tester**: [Name]
**Date**: [Date]
**Environment**: [Browser/OS/Device]

## Test Results

### Entrance Animation: [PASS/FAIL]
- Issues: [List any issues]

### Card Animation: [PASS/FAIL]
- Issues: [List any issues]

### Responsive Behavior: [PASS/FAIL]
- Issues: [List any issues]

### Performance: [PASS/FAIL]
- FPS: [Average FPS]
- Issues: [List any issues]

### Accessibility: [PASS/FAIL]
- Issues: [List any issues]

## Overall Status: [PASS/FAIL]
## Recommendations: [List any recommendations]
```

## Contact & Support

**Component Location**: `C:\Users\johnn\Documents\Private-work\The Elites\Partnerships\TRD\TRD-website\trd-site\src\components\sections\TeamScrollReveal.tsx`

**Documentation**:
- Implementation Plan: `docs/TeamScrollReveal-Implementation-Plan.md`
- Phase 2 Summary: `docs/TeamScrollReveal-Phase2-Summary.md`

**Reference Source**: `C:\Users\johnn\Documents\Private-work\The Elites\Dev tools\Assets\Projects\TEAM PAGE LIKE A SCROLL-CONTROLLED REVEAL\codegrid-workingstiff-animated-teams-section-nextjs\src\app\page.js`
