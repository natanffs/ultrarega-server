import { App } from './App'

async function start() {
    const app = new App()
    await app.listen(3000)
}

start()