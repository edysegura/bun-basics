const contentElement = document.getElementById('content') as HTMLElement
const navigationLinks = document.querySelectorAll<HTMLAnchorElement>('a')

// Route to content mapping
const routeContentMap: Record<string, string> = {
  '/page-1.html': '<h3>Content for page 1</h3>',
  '/page-2.html': '<h3>Content for page 2</h3>',
  '/about.html': '<h3>This is the about page</h3>',
  '/': '<h3>This is the default content.</h3>',
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
  history.pushState(content, '', link.href)
  updatePageContent(content)
}

function updatePageContent(content: string) {
  if (!contentElement) return
  contentElement.innerHTML = content || 'No content available'
}

function handleHistoryNavigation(event: PopStateEvent) {
  const content = event.state as string | ''
  updatePageContent(content)
}

function getContentForRoute(route: string): string {
  console.log('[app.ts] route to', route)
  return routeContentMap[route] || 'No content available'
}

window.addEventListener('DOMContentLoaded', () => {
  const currentPath = document.location.pathname
  const content = getContentForRoute(currentPath)
  updatePageContent(content)
  history.replaceState(content, '', currentPath)
})
