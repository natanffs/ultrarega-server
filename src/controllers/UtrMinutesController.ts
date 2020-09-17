import { Request, Response } from 'express'
import knex from '../database/connection'

class UtrController {
    async show(req: Request, res: Response) {
        try {
            const cod_utr = req.params.id
            const utr = await knex('utr_minutos_' + cod_utr).select('*').where('codigo_utr', cod_utr).first()

            if (!utr) return res.status(400).json({ message: 'UTR não existente na base de dados' })

            return res.json(utr)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }
}

export default UtrController