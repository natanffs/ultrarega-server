import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'

interface alertI {
    codigo_alerta: number,
    nome: String,
    situacao_alerta: String,
}

class TurnoRegaController {

    async index(req: Request, res: Response) {
        try {
            const alerts = await knex('turnos_regas').select('*')
            return res.json(alerts)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const id = req.params.id
            const alert = await knex('turnos_regas').select('*').where('codigo_utr', id).first()

            if (!id) return res.status(400).json({ message: 'Alerta não existente na base de dados' })

            return res.json(alert)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const id = req.params.id
            const turnos_rega = req.body
            const data = {...turnos_rega, codigo_utr: id}

            await knex('turnos_regas').insert(data)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id
            const turno_rega = req.body
            
            
            const alert = await knex('turnos_regas').where('codigo_turnos_rega', id).update(turno_rega)

            if (!alert) return res.status(400).json({ message: 'Alerta não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const alertId = req.params.id
            const alert = await knex('turnos_regas').where('codigo_turnos_rega', alertId).del()

            if (!alert) return res.status(400).json({ message: 'Alerta não existente na base de dados' })

            return res.json({ message: 'Alerta removido com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default TurnoRegaController;