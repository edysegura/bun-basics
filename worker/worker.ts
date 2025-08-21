self.onmessage = (event: MessageEvent) => {
  console.log(`[worker.ts] ${event.data}`)
  postMessage('world')
}
