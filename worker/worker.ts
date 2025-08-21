self.onmessage = (event: MessageEvent) => {
  console.log(event.data)
  postMessage('world')
}
