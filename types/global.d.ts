import type Lenis from 'lenis'

declare global {
  interface Window {
    /** Set by SmoothScroll on desktop; used by the intro overlay to pause/resume scrolling. */
    __lenis?: Lenis
  }
}

export {}
