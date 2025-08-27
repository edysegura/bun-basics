import { serve } from 'bun'

const server = serve({
  fetch(req) {
    const url = new URL(req.url)
    if (url.pathname === '/') return new Response('Home page!')
    if (url.pathname === '/blog') return new Response('Blog!')
    return new Response('404!')
  },
})

console.log(`Server running at http://${server.hostname}:${server.port}`)
