const HOST = 'mintbrooks.com'
const KEY = process.env.INDEXNOW_KEY ?? ''
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

export async function pingIndexNow(urls: string[]): Promise<void> {
  if (!KEY || urls.length === 0) return
  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls.slice(0, 10000),
      }),
    })
  } catch {
    // IndexNow is best-effort; never block publish flow on failure
  }
}

export async function pingGoogleSitemap(): Promise<void> {
  try {
    await fetch(`https://www.google.com/ping?sitemap=https://${HOST}/sitemap.xml`, {
      method: 'GET',
    })
  } catch {}
}
