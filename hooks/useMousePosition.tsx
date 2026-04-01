'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'

interface MousePosition {
  x: number
  y: number
  normalX: number // -1 to 1
  normalY: number // -1 to 1
  isTouch: boolean
}

const defaultPos: MousePosition = { x: 0, y: 0, normalX: 0, normalY: 0, isTouch: false }
const MouseContext = createContext<MousePosition>(defaultPos)

export function MousePositionProvider({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState<MousePosition>(defaultPos)
  const isTouch = useRef(false)

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      isTouch.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    }
    checkTouch()

    if (isTouch.current) {
      setPos((p) => ({ ...p, isTouch: true }))
      return
    }

    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      setPos({
        x: e.clientX,
        y: e.clientY,
        normalX: (e.clientX / w) * 2 - 1, // -1 to 1
        normalY: (e.clientY / h) * 2 - 1,
        isTouch: false,
      })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return <MouseContext.Provider value={pos}>{children}</MouseContext.Provider>
}

export function useMousePosition() {
  return useContext(MouseContext)
}
