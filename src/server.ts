import { App } from './App'
import Routine from './controllers/RoutineController'

async function start() {
    const app = new App()
    await app.listen(3000)
    const routine = new Routine()

    // setInterval(() => {
    //     routine.utrMinuteRoutine()
    // }, 1000)
}

start()