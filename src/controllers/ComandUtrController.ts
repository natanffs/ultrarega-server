import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'

interface comandUtrI {
    codigo_utr_comandos: number,
    codigo_utr: number,
    data_hora: Date,
    comando_sentido: String,
    comando_booster: String,
    comando_injetora: String,
    comando_ligar_desligar: String,
    comando_ligar_sem_agua: String,

}

class ComandUtrController {

    async index(req: Request, res: Response) {
        try {
            const comandUtr = await knex('utr_now_comandos_001').select('*')
            return res.json(comandUtr)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const comandUtrId = req.params.id
            const comandUtr = await knex('utr_now_comandos_001').select('*').where('codigo_utr_comandos', comandUtrId).first()

            if (!comandUtrId) return res.status(400).json({ message: 'Comando UTR não existente na base de dados' })

            return res.json(comandUtr)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const comandUtr = req.body

            await knex('utr_now_comandos_001').insert(comandUtr)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const comandUtrId = req.params.id
            const comandUtrData = req.body
            
            
            const comandUtr = await knex('utr_now_comandos_001').where('codigo_utr_comandos', comandUtrId).update(comandUtrData)

            if (!comandUtr) return res.status(400).json({ message: 'Comando UTR não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const comandUtrId = req.params.id
            const comandUtr = await knex('utr_now_comandos_001').where('codigo_utr_comandos', comandUtrId).del()

            if (!comandUtr) return res.status(400).json({ message: 'Comando UTR não existente na base de dados' })

            return res.json({ message: 'Comando UTR removido com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default ComandUtrController;