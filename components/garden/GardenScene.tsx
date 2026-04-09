'use client'

import FlowerMascot from './FlowerMascot'
import ChildFlower from './ChildFlower'
import AmbientFlower from './AmbientFlower'
import FloatingPetal from './FloatingPetal'
import type { ChildFlowerColorVariant } from './ChildFlower'
import type { AmbientFlowerVariant } from './AmbientFlower'
import { COLORS } from '@/lib/garden-config'

interface GardenSceneProps {
  children?: React.ReactNode
}

const PETAL_POSITIONS = [
  { top: '12%', left: '6%' },
  { top: '20%', right: '8%' },
  { top: '55%', left: '3%' },
  { top: '65%', right: '6%' },
  { top: '35%', left: '92%' },
  { top: '8%', left: '70%' },
  { top: '75%', left: '15%' },
]

// Child flowers scattered around the main mascot
// Each entry: position relative to viewport, size, personality, color, responsive visibility
const CHILD_FLOWERS: Array<{
  style: React.CSSProperties
  size: number
  personality: 'curious' | 'happy' | 'shy'
  color: ChildFlowerColorVariant
  delay: number
  hideOn?: 'sm' | 'md'
}> = [
  // Left side cluster
  { style: { bottom: '8%', left: '14%' }, size: 50, personality: 'curious', color: 'lavender', delay: 0.2 },
  { style: { bottom: '15%', left: '22%' }, size: 38, personality: 'shy', color: 'white', delay: 0.6, hideOn: 'sm' },
  { style: { bottom: '4%', left: '28%' }, size: 44, personality: 'happy', color: 'sakura', delay: 0.4, hideOn: 'sm' },
  { style: { bottom: '11%', left: '6%' }, size: 34, personality: 'shy', color: 'deep', delay: 1.1, hideOn: 'md' },

  // Right side cluster
  { style: { bottom: '8%', right: '16%' }, size: 48, personality: 'happy', color: 'sunshine', delay: 0.3 },
  { style: { bottom: '14%', right: '24%' }, size: 36, personality: 'curious', color: 'lavender', delay: 0.7, hideOn: 'sm' },
  { style: { bottom: '5%', right: '30%' }, size: 42, personality: 'happy', color: 'white', delay: 0.9, hideOn: 'sm' },
  { style: { bottom: '12%', right: '6%' }, size: 32, personality: 'curious', color: 'sakura', delay: 1.3, hideOn: 'md' },
]

// Ambient (faceless) flowers — far background decoration on hills
const AMBIENT_FLOWERS: Array<{
  style: React.CSSProperties
  size: number
  variant: AmbientFlowerVariant
  delay: number
  hideOn?: 'sm' | 'md'
}> = [
  { style: { bottom: '28%', left: '8%' }, size: 28, variant: 'lavender', delay: 0.5 },
  { style: { bottom: '32%', left: '18%' }, size: 22, variant: 'white', delay: 1.2, hideOn: 'sm' },
  { style: { bottom: '26%', left: '38%' }, size: 24, variant: 'sakura', delay: 0.8, hideOn: 'sm' },
  { style: { bottom: '34%', left: '52%' }, size: 20, variant: 'sunshine', delay: 1.5, hideOn: 'md' },
  { style: { bottom: '30%', right: '38%' }, size: 26, variant: 'lavender', delay: 0.6, hideOn: 'sm' },
  { style: { bottom: '27%', right: '20%' }, size: 22, variant: 'white', delay: 1.0, hideOn: 'sm' },
  { style: { bottom: '33%', right: '8%' }, size: 28, variant: 'deep', delay: 0.4 },
  { style: { bottom: '29%', right: '50%' }, size: 18, variant: 'sakura', delay: 1.4, hideOn: 'md' },
  { style: { bottom: '36%', left: '28%' }, size: 16, variant: 'sunshine', delay: 1.8, hideOn: 'md' },
  { style: { bottom: '37%', right: '28%' }, size: 18, variant: 'lavender', delay: 2.0, hideOn: 'md' },
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
            ${COLORS.skyLight} 20%,
            #C4B5FD 45%,
            ${COLORS.sakuraLight} 65%,
            ${COLORS.cream} 85%,
            #E8F5E8 100%
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

      {/* Rolling hills */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute bottom-0 w-full"
          height="250"
          viewBox="0 0 1440 250"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 C180,100 360,150 540,120 C720,90 900,160 1080,110 C1260,60 1440,140 1440,140 L1440,250 L0,250 Z"
            fill="#86EFAC"
            opacity="0.3"
          />
        </svg>
        <svg
          className="absolute bottom-0 w-full"
          height="200"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,160 C200,80 400,140 600,100 C800,60 1000,130 1200,90 C1350,60 1440,100 1440,100 L1440,200 L0,200 Z"
            fill="#4ADE80"
            opacity="0.35"
          />
        </svg>
        <svg
          className="absolute bottom-0 w-full"
          height="140"
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C120,40 240,90 400,60 C560,30 720,70 880,50 C1040,30 1200,65 1440,40 L1440,140 L0,140 Z"
            fill="#34D399"
            opacity="0.5"
          />
        </svg>
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{
            background:
              'linear-gradient(0deg, #E8F5E8 0%, rgba(232,245,232,0) 100%)',
          }}
        />
      </div>

      {/* Floating petals */}
      {PETAL_POSITIONS.map((pos, i) => (
        <FloatingPetal key={i} index={i} style={{ position: 'absolute', ...pos }} />
      ))}

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
