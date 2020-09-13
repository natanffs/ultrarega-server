import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'
import { alert } from 'src/routes'

interface farmHasUserI {
    codigo_fazenda_usuario: Number,
    codigo_fazenda: Number,
    codigo_usuario: Number

}

class FarmHasUserController {

    async index(req: Request, res: Response) {
        try {
            const farmsHasUsers = await knex('fazendas_has_usuarios').select('*')
            return res.json(farmsHasUsers)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const farmHasUserId = req.params.id            
            const farmHasUser = await knex('fazendas_has_usuarios').select('*').where('codigo_fazenda_usuario', farmHasUserId).first()

            if (!farmHasUser) return res.status(400).json({ message: 'Fazenda por usuário não existente na base de dados' })

            return res.json(farmHasUser)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const farmHasUser = req.body

            await knex('fazendas_has_usuarios').insert(farmHasUser)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const farmHasUserId = req.params.id
            const farmHasUserData = req.body
            
            
            const farmHasUser = await knex('fazendas_has_usuarios').where('codigo_fazenda_usuario', farmHasUserId).update(farmHasUserData)

            if (!farmHasUser) return res.status(400).json({ message: 'Fazenda não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const farmHasUserId = req.params.id
            const farmHasUser = await knex('fazendas_has_usuarios').where('codigo_fazenda_usuario', farmHasUserId).del()

            if (!farmHasUser) return res.status(400).json({ message: 'Fazenda por usuário não existente na base de dados' })

            return res.json({ message: 'Associação de Fazenda e Usuário removida com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default FarmHasUserController;