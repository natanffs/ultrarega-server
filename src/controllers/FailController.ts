import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'

interface failI {
    codigo_falha: Number,
    descricao: String,
}

class FailController {

    async index(req: Request, res: Response) {
        try {
            const fails = await knex('falhas').select('*')
            return res.json(fails)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const failId = req.params.id
            const fail = await knex('falhas').select('*').where('codigo_falha', failId).first()

            if (!failId) return res.status(400).json({ message: 'Falha não existente na base de dados' })

            return res.json(fail)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const fail = req.body

            await knex('falhas').insert(fail)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const failId = req.params.id
            const failData = req.body
            
            
            const fail = await knex('falhas').where('codigo_falha', failId).update(failData)

            if (!fail) return res.status(400).json({ message: 'Falha não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const failId = req.params.id
            const fail = await knex('falhas').where('codigo_falha', failId).del()

            if (!fail) return res.status(400).json({ message: 'Falha não existente na base de dados' })

            return res.json({ message: 'Falha removida com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default FailController;