import type { Metadata } from 'next'
import Link from 'next/link'
import FlovLogo from '@/components/icons/FlovLogo'

export const metadata: Metadata = {
  title: '用户协议 · 小伴 FLOV',
  description: '小伴（北京花声智能科技有限公司）用户协议。',
}

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: '一、服务说明',
    p: [
      '小伴是由北京花声智能科技有限公司提供的 AI 学习辅导助手：它只教方法、不直接给出最终答案，引导孩子一步步自己得出结果，并向家长提供学习报告。',
    ],
  },
  {
    h: '二、使用方式',
    p: ['通过微信添加小伴为好友即可使用，无需下载额外 App 或单独注册账号。'],
  },
  {
    h: '三、使用规范',
    p: ['小伴仅用于学习用途。请勿将其用于违法、违规或与学习无关的滥用行为。'],
  },
  {
    h: '四、内容与免责',
    p: [
      '小伴的回答由人工智能生成，仅供学习参考，可能存在不准确或不完整之处，请结合教材与老师的指导自行判断。我们会持续改进，但无法保证全部内容均准确无误。',
    ],
  },
  {
    h: '五、账号与未成年人',
    p: ['小伴面向家庭使用，建议家长对未成年人的使用进行知情与监督。'],
  },
  {
    h: '六、知识产权',
    p: ['“小伴”“花声 / FLOV”等品牌标识及相关内容的知识产权归北京花声智能科技有限公司所有。'],
  },
  {
    h: '七、服务变更与中止',
    p: ['产品处于持续迭代中，内测期间功能、内容与可用性可能调整，我们将尽量提前说明。'],
  },
  {
    h: '八、协议更新',
    p: ['本协议如有更新，我们将在本页公示。'],
  },
  {
    h: '九、联系我们',
    p: ['如对本协议有任何疑问，可发送邮件至 hello@flov.ai，或在微信中直接联系小伴。'],
  },
]

export default function TermsPage() {
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

        <h1 className="font-display-zh font-bold text-charcoal text-3xl">用户协议</h1>
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
