import { serve } from 'bun'
import homePage from './index.html'

const server = serve({
  routes: {
    '/': homePage,
    '/blog': new Response('Blog!'),
  },
  fetch(req) {
    const url = new URL(req.url)
    console.log(`[${req.method}] ${url.pathname}`)
    return new Response('Not found!', { status: 404 })
  },
})

console.log(`Server running at http://${server.hostname}:${server.port}`)
