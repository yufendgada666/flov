// Garden design system constants

export const COLORS = {
  sakura: '#FF6B9D',
  sakuraLight: '#FFB3CC',
  sakuraDark: '#E84577',
  sakuraDeep: '#D63384',
  begoniaWhite: '#FFF0F5',
  spring: '#2EC4B6',
  springLight: '#7EDDD3',
  sunshine: '#FFD93D',
  sunshineDeep: '#F4B400',
  sky: '#6CB4EE',
  skyLight: '#A8D8F0',
  lavender: '#A78BFA',
  lavenderLight: '#C4B5FD',
  snow: '#FAFBFF',
  cream: '#FFF5E4',
  charcoal: '#2D3436',
  charcoalLight: '#636E72',
} as const

// Begonia petal path - origin at petal tip (0,0), petal grows upward
// Length ~44, width ~22, heart-shaped/teardrop with rounded top
export const BEGONIA_PETAL_PATH =
  'M 0,0 C -8,-8 -22,-15 -18,-30 C -14,-42 -4,-44 0,-44 C 4,-44 14,-42 18,-30 C 22,-15 8,-8 0,0 Z'

// Smaller begonia petal path for child flowers (length ~22, width ~11)
export const BEGONIA_PETAL_PATH_SMALL =
  'M 0,0 C -4,-4 -11,-7.5 -9,-15 C -7,-21 -2,-22 0,-22 C 2,-22 7,-21 9,-15 C 11,-7.5 4,-4 0,0 Z'

// Mascot dimensions
export const MASCOT = {
  viewBox: '0 0 200 240',
  faceCenter: { x: 100, y: 100 },
  faceRadius: 36,
  petalCount: 5,
  petalOffset: 44, // distance from face center to petal tip
  eyeLeft: { x: 86, y: 96 },
  eyeRight: { x: 114, y: 96 },
  eyeRadius: 9,
  irisRadius: 5,
  pupilRadius: 2.8,
  irisMaxOffset: 6,
  blushRadius: 9,
  blushLeft: { x: 76, y: 110 },
  blushRight: { x: 124, y: 110 },
  mouthY: 114,
  stamenCount: 10,
  stamenRadius: 1.6,
  stamenClusterRadius: 9,
  proximityRadius: 260,
  proximityScale: 1.08,
} as const

// Animation timing
export const TIMING = {
  blinkIntervalMin: 3000,
  blinkIntervalMax: 7000,
  blinkDuration: 0.15,
  breatheDuration: 3,
  petalSwayDuration: 2.5,
  eyeTrackEase: 0.15,
  proximityEase: 0.4,
} as const

// Hero parallax layer speeds (0 = fixed, 1 = normal scroll)
export const PARALLAX = {
  sky: 0,
  clouds: 0.1,
  hills: 0.3,
  grass: 0.6,
  flowers: 0.5,
} as const
