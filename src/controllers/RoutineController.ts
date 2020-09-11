import knex from '../database/connection'
import { sendMessage } from '../websocket'

class RoutineController {
    
    async routine() { 
        const pivot_data = await knex('usuario').select('*').where('id', 1).first()
        let tmp = pivot_data
        tmp.email = ` ${Math.random()}`
        sendMessage(null, 'pivot-update', pivot_data)
    }
}

export default RoutineController