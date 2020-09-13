import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'
import { alert } from 'src/routes'

interface farmHasUtrI {
    codigo_utr_fazenda: Number,
    codigo_fazenda: Number,
    codigo_utr: Number

}

class FarmHasUtrController {

    async index(req: Request, res: Response) {
        try {
            const farmHasUtr = await knex('fazendas_utrs').select('*')
            return res.json(farmHasUtr)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const farmHasUtrId = req.params.id            
            const farmHasUtr = await knex('fazendas_utrs').select('*').where('codigo_utr_fazenda', farmHasUtrId).first()

            if (!farmHasUtr) return res.status(400).json({ message: 'UTR por Fazenda não existente na base de dados' })

            return res.json(farmHasUtr)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const farmHasUtr = req.body

            await knex('fazendas_utrs').insert(farmHasUtr)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const farmHasUtrId = req.params.id
            const farmHasUtrData = req.body
            
            
            const farmHasUtr = await knex('fazendas_utrs').where('codigo_utr_fazenda', farmHasUtrId).update(farmHasUtrData)

            if (!farmHasUtr) return res.status(400).json({ message: 'UTR por Fazenda não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const farmHasUtrId = req.params.id
            const farmHasUtr = await knex('fazendas_utrs').where('codigo_utr_fazenda', farmHasUtrId).del()

            if (!farmHasUtr) return res.status(400).json({ message: 'UTR por Fazenda não existente na base de dados' })

            return res.json({ message: 'Associação de Fazenda e UTR removida com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default FarmHasUtrController;