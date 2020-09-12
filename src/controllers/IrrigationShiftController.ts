import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'

interface irrigationShiftI {
    codigo_turnos_rega: Number,
    ligar: String,
    percetimetro: Number,
    situacao: String,
    inicio: String,
    termino: String,
    data_inicio_rega: Date,
    data_termino_rega: Date,
    ciclo: String
}

class IrrigationShiftController {

    async index(req: Request, res: Response) {
        try {
            const irrigationShifts = await knex('turnos_regas').select('*')
            return res.json(irrigationShifts)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const irrigationShiftId = req.params.id
            const irrigationShift = await knex('turnos_regas').select('*').where('codigo_turnos_rega', irrigationShiftId).first()

            if (!irrigationShiftId) return res.status(400).json({ message: 'Turno de rega não existente na base de dados' })

            return res.json(irrigationShift)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const irrigationShift = req.body

            await knex('turnos_regas').insert(irrigationShift)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const irrigationShiftId = req.params.id
            const irrigationShiftData = req.body
            
            
            const irrigationShift = await knex('turnos_regas').where('codigo_turnos_rega', irrigationShiftId).update(irrigationShiftData)

            if (!irrigationShift) return res.status(400).json({ message: 'Turno de rega não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const irrigationShiftId = req.params.id
            const irrigationShift = await knex('turnos_regas').where('codigo_turnos_rega', irrigationShiftId).del()

            if (!irrigationShift) return res.status(400).json({ message: 'Turno de rega não existente na base de dados' })

            return res.json({ message: 'Turno de rega removido com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default IrrigationShiftController;