import type { Metadata } from 'next'
import { notoSerifSC, notoSansSC, cormorant, inter, jetbrainsMono } from '@/lib/fonts'
import MotionConfigWrapper from '@/components/animations/MotionConfig'
import SmoothScroll from '@/components/animations/SmoothScroll'
import { MousePositionProvider } from '@/hooks/useMousePosition'
import CustomCursor from '@/components/garden/CustomCursor'
import './globals.css'

export const metadata: Metadata = {
  title: '小伴 · 微信里的 AI 辅导老师｜不给答案，把孩子陪到真的懂',
  description:
    '小伴是住在微信里的 AI 辅导老师：孩子把不会的题拍照、打字或发语音发给它，它只教方法、不给答案，一步步引导孩子自己算出来；每天晚上给家长一份微信学习报告。加好友即用，无需下载 App。',
  keywords: [
    '小伴',
    'AI辅导老师',
    'AI学习助手',
    '微信AI老师',
    '作业辅导',
    '不给答案',
    '引导式学习',
    '家长学习报告',
    '全科辅导',
    '花声科技',
    'FLOV',
  ],
  authors: [{ name: '花声科技 FLOV Inc.' }],
  openGraph: {
    title: '小伴 · 微信里的 AI 辅导老师',
    description:
      '只教方法、不给答案，把孩子陪到真的懂。拍照、打字、发语音都能问，每天晚上给家长一份学习报告。微信加好友即用。',
    url: 'https://flov.cheerai.cn',
    siteName: '小伴 · FLOV',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '小伴 · 微信里的 AI 辅导老师',
    description:
      '只教方法、不给答案，把孩子陪到真的懂。拍照、打字、发语音都能问，每天晚上给家长一份学习报告。',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className={[
        notoSerifSC.variable,
        notoSansSC.variable,
        cormorant.variable,
        inter.variable,
        jetbrainsMono.variable,
      ].join(' ')}
    >
      <body>
        <MotionConfigWrapper>
          <MousePositionProvider>
            <SmoothScroll />
            <CustomCursor />
            {children}
          </MousePositionProvider>
        </MotionConfigWrapper>
      </body>
    </html>
  )
}
