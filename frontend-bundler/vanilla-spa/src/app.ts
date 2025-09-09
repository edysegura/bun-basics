import type { HTMLBundle } from 'bun'
import page1 from './pages/page-1.html' with { type: "text" }

type htmlPage = string | HTMLBundle

const contentElement = document.getElementById('content') as HTMLElement
const navigationLinks = document.querySelectorAll<HTMLAnchorElement>('a')

// Route to content mapping
const routeContentMap: Record<string, htmlPage> = {
  '/page-1.html': page1,
  '/page-2.html': '<h2>Content for page 2</h2>',
  '/about.html': '<h2>This is the about page</h2>',
  '/': '<h2>This is the default content.</h2>',
}

navigationLinks.forEach((link) => {
  link.addEventListener('click', handleNavigationClick)
})

window.addEventListener('popstate', handleHistoryNavigation)

function handleNavigationClick(event: MouseEvent) {
  event.preventDefault()
  const link = event.currentTarget as HTMLAnchorElement
  if (!link || !link.href) return
  const url = new URL(link.href)
  const content = getContentForRoute(`${url.pathname}`)
  updatePageContent(content)
  window.history.pushState(content, '', link.href)
}

function updatePageContent(content: htmlPage) {
  if (!contentElement) return
  contentElement.innerHTML = content as string || 'No content available'
}

function handleHistoryNavigation(event: PopStateEvent) {
  const content = event.state as string | ''
  console.log('[app.ts] pop state', content)
  updatePageContent(content)
}

function getContentForRoute(route: string): htmlPage {
  console.log('[app.ts] route to', route)
  return routeContentMap[route] || 'No content available'
}

window.addEventListener('DOMContentLoaded', () => {
  const currentPath = document.location.pathname
  const content = getContentForRoute(currentPath)
  updatePageContent(content)
  window.history.replaceState(content, '', currentPath)
})
