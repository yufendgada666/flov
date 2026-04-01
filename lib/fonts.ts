import { Noto_Serif_SC, Noto_Sans_SC, Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google'

export const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif-sc',
  display: 'swap',
  preload: false, // CJK fonts are large; lazy-load
})

export const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
  preload: false,
})

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
