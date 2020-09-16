import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'

interface criticalEventI {
    codigo_evento: number,
    descricao: String,
    data_evento: Date,
}

class CriticalEventController {

    async index(req: Request, res: Response) {
        try {
            const criticalEvents = await knex('eventos_criticos').select('*')
            return res.json(criticalEvents)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const criticalEventId = req.params.id
            const criticalEvent = await knex('eventos_criticos').select('*').where('codigo_evento', criticalEventId).first()

            if (!criticalEventId) return res.status(400).json({ message: 'Evento crítico não existente na base de dados' })

            return res.json(criticalEvent)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const criticalEvent = req.body

            await knex('eventos_criticos').insert(criticalEvent)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const criticalEventId = req.params.id
            const criticalEventData = req.body
            
            
            const criticalEvent = await knex('eventos_criticos').where('codigo_evento', criticalEventId).update(criticalEventData)

            if (!criticalEvent) return res.status(400).json({ message: 'Evento crítico não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const criticalEventId = req.params.id
            const criticalEvent = await knex('eventos_criticos').where('codigo_evento', criticalEventId).del()

            if (!criticalEvent) return res.status(400).json({ message: 'Evento crítico não existente na base de dados' })

            return res.json({ message: 'Evento crítico removido com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default CriticalEventController;