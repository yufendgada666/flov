'use client'

import FlowerMascot from './FlowerMascot'
import ChildFlower from './ChildFlower'
import AmbientFlower from './AmbientFlower'
import type { ChildFlowerColorVariant } from './ChildFlower'
import type { AmbientFlowerVariant } from './AmbientFlower'
import { COLORS } from '@/lib/garden-config'

interface GardenSceneProps {
  children?: React.ReactNode
}

// Child flowers — flowers with faces, scattered around the garden floor
// Sizes kept in 32-44px range for visual cohesion
const CHILD_FLOWERS: Array<{
  style: React.CSSProperties
  size: number
  personality: 'curious' | 'happy' | 'shy'
  color: ChildFlowerColorVariant
  delay: number
  hideOn?: 'sm' | 'md'
}> = [
  // Front row — closest to camera, slightly larger
  { style: { bottom: '2%', left: '8%' }, size: 42, personality: 'curious', color: 'lavender', delay: 0.2 },
  { style: { bottom: '3%', left: '18%' }, size: 40, personality: 'happy', color: 'sakura', delay: 0.5 },
  { style: { bottom: '1%', left: '28%' }, size: 44, personality: 'shy', color: 'white', delay: 0.8 },
  { style: { bottom: '2%', left: '38%' }, size: 38, personality: 'happy', color: 'deep', delay: 1.1 },
  { style: { bottom: '3%', right: '38%' }, size: 42, personality: 'curious', color: 'sunshine', delay: 0.4 },
  { style: { bottom: '1%', right: '28%' }, size: 40, personality: 'happy', color: 'lavender', delay: 0.7 },
  { style: { bottom: '2%', right: '18%' }, size: 44, personality: 'shy', color: 'sakura', delay: 1.0 },
  { style: { bottom: '3%', right: '8%' }, size: 38, personality: 'curious', color: 'white', delay: 1.3 },

  // Second row — slightly higher, slightly smaller
  { style: { bottom: '8%', left: '4%' }, size: 36, personality: 'happy', color: 'sakura', delay: 0.3 },
  { style: { bottom: '9%', left: '14%' }, size: 38, personality: 'curious', color: 'white', delay: 0.6 },
  { style: { bottom: '7%', left: '24%' }, size: 36, personality: 'shy', color: 'lavender', delay: 0.9, hideOn: 'sm' },
  { style: { bottom: '10%', left: '34%' }, size: 38, personality: 'happy', color: 'sunshine', delay: 1.2, hideOn: 'sm' },
  { style: { bottom: '9%', right: '34%' }, size: 36, personality: 'curious', color: 'deep', delay: 0.5, hideOn: 'sm' },
  { style: { bottom: '7%', right: '24%' }, size: 38, personality: 'shy', color: 'sakura', delay: 0.8, hideOn: 'sm' },
  { style: { bottom: '10%', right: '14%' }, size: 36, personality: 'happy', color: 'white', delay: 1.1 },
  { style: { bottom: '8%', right: '4%' }, size: 38, personality: 'curious', color: 'lavender', delay: 1.4 },

  // Third row — mid distance, smaller
  { style: { bottom: '15%', left: '10%' }, size: 32, personality: 'shy', color: 'lavender', delay: 0.4, hideOn: 'md' },
  { style: { bottom: '16%', left: '20%' }, size: 34, personality: 'happy', color: 'sakura', delay: 0.7, hideOn: 'sm' },
  { style: { bottom: '14%', left: '30%' }, size: 32, personality: 'curious', color: 'white', delay: 1.0, hideOn: 'sm' },
  { style: { bottom: '17%', left: '40%' }, size: 34, personality: 'happy', color: 'deep', delay: 1.3, hideOn: 'md' },
  { style: { bottom: '17%', right: '40%' }, size: 32, personality: 'shy', color: 'sunshine', delay: 0.5, hideOn: 'md' },
  { style: { bottom: '14%', right: '30%' }, size: 34, personality: 'happy', color: 'lavender', delay: 0.8, hideOn: 'sm' },
  { style: { bottom: '16%', right: '20%' }, size: 32, personality: 'curious', color: 'sakura', delay: 1.1, hideOn: 'sm' },
  { style: { bottom: '15%', right: '10%' }, size: 34, personality: 'shy', color: 'white', delay: 1.4, hideOn: 'md' },
]

// Ambient (faceless) flowers — fill mid/far ground for density
// Sizes 22-30px for cohesion
const AMBIENT_FLOWERS: Array<{
  style: React.CSSProperties
  size: number
  variant: AmbientFlowerVariant
  delay: number
  hideOn?: 'sm' | 'md'
}> = [
  // Mid ground row
  { style: { bottom: '22%', left: '6%' }, size: 28, variant: 'lavender', delay: 0.3 },
  { style: { bottom: '23%', left: '16%' }, size: 26, variant: 'white', delay: 0.6, hideOn: 'sm' },
  { style: { bottom: '21%', left: '26%' }, size: 28, variant: 'sakura', delay: 0.9, hideOn: 'sm' },
  { style: { bottom: '24%', left: '36%' }, size: 26, variant: 'sunshine', delay: 1.2, hideOn: 'md' },
  { style: { bottom: '22%', left: '46%' }, size: 28, variant: 'deep', delay: 0.4, hideOn: 'md' },
  { style: { bottom: '23%', right: '44%' }, size: 26, variant: 'lavender', delay: 0.7, hideOn: 'md' },
  { style: { bottom: '21%', right: '34%' }, size: 28, variant: 'white', delay: 1.0, hideOn: 'sm' },
  { style: { bottom: '24%', right: '24%' }, size: 26, variant: 'sakura', delay: 1.3, hideOn: 'sm' },
  { style: { bottom: '22%', right: '14%' }, size: 28, variant: 'sunshine', delay: 0.5, hideOn: 'sm' },
  { style: { bottom: '23%', right: '4%' }, size: 26, variant: 'deep', delay: 0.8 },

  // Far ground row — slightly smaller
  { style: { bottom: '29%', left: '10%' }, size: 24, variant: 'sakura', delay: 0.4, hideOn: 'sm' },
  { style: { bottom: '30%', left: '20%' }, size: 22, variant: 'lavender', delay: 0.7, hideOn: 'md' },
  { style: { bottom: '28%', left: '32%' }, size: 24, variant: 'white', delay: 1.0, hideOn: 'md' },
  { style: { bottom: '31%', left: '44%' }, size: 22, variant: 'sunshine', delay: 1.3, hideOn: 'md' },
  { style: { bottom: '30%', right: '46%' }, size: 24, variant: 'deep', delay: 0.5, hideOn: 'md' },
  { style: { bottom: '28%', right: '32%' }, size: 22, variant: 'sakura', delay: 0.8, hideOn: 'md' },
  { style: { bottom: '31%', right: '20%' }, size: 24, variant: 'lavender', delay: 1.1, hideOn: 'sm' },
  { style: { bottom: '29%', right: '8%' }, size: 22, variant: 'white', delay: 1.4, hideOn: 'sm' },

  // Furthest row — smallest, mostly desktop
  { style: { bottom: '36%', left: '14%' }, size: 22, variant: 'lavender', delay: 0.6, hideOn: 'md' },
  { style: { bottom: '37%', left: '28%' }, size: 22, variant: 'sakura', delay: 0.9, hideOn: 'md' },
  { style: { bottom: '36%', left: '42%' }, size: 22, variant: 'white', delay: 1.2, hideOn: 'md' },
  { style: { bottom: '37%', right: '42%' }, size: 22, variant: 'sunshine', delay: 0.5, hideOn: 'md' },
  { style: { bottom: '36%', right: '28%' }, size: 22, variant: 'deep', delay: 0.8, hideOn: 'md' },
  { style: { bottom: '37%', right: '14%' }, size: 22, variant: 'lavender', delay: 1.1, hideOn: 'md' },
]

function hideClass(hideOn?: 'sm' | 'md') {
  if (hideOn === 'sm') return 'hidden sm:block'
  if (hideOn === 'md') return 'hidden md:block'
  return ''
}

export default function GardenScene({ children }: GardenSceneProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Sky gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            ${COLORS.sky} 0%,
            ${COLORS.skyLight} 18%,
            #C4B5FD 38%,
            ${COLORS.sakuraLight} 58%,
            ${COLORS.cream} 78%,
            #E8F5E8 92%,
            #D1F0D1 100%
          )`,
        }}
      />

      {/* Clouds layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute"
          style={{ top: '5%', left: '10%', opacity: 0.7 }}
          width="180"
          height="60"
          viewBox="0 0 180 60"
        >
          <ellipse cx="60" cy="35" rx="55" ry="20" fill="white" opacity="0.8" />
          <ellipse cx="100" cy="30" rx="45" ry="22" fill="white" opacity="0.9" />
          <ellipse cx="130" cy="38" rx="40" ry="18" fill="white" opacity="0.7" />
        </svg>
        <svg
          className="absolute"
          style={{ top: '8%', right: '15%', opacity: 0.5 }}
          width="140"
          height="50"
          viewBox="0 0 140 50"
        >
          <ellipse cx="50" cy="28" rx="40" ry="16" fill="white" opacity="0.8" />
          <ellipse cx="85" cy="25" rx="35" ry="18" fill="white" opacity="0.9" />
        </svg>
        <svg
          className="absolute"
          style={{ top: '15%', left: '50%', opacity: 0.4 }}
          width="120"
          height="40"
          viewBox="0 0 120 40"
        >
          <ellipse cx="60" cy="22" rx="50" ry="15" fill="white" opacity="0.85" />
        </svg>
      </div>

      {/* Flat garden ground — gentle undulations only, no mountain-like peaks */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        {/* Distant meadow line */}
        <svg
          className="absolute bottom-0 w-full"
          height="180"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <path
            d="M0,150 C240,140 480,148 720,142 C960,138 1200,148 1440,144 L1440,180 L0,180 Z"
            fill="#A7F3D0"
            opacity="0.4"
          />
        </svg>
        {/* Mid meadow */}
        <svg
          className="absolute bottom-0 w-full"
          height="130"
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
        >
          <path
            d="M0,110 C300,104 600,112 900,106 C1140,102 1320,110 1440,108 L1440,130 L0,130 Z"
            fill="#86EFAC"
            opacity="0.5"
          />
        </svg>
        {/* Front grass */}
        <svg
          className="absolute bottom-0 w-full"
          height="80"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,56 480,64 720,58 C960,54 1200,62 1440,58 L1440,80 L0,80 Z"
            fill="#4ADE80"
            opacity="0.55"
          />
        </svg>
        {/* Soft fade at very bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{
            background:
              'linear-gradient(0deg, #D1F0D1 0%, rgba(209,240,209,0) 100%)',
          }}
        />
      </div>

      {/* Ambient background flowers (faceless decorations) */}
      {AMBIENT_FLOWERS.map((f, i) => (
        <div
          key={`ambient-${i}`}
          className={`absolute pointer-events-none z-0 ${hideClass(f.hideOn)}`}
          style={f.style}
        >
          <AmbientFlower size={f.size} variant={f.variant} delay={f.delay} />
        </div>
      ))}

      {/* Main mascot — center bottom */}
      <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20">
        <FlowerMascot size={170} className="md:w-[210px]" />
      </div>

      {/* Child flowers scattered around */}
      {CHILD_FLOWERS.map((f, i) => (
        <div
          key={`child-${i}`}
          className={`absolute z-10 ${hideClass(f.hideOn)}`}
          style={f.style}
        >
          <ChildFlower
            size={f.size}
            personality={f.personality}
            colorVariant={f.color}
            delay={f.delay}
          />
        </div>
      ))}

      {/* Text content overlay */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-6 pb-60 pt-20">
        {children}
      </div>
    </div>
  )
}
