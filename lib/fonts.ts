import { Noto_Serif_SC, Noto_Sans_SC, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'

/* Heading display serif — only weight 700 is used (font-display-zh is always bold). */
export const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-noto-serif-sc',
  display: 'swap',
  preload: false, // CJK fonts are large; lazy-load
})

/* Body sans — 400 regular, 500 medium, 700 bold (avoids faux-bold synthesis). */
export const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
  preload: false,
})

/* Latin display serif — only the FLOV wordmark + step numerals use it, at 600. */
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
