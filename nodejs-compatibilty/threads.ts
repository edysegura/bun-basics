import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} from 'node:worker_threads'

if (isMainThread) {
  const data = 'some data'
  const worker = new Worker(import.meta.filename, { workerData: data })
  worker.on('message', (msg: string) =>
    console.log(`Reply from Thread: ${msg}`),
  )
} else {
  const source = workerData
  parentPort?.postMessage(source.toUpperCase())
}

// bun threads.ts
// deno --allow-read threads.ts
// node --experimental-transform-types --no-warnings threads.ts
