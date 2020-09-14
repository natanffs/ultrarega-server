import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'

interface externalUserI {
    codigo_usuario_externo: Number,
    codigo_usuario: Number,
    codigo_pivo: Number,
    data_inicial: Date,
    data_final: Date

}

class ExternalUserController {

    async index(req: Request, res: Response) {
        try {
            const externalUsers = await knex('usuarios_externos').select('*')
            return res.json(externalUsers)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const externalUserId = req.params.id
            const externalUser = await knex('usuarios_externos').select('*').where('codigo_usuario_externo', externalUserId).first()

            if (!externalUserId) return res.status(400).json({ message: 'Usuário externo existente na base de dados' })

            return res.json(externalUser)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const externalUser = req.body

            await knex('usuarios_externos').insert(externalUser)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const externalUserId = req.params.id
            const externalUserData = req.body
            
            
            const externalUser = await knex('usuarios_externos').where('codigo_usuario_externo', externalUserId).update(externalUserData)

            if (!externalUser) return res.status(400).json({ message: 'Fazenda não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const externalUserId = req.params.id
            const externalUser = await knex('usuarios_externos').where('codigo_usuario_externo', externalUserId).del()

            if (!externalUser) return res.status(400).json({ message: 'Usuário externo não existente na base de dados' })

            return res.json({ message: 'Usuário externo removido com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default ExternalUserController;