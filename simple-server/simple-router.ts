import { serve } from 'bun'
import homePage from './index.html'

const server = serve({
  routes: {
    '/': homePage,
    '/blog': new Response('Blog!'),
    '/api/users/:id': async (req) => {
      const { id } = req.params
      const user = {
        id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      return Response.json(user)
    },
  },
  fetch(req) {
    const url = new URL(req.url)
    console.log(`[${req.method}] ${url.pathname}`)
    return new Response('Not found!', { status: 404 })
  },
  development: true,
})

console.log(`Server running at http://${server.hostname}:${server.port}`)
