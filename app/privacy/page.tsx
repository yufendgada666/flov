import type { Metadata } from 'next'
import Link from 'next/link'
import FlovLogo from '@/components/icons/FlovLogo'

export const metadata: Metadata = {
  title: '隐私政策 · 小伴 FLOV',
  description: '小伴（北京花声智能科技有限公司）隐私政策。',
}

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: '一、引言',
    p: [
      '北京花声智能科技有限公司（以下简称“我们”）运营 AI 学习辅导助手“小伴”。本政策说明我们如何收集、使用与保护你和孩子的信息。使用小伴即表示你已阅读并理解本政策。',
    ],
  },
  {
    h: '二、我们收集的信息',
    p: [
      '孩子主动发给小伴的题目内容（文字、图片或语音）、做题与提问记录、涉及的学科；',
      '家长与孩子用于关联同一小伴号的微信账号标识；',
      '为保障服务运行所必需的基本技术日志。',
    ],
  },
  {
    h: '三、我们如何使用信息',
    p: ['用于给孩子讲题与引导其自己得出答案；生成给家长的每日学习报告；在去标识化的前提下改进辅导质量。'],
  },
  {
    h: '四、我们不会做什么',
    p: ['不出售你或孩子的个人信息；不将信息用于与学习无关的用途；不向无关第三方共享；不针对未成年人进行商业广告画像。'],
  },
  {
    h: '五、未成年人保护',
    p: [
      '小伴面向家庭使用，建议在家长知情并同意的前提下由孩子使用。家长与孩子共用同一小伴号，家长可随时查看孩子的提问记录，并可要求我们删除相关内容。',
    ],
  },
  {
    h: '六、信息存储与安全',
    p: ['我们对数据采取传输加密、访问控制等措施，并遵循最小化、必要性原则留存信息。'],
  },
  {
    h: '七、你的权利',
    p: ['你可以查看、更正、删除相关信息或注销使用。通过微信联系小伴或发送邮件至下方联系方式即可行使上述权利。'],
  },
  {
    h: '八、政策更新',
    p: ['本政策如有重大变更，我们将在本页公示更新。'],
  },
  {
    h: '九、联系我们',
    p: ['如对本政策有任何疑问，可发送邮件至 yufeng@flov.la，或在微信中直接联系小伴。'],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-snow">
      <div className="section-container max-w-3xl py-12 lg:py-16">
        <div className="flex items-center justify-between mb-8">
          <FlovLogo variant="dark" showWordmark />
          <Link href="/" className="text-[14px] text-charcoal-light hover:text-sakura transition-colors">
            ← 返回首页
          </Link>
        </div>

        <div className="mb-6 inline-block rounded-lg bg-sunshine/20 border border-sunshine/40 px-3 py-1.5 text-[12.5px] text-charcoal-light">
          草案版本 · 最终以公司法务审定与正式公示版本为准
        </div>

        <h1 className="font-display-zh font-bold text-charcoal text-3xl">隐私政策</h1>
        <p className="mt-2 text-[13px] text-charcoal-light">运营主体：北京花声智能科技有限公司</p>

        <div className="mt-8 space-y-7">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="text-[17px] font-bold text-charcoal">{s.h}</h2>
              <div className="mt-2 space-y-2">
                {s.p.map((line, i) => (
                  <p key={i} className="text-[14.5px] leading-relaxed text-charcoal-light">
                    {line}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 pt-6 border-t border-charcoal/10 text-[12px] text-charcoal-light/70">
          © 2026 北京花声智能科技有限公司 · 花声科技 FLOV
        </p>
      </div>
    </main>
  )
}
