self.addEventListener('message', (event: MessageEvent<string>) => {
  console.log(`[worker.ts] ${event.data}`)
  self.postMessage('world')
})
