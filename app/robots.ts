import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://flov.cheerai.cn/sitemap.xml',
    host: 'https://flov.cheerai.cn',
  }
}
