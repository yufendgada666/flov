// Garden design system constants

export const COLORS = {
  sakura: '#FF6B9D',
  sakuraLight: '#FFB3CC',
  sakuraDark: '#E84577',
  spring: '#2EC4B6',
  springLight: '#7EDDD3',
  sunshine: '#FFD93D',
  sky: '#6CB4EE',
  skyLight: '#A8D8F0',
  lavender: '#A78BFA',
  snow: '#FAFBFF',
  cream: '#FFF5E4',
  charcoal: '#2D3436',
  charcoalLight: '#636E72',
} as const

// Mascot dimensions
export const MASCOT = {
  viewBox: '0 0 200 240',
  faceCenter: { x: 100, y: 100 },
  faceRadius: 38,
  petalCount: 6,
  petalRx: 22,
  petalRy: 38,
  petalOffset: 52, // distance from face center to petal center
  eyeLeft: { x: 86, y: 96 },
  eyeRight: { x: 114, y: 96 },
  eyeRadius: 8,
  irisRadius: 4.5,
  pupilRadius: 2.5,
  irisMaxOffset: 3,
  blushRadius: 6,
  blushLeft: { x: 78, y: 108 },
  blushRight: { x: 122, y: 108 },
  mouthY: 112,
} as const

// Animation timing
export const TIMING = {
  blinkIntervalMin: 3000,
  blinkIntervalMax: 7000,
  blinkDuration: 0.15,
  breatheDuration: 3,
  petalSwayDuration: 2.5,
  eyeTrackEase: 0.15,
} as const

// Hero parallax layer speeds (0 = fixed, 1 = normal scroll)
export const PARALLAX = {
  sky: 0,
  clouds: 0.1,
  hills: 0.3,
  grass: 0.6,
  flowers: 0.5,
} as const
