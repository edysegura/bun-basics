const contentElement = document.getElementById('content')
const navigationLinks = document.querySelectorAll('a')

// Route to content mapping
const routeContentMap = {
  '/page-1.html': 'Content for page 1',
  '/page-2.html': 'Content for page 2',
  '/about.html': 'This is the about page',
  '/': 'This is the default content.',
}

navigationLinks.forEach((link) => {
  link.addEventListener('click', handleNavigationClick)
})

window.addEventListener('popstate', handleHistoryNavigation)

function handleNavigationClick(event) {
  event.preventDefault()
  const link = event.target
  const url = new URL(link.href)
  const content = getContentForRoute(`${url.pathname}`)
  history.pushState(content, '', link.href)
  updatePageContent(content)
}

function updatePageContent(content) {
  contentElement.innerHTML = content || 'No content available'
}

function handleHistoryNavigation(event) {
  const content = event.state
  updatePageContent(content)
}

function getContentForRoute(route) {
  console.log('[app.js] route to', route)
  return routeContentMap[route] || 'No content available'
}

window.addEventListener('DOMContentLoaded', () => {
  const currentPath = document.location.pathname
  const content = getContentForRoute(currentPath)
  updatePageContent(content)
  history.replaceState(content, '', currentPath)
})
