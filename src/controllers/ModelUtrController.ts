import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'

interface modelUtrI {
    codigo_modelo_utr: number,
    nome: string,
    tipo: string,
    visivel: string,
    fator_multiplicador: number,
    unidade_medida: number,

}

class ModelUtrController {

    async index(req: Request, res: Response) {
        try {
            const modelUtr = await knex('modelo_utr').select('*')
            return res.json(modelUtr)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const modelUtrId = req.params.id
            const farm = await knex('modelo_utr').select('*').where('codigo_item', modelUtrId).first()

            return res.json(farm)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const modelUtr = req.body

            await knex('modelo_utr').insert(modelUtr)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const modeUtrId = req.params.id
            const modeUtrData = req.body
            
            
            const farm = await knex('modelo_utr').where('codigo_item', modeUtrId).update(modeUtrData)

            if (!farm) return res.status(400).json({ message: 'Modelo UTR não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const modeUtrId = req.params.id
            const modelUtr = await knex('modelo_utr').where('codigo_item', modeUtrId).del()

            if (!modelUtr) return res.status(400).json({ message: 'Modelo UTR não existente na base de dados' })

            return res.json({ message: 'Modelo UTR removido com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default ModelUtrController;