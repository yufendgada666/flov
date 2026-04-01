import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

export default getRequestConfig(async () => {
  // Detect locale from cookie, header, or default to 'zh'
  const cookieStore = cookies()
  const headersList = headers()

  let locale = cookieStore.get('NEXT_LOCALE')?.value

  if (!locale) {
    const acceptLanguage = headersList.get('accept-language') || ''
    locale = acceptLanguage.startsWith('en') ? 'en' : 'zh'
  }

  if (!['zh', 'en'].includes(locale)) locale = 'zh'

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
