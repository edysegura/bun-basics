import { serve } from 'bun'
import homePage from './index.html'

// This server will serve the HTML file and all its bundled assets.
const server = serve({
  routes: {
    '/': homePage,
  },
})

console.log(
  `Server is up and running at http://${server.hostname}:${server.port}`,
)
