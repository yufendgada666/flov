'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import type { IntroDict } from './IntroOverlay'

const IntroOverlay = dynamic(() => import('./IntroOverlay'), { ssr: false })

interface IntroContextValue {
  introDone: boolean
}

/* Default true so components depending on the gate still work without a provider */
const IntroContext = createContext<IntroContextValue>({ introDone: true })

export function useIntro(): IntroContextValue {
  return useContext(IntroContext)
}

interface IntroProviderProps {
  dict: IntroDict
  children: ReactNode
}

export default function IntroProvider({ dict, children }: IntroProviderProps) {
  const [introDone, setIntroDone] = useState(false)

  return (
    <IntroContext.Provider value={{ introDone }}>
      <IntroOverlay dict={dict} onDone={() => setIntroDone(true)} />
      {children}
    </IntroContext.Provider>
  )
}
