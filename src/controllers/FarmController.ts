import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'

interface farmI {
    codigo_fazenda: Number,
    nome_fazenda: String,
    cnpj: String,
    inscricao_produtor: String,
    latitude: Number,
    longitude: Number,

}

class FarmController {

    async index(req: Request, res: Response) {
        try {
            const farms = await knex('fazendas').select('*')
            return res.json(farms)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const farmId = req.params.id
            const farm = await knex('fazendas').select('*').where('codigo_fazenda', farmId).first()

            if (!farmId) return res.status(400).json({ message: 'Fazenda não existente na base de dados' })

            return res.json(farm)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const farm = req.body

            await knex('fazendas').insert(farm)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const farmId = req.params.id
            const farmData = req.body
            
            
            const farm = await knex('fazendas').where('codigo_fazenda', farmId).update(farmData)

            if (!farm) return res.status(400).json({ message: 'Fazenda não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const farmId = req.params.id
            const farm = await knex('fazendas').where('codigo_fazenda', farmId).del()

            if (!farm) return res.status(400).json({ message: 'Fazenda não existente na base de dados' })

            return res.json({ message: 'Fazenda removida com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default FarmController;