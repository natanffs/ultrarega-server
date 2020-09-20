import knex from '../database/connection'
import { sendMessage } from '../websocket'

class RoutineController {

    // async routine() {
    //     const pivot_data = await knex('usuario').select('*').where('id', 1).first()
    //     let tmp = pivot_data
    //     tmp.email = ` ${Math.random()}`
    //     sendMessage(null, 'pivot-update', pivot_data)
    // }

    // async utrMinuteRoutine() {
    //     const utrsCodes = await knex('utrs').select('codigo_utr').where('codigo_utr', 1) //está 1 porquÊ só tem uma utr de teste. em produção, tirar o where

    //     utrsCodes.map(async uc => {
    //         const utr_minute_data = await knex('utr_minutos_' + uc.codigo_utr).select('*').where('codigo_utr', uc.codigo_utr).orderBy('codigo_utr_minutos', "desc").first()
    //         sendMessage(null, `utr-update-${uc.codigo_utr}`, utr_minute_data)
    //     })
    // }

    async utrNowRoutineByUtr() {
        const utrsCodes = await knex('utrs').select('codigo_utr')

        const utr_datas = []

        for(var i=0; i<utrsCodes.length; i++) {
            const now = `utr_now_${utrsCodes[i].codigo_utr}`
            const config = `utr_config_${utrsCodes[i].codigo_utr}`
            const udata = await knex(now).join(config, `${config}.codigo_item`, `${now}.codigo_item`).select(`${now}.*`)
            utr_datas.push(udata)
        }

        console.log(utr_datas)
        sendMessage(null, 'utrs-updates', utr_datas)
    }
}

export default RoutineController