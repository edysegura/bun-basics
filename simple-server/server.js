import { serve } from 'bun'
import homePage from './index.html'

const PORT = 3000
const ADDRESS = 'localhost'

// This server will serve the HTML file and all its bundled assets.
serve({
  port: PORT,
  hostname: ADDRESS,
  routes: {
    '/': homePage,
  },
})

console.log(`Server is up and running at http://${ADDRESS}:${PORT}`)
