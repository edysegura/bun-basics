const worker = new Worker('./worker.ts')

worker.postMessage('hello')
worker.addEventListener('message', (event: MessageEvent<string>) => {
  console.log(`[main.ts] ${event.data}`)
  worker.terminate()
})
