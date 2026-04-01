import type { Metadata } from 'next'
import { notoSerifSC, notoSansSC, cormorant, inter, jetbrainsMono } from '@/lib/fonts'
import MotionConfigWrapper from '@/components/animations/MotionConfig'
import { MousePositionProvider } from '@/hooks/useMousePosition'
import CustomCursor from '@/components/garden/CustomCursor'
import './globals.css'

export const metadata: Metadata = {
  title: '花声科技 · FLOV — 陪你听见孩子成长的声音',
  description:
    '花声科技（FLOV / FloraVoice）用 AI 帮助父母听见孩子成长中那些不易察觉的声音。小伴是你孩子的 AI 学习伴侣。',
  keywords: ['花声科技', 'FLOV', 'FloraVoice', '小伴', 'AI陪伴', '儿童教育', '亲子科技'],
  authors: [{ name: '花声科技 FLOV Inc.' }],
  openGraph: {
    title: '花声科技 · FLOV',
    description: '只恐夜深花睡去，故烧高烛照红妆。帮父母听见孩子成长的声音。',
    url: 'https://flov.ai',
    siteName: 'FLOV',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '花声科技 · FLOV',
    description: '只恐夜深花睡去，故烧高烛照红妆。帮父母听见孩子成长的声音。',
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
            <CustomCursor />
            {children}
          </MousePositionProvider>
        </MotionConfigWrapper>
      </body>
    </html>
  )
}
