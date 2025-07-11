import { serve } from 'bun'

const PORT = 3000
const ADDRESS = 'localhost'

serve({
  port: PORT,
  hostname: ADDRESS,
  async fetch(req: Request) {
    const url = new URL(req.url)
    if (url.pathname === '/') {
      const html = await Bun.file('./simple-server/index.html').text()
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
      })
    }
    return new Response('Not Found', { status: 404 })
  },
})

console.log(`Server is up and running at http://${ADDRESS}:${PORT}`)
