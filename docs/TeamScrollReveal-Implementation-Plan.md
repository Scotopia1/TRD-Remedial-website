# TeamScrollReveal Component - Implementation Plan

## Project Overview
Implementation of a scroll-triggered team reveal component with GSAP ScrollTrigger animations, inspired by the "Faces Behind the Frame" animation pattern.

## Implementation Phases

### Phase 1: Component Foundation [✓ COMPLETED]
**Objective**: Set up component structure, refs, and initial states

**Tasks**:
- [x] Create TeamScrollReveal.tsx component
- [x] Set up GSAP and ScrollTrigger imports
- [x] Configure useGSAP hook with scope
- [x] Set up Lenis smooth scroll integration
- [x] Create refs for animations (cardPlaceholderEntranceRef, cardSlideInAnimationRef)
- [x] Implement team member rendering with TEAM_MEMBERS data
- [x] Add helper functions (getInitial, splitName)
- [x] Structure sections (hero, team-reveal, outro)

**Deliverables**:
- Functional component with all structure in place
- Proper TypeScript typing
- Lenis integration with GSAP ticker

**Status**: COMPLETED ✓

---

### Phase 2: Animation Implementation [✓ COMPLETED]
**Objective**: Implement GSAP ScrollTrigger animations

**Tasks**:
- [x] Implement placeholder entrance animation (cardPlaceholderEntranceRef)
  - [x] Configure ScrollTrigger (start: "top bottom", end: "top top")
  - [x] Member slide-up animation (translateY 125% → 0%)
  - [x] Initial letter scale animation (scale 0 → 1)
  - [x] Stagger timing (0.15 delay per member)
  - [x] Letter scale delay (0.4)
- [x] Implement card slide-in animation (cardSlideInAnimationRef)
  - [x] Configure ScrollTrigger with pin (3vh duration)
  - [x] Phase A: Rotation & slide (40%-70% progress)
    - [x] Cards slide from right with rotation
    - [x] Stagger timing (0.075 per card)
  - [x] Phase B: Scale animation (40%-100% progress)
    - [x] Cards scale 0.75 → 1
    - [x] Stagger timing (0.12 per card)
- [x] Implement responsive handling
  - [x] Mobile breakpoint check (<1000px)
  - [x] Kill animations on mobile
  - [x] Clear transforms (clearProps: "all")
- [x] Add resize handler
  - [x] Debounced resize listener (250ms)
  - [x] ScrollTrigger.refresh() on resize
- [x] Implement cleanup function
  - [x] Remove event listeners
  - [x] Kill ScrollTrigger instances

**Animation Details**:

**Entrance Animation**:
- Trigger: Team section entering viewport
- Progress: 40% of scroll
- Members slide up with staggered timing
- Initial letters scale after delay
- Uses gsap.set() for scroll scrubbing

**Card Slide-In Animation**:
- Trigger: Team section pinned at top
- Duration: 3x viewport height
- Phase A: Cards slide from right (300%, 200%, 100%) → center (-50%)
- Phase A: Rotation 20deg → 0deg
- Phase B: Scale 0.75 → 1
- Smooth staggered timing

**Deliverables**:
- Fully functional scroll animations
- Proper ScrollTrigger configuration
- Responsive handling (mobile/desktop)
- Smooth animation timing
- No animation jank or stuttering

**Status**: COMPLETED ✓

**Implementation Date**: 2025-10-10

**Code Location**: `C:\Users\johnn\Documents\Private-work\The Elites\Partnerships\TRD\TRD-website\trd-site\src\components\sections\TeamScrollReveal.tsx`

---

### Phase 3: Styling & Polish [PENDING]
**Objective**: Complete CSS implementation and visual polish

**Tasks**:
- [ ] Verify TeamScrollReveal.css matches animation requirements
- [ ] Add initial states for animations
  - [ ] Members: translateY(125%)
  - [ ] Initial letters: scale(0)
  - [ ] Cards: positioned off-screen right
- [ ] Test overflow behavior
- [ ] Add CSS transitions for non-animated states
- [ ] Verify mobile styles (no transforms)
- [ ] Test cross-browser compatibility
- [ ] Add loading states for images

**Deliverables**:
- Complete CSS implementation
- Smooth visual transitions
- Proper initial states
- Mobile-optimized styles

**Status**: PENDING

---

### Phase 4: Testing & Optimization [PENDING]
**Objective**: Ensure performance and cross-browser compatibility

**Tasks**:
- [ ] Test animation timing at different scroll speeds
- [ ] Verify pinning works correctly (3vh duration)
- [ ] Test on different viewport sizes
- [ ] Test on mobile devices (animations disabled)
- [ ] Test resize behavior
- [ ] Performance audit (60fps target)
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Add error boundaries if needed
- [ ] Test with different numbers of team members
- [ ] Verify accessibility (keyboard navigation, screen readers)

**Performance Targets**:
- 60fps during scroll
- No layout shift
- Smooth animation transitions
- <100ms resize debounce response

**Deliverables**:
- Performance report
- Cross-browser compatibility confirmation
- Mobile testing results
- Accessibility audit

**Status**: PENDING

---

### Phase 5: Integration & Documentation [PENDING]
**Objective**: Integrate into main app and document usage

**Tasks**:
- [ ] Integrate component into main page
- [ ] Add component props documentation
- [ ] Create usage examples
- [ ] Add JSDoc comments
- [ ] Document animation timing parameters
- [ ] Create developer guide
- [ ] Add troubleshooting section
- [ ] Update project README

**Deliverables**:
- Integrated component
- Complete documentation
- Usage examples
- Developer guide

**Status**: PENDING

---

## Change Log

### 2025-10-10 - Phase 2 Completion
**Changes**:
- Implemented placeholder entrance animation with ScrollTrigger
  - Members slide up from 125% to 0% translateY
  - Initial letters scale from 0 to 1 with 0.4 delay
  - Staggered timing: 0.15 per member, 0.7 duration
- Implemented card slide-in animation with pinning
  - Section pinned for 3x viewport height
  - Phase A: Cards slide from right (300%, 200%, 100%) to center (-50%)
  - Phase A: Rotation from 20deg to 0deg
  - Phase B: Scale from 0.75 to 1
  - Staggered timing: 0.075 slide, 0.12 scale
- Added responsive handling
  - Animations disabled below 1000px
  - Proper cleanup with clearProps on mobile
- Implemented debounced resize handler (250ms)
- Added proper cleanup function
  - Event listener removal
  - ScrollTrigger instance cleanup

**Technical Details**:
- Used `gsap.set()` instead of `gsap.to()` for scroll scrubbing
- Used `gsap.utils.toArray()` for element selection
- ScrollTrigger scrub value: 1 (smooth sync)
- Animation formulas based on progress calculations
- TypeScript typing for all functions and refs

**Files Modified**:
- `C:\Users\johnn\Documents\Private-work\The Elites\Partnerships\TRD\TRD-website\trd-site\src\components\sections\TeamScrollReveal.tsx`

**Reference Source**:
- `C:\Users\johnn\Documents\Private-work\The Elites\Dev tools\Assets\Projects\TEAM PAGE LIKE A SCROLL-CONTROLLED REVEAL\codegrid-workingstiff-animated-teams-section-nextjs\src\app\page.js` (lines 26-184)

---

## Technical Notes

### Animation Architecture
1. **Two-phase animation system**:
   - Entrance phase: Members slide into view as section enters viewport
   - Pinned phase: Cards slide in with rotation/scale while section is pinned

2. **Progress-based calculations**:
   - Each animation calculates progress windows
   - Staggered timing creates sequential reveals
   - gsap.set() enables smooth scroll scrubbing

3. **Responsive strategy**:
   - Desktop (>1000px): Full animations
   - Mobile (≤1000px): No animations, final state shown
   - Resize handling with debounce

### Key Dependencies
- GSAP 3.x
- GSAP ScrollTrigger plugin
- @gsap/react (useGSAP hook)
- Lenis (smooth scroll)
- React 18+

### Performance Considerations
- Uses `gsap.set()` for better scroll performance
- Debounced resize handler prevents excessive recalculations
- Proper cleanup prevents memory leaks
- Mobile animations disabled for performance

---

## Next Steps
1. Complete Phase 3: Styling & Polish
2. Test animations in development environment
3. Verify CSS initial states match animation expectations
4. Move to Phase 4: Testing & Optimization

---

## References
- Original design inspiration: "Faces Behind the Frame" scroll animation
- GSAP ScrollTrigger docs: https://greensock.com/docs/v3/Plugins/ScrollTrigger
- Lenis smooth scroll: https://github.com/studio-freight/lenis
