import { serve } from 'bun'
import homePage from '../index.html'
import { userFactory, UserRequest } from './user'

const server = serve({
  routes: {
    '/': homePage,
    '/blog': new Response('Blog!'),
    '/api/users/:id': userApiHandler,
  },
  fetch: notFoundHandler,
  development: true,
})

function userApiHandler(req: UserRequest) {
  const { id } = req.params
  const user = userFactory(id)
  return Response.json(user)
}

function notFoundHandler(req: Request) {
  const url = new URL(req.url)
  console.log(`[${req.method}] ${url.pathname}`, '--> 404 Not found!')
  return new Response('<h1>Not found!</h1>', {
    status: 404,
    headers: { 'Content-Type': 'text/html' },
  })
}

console.log(`Server running at http://${server.hostname}:${server.port}`)
