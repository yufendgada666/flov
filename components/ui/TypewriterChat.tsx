'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface Message {
  text: string
  from: 'child' | 'ai'
}

interface TypewriterChatProps {
  messages: Message[]
  aiLabel?: string
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="px-3 py-2 rounded-2xl"
        style={{ background: '#F0EBFF', borderBottomLeftRadius: 4 }}
      >
        <div className="flex gap-1 items-center h-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: '#A78BFA',
                animation: `bounce 1s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TypewriterChat({ messages, aiLabel = '小伴' }: TypewriterChatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    if (!isInView) return

    let index = 0
    const showNext = () => {
      if (index >= messages.length) return

      // Show typing indicator before AI messages
      if (messages[index].from === 'ai') {
        setShowTyping(true)
        setTimeout(() => {
          setShowTyping(false)
          setVisibleCount(index + 1)
          index++
          setTimeout(showNext, 800)
        }, 1200)
      } else {
        setVisibleCount(index + 1)
        index++
        setTimeout(showNext, 600)
      }
    }

    const timer = setTimeout(showNext, 500)
    return () => clearTimeout(timer)
  }, [isInView, messages.length])

  return (
    <div
      ref={ref}
      className="relative mx-auto"
      style={{
        width: 300,
        height: 560,
        background: '#2D3436',
        borderRadius: 40,
        padding: '12px 4px',
        boxShadow:
          '0 30px 80px rgba(45,52,54,0.3), 0 0 0 1px rgba(255,107,157,0.1), inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      {/* Notch */}
      <div
        className="mx-auto mb-3"
        style={{ width: 80, height: 6, background: '#636E72', borderRadius: 3 }}
      />

      {/* Screen */}
      <div
        className="overflow-hidden flex flex-col h-full"
        style={{ borderRadius: 28, background: '#FAFBFF' }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: 'linear-gradient(135deg, #FF6B9D, #A78BFA)' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ background: 'rgba(255,255,255,0.25)' }}
          >
            🌸
          </div>
          <div>
            <div className="text-xs font-semibold text-white">{aiLabel}</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
              在线
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
          {messages.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${msg.from === 'child' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-[78%] px-3 py-2 rounded-2xl text-xs leading-relaxed"
                style={
                  msg.from === 'child'
                    ? { background: '#FF6B9D', color: 'white', borderBottomRightRadius: 4 }
                    : { background: '#F0EBFF', color: '#2D3436', borderBottomLeftRadius: 4 }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {showTyping && <TypingIndicator />}
        </div>

        {/* Input bar */}
        <div
          className="flex items-center gap-2 px-3 py-2 border-t"
          style={{ borderColor: 'rgba(255,107,157,0.1)' }}
        >
          <div
            className="flex-1 rounded-full px-3 py-1.5 text-xs"
            style={{ background: 'rgba(255,107,157,0.06)', color: '#636E72' }}
          >
            说点什么...
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-white"
            style={{ background: '#FF6B9D' }}
          >
            ↑
          </div>
        </div>
      </div>
    </div>
  )
}
