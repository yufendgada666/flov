'use client'

/* Replaces the root layout when a top-level error occurs — must render its own html/body
   and cannot rely on globals.css, so styles are inline. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="zh-CN">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif',
          background: 'linear-gradient(175deg, #FFF9F2 0%, #FAFBFF 60%, #FFF5E4 100%)',
          color: '#2D3436',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <div style={{ maxWidth: 360 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>页面出了点小状况</h1>
          <p style={{ fontSize: 15, color: '#636E72', marginTop: 12 }}>刷新一下通常就好了。</p>
          <button
            onClick={reset}
            style={{
              marginTop: 24,
              padding: '12px 24px',
              borderRadius: 999,
              border: 'none',
              background: '#FF6B9D',
              color: '#fff',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            重新加载
          </button>
        </div>
      </body>
    </html>
  )
}
