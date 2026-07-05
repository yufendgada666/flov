import type { Metadata, Viewport } from 'next'
import { notoSerifSC, notoSansSC, cormorant, jetbrainsMono } from '@/lib/fonts'
import MotionConfigWrapper from '@/components/animations/MotionConfig'
import SmoothScroll from '@/components/animations/SmoothScroll'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://flov.cheerai.cn'),
  alternates: { canonical: '/' },
  title: '小伴 AI 学习机｜只能学习的手机，不给答案只教方法',
  description:
    '小伴是一台只能学习的 AI 学习机：孩子把不会的题拍照或按住说话问它，它不给答案、一步步教方法；退不出去、装不了游戏和短视频；每天晚上给家长一份微信学习报告。首月 399 元，次月起 99 元/月，满 12 个月机器归你。',
  keywords: [
    '小伴',
    'AI学习机',
    '儿童学习机',
    '学习专用手机',
    '防沉迷手机',
    '不给答案',
    '引导式学习',
    '拍照搜题',
    '家长学习报告',
    '全科辅导',
    '花声科技',
    'FLOV',
  ],
  authors: [{ name: '花声科技 FLOV Inc.' }],
  openGraph: {
    title: '小伴 AI 学习机 · 只能学习的手机',
    description:
      '不给答案、只教方法的 AI 学习机：拍照、说话就能问，退不出去、装不了游戏，每天给家长一份学习报告。首月 399 元，满 12 个月机器归你。',
    url: 'https://flov.cheerai.cn',
    siteName: '小伴 · FLOV',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '小伴 AI 学习机 · 只能学习的手机',
    description:
      '不给答案、只教方法的 AI 学习机：拍照、说话就能问，退不出去、装不了游戏，每天给家长一份学习报告。',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // honor safe-area insets on notched phones
  themeColor: '#FFF7F0', // tints the WeChat/Safari chrome to match the hero
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className={[
        notoSerifSC.variable,
        notoSansSC.variable,
        cormorant.variable,
        jetbrainsMono.variable,
      ].join(' ')}
    >
      <body>
        <MotionConfigWrapper>
          <SmoothScroll />
          {children}
        </MotionConfigWrapper>
      </body>
    </html>
  )
}
