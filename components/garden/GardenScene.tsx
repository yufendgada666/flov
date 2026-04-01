'use client'

import { useRef } from 'react'
import FlowerMascot from './FlowerMascot'
import ChildFlower from './ChildFlower'
import FloatingPetal from './FloatingPetal'
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
        <svg className="absolute" style={{ top: '5%', left: '10%', opacity: 0.7 }} width="180" height="60" viewBox="0 0 180 60">
          <ellipse cx="60" cy="35" rx="55" ry="20" fill="white" opacity="0.8" />
          <ellipse cx="100" cy="30" rx="45" ry="22" fill="white" opacity="0.9" />
          <ellipse cx="130" cy="38" rx="40" ry="18" fill="white" opacity="0.7" />
        </svg>
        <svg className="absolute" style={{ top: '8%', right: '15%', opacity: 0.5 }} width="140" height="50" viewBox="0 0 140 50">
          <ellipse cx="50" cy="28" rx="40" ry="16" fill="white" opacity="0.8" />
          <ellipse cx="85" cy="25" rx="35" ry="18" fill="white" opacity="0.9" />
        </svg>
        <svg className="absolute" style={{ top: '15%', left: '50%', opacity: 0.4 }} width="120" height="40" viewBox="0 0 120 40">
          <ellipse cx="60" cy="22" rx="50" ry="15" fill="white" opacity="0.85" />
        </svg>
      </div>

      {/* Rolling hills */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        {/* Far hill */}
        <svg className="absolute bottom-0 w-full" height="250" viewBox="0 0 1440 250" preserveAspectRatio="none">
          <path
            d="M0,200 C180,100 360,150 540,120 C720,90 900,160 1080,110 C1260,60 1440,140 1440,140 L1440,250 L0,250 Z"
            fill="#86EFAC"
            opacity="0.3"
          />
        </svg>
        {/* Mid hill */}
        <svg className="absolute bottom-0 w-full" height="200" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path
            d="M0,160 C200,80 400,140 600,100 C800,60 1000,130 1200,90 C1350,60 1440,100 1440,100 L1440,200 L0,200 Z"
            fill="#4ADE80"
            opacity="0.35"
          />
        </svg>
        {/* Front grass */}
        <svg className="absolute bottom-0 w-full" height="140" viewBox="0 0 1440 140" preserveAspectRatio="none">
          <path
            d="M0,80 C120,40 240,90 400,60 C560,30 720,70 880,50 C1040,30 1200,65 1440,40 L1440,140 L0,140 Z"
            fill="#34D399"
            opacity="0.5"
          />
        </svg>
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(0deg, #E8F5E8 0%, rgba(232,245,232,0) 100%)' }} />
      </div>

      {/* Floating petals */}
      {PETAL_POSITIONS.map((pos, i) => (
        <FloatingPetal key={i} index={i} style={{ position: 'absolute', ...pos }} />
      ))}

      {/* Mascot and children positioned in center-bottom */}
      <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 flex items-end gap-4 md:gap-8 z-10">
        <ChildFlower size={50} personality="shy" delay={0.5} className="mb-2 hidden sm:block" />
        <FlowerMascot size={160} className="md:w-[200px]" />
        <ChildFlower size={45} personality="curious" delay={1} className="mb-4 hidden sm:block" />
        <ChildFlower size={55} personality="happy" delay={0.3} className="mb-1 hidden md:block" />
      </div>

      {/* Text content overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 pb-60 pt-20">
        {children}
      </div>
    </div>
  )
}
