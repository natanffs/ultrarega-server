import { App } from './App'
import Routine from './controllers/RoutineController'

async function start() {
    const app = new App()
    await app.listen(3000)
    const routine = new Routine()

    /** Função que monitora o banco de dados e envia para o front end a cada 60 segundos */
    // setInterval(() => {
    //     routine.utrNowRoutineByUtr()
    // }, 60000)
}

start()