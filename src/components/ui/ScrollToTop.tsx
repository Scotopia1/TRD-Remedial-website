'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Reset native scroll position (works for mobile / non-Lenis paths)
    window.scrollTo(0, 0)
    // Also signal Lenis (desktop) to reset its internal scroll position.
    // TransitionProvider already dispatches this at the start of the enter
    // animation, but dispatching again here (after pathname commits) covers
    // any timing gap where Lenis re-applies its stored position after the
    // transition blocks clear.
    window.dispatchEvent(new CustomEvent('instantScrollReset'))
  }, [pathname])

  return null
}
