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
  const newContent = link.dataset.content
  history.pushState(newContent, '', link.href)
  updatePageContent(newContent)
}

function updatePageContent(newContent) {
  contentElement.innerHTML = newContent || 'No content available'
}

function handleHistoryNavigation(event) {
  const newContent = event.state
  updatePageContent(newContent)
}

function getContentForRoute(route) {
  return routeContentMap[route] || 'No content available'
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')
  const currentPath = document.location.pathname
  console.log('Current path:', currentPath)

  // Load content based on current route
  const content = getContentForRoute(currentPath)
  updatePageContent(content)

  // Set the initial state for the history API
  history.replaceState(content, '', currentPath)
})
