import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'

interface userI {
    id: Number,
    nome: String,
    email: String,
    senha: String,
    permissoes: [Number]
}

class UserController {

    async index(req: Request, res: Response) {
        try {
            const users = await knex('usuarios').select('*')

            users.map(u => {
                u.senha = undefined
            })

            return res.json(users)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const userId = req.params.id
            const user = await knex('usuarios').select('*').where('codigo_usuario', userId).first()

            if (!user) return res.status(400).json({ message: 'Usuário não existente na base de dados' })

            user.senha = undefined

            return res.json(user)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const user: userI = req.body

            const hasUser = await knex('usuarios').select('email').where('email', user.email).first()

            if (hasUser) return res.status(400).json({ message: 'Email já existe na base de dados' })

            const hash = await bcrypt.hash(user.senha, 9)
            user.senha = hash

            await knex('usuarios').insert(user)

            const result = await knex('usuarios').select('*').where('email', user.email).first()
            sendMessage(null, 'new-insert', result)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const userId = req.params.id
            const userData = req.body
            
            if(userData.senha) {
                const hash = await bcrypt.hash(userData.senha, 9)
                userData.senha = hash
            }
            const user = await knex('usuarios').where('codigo_usuario', userId).update(userData)

            if (!user) return res.status(400).json({ message: 'Usuário não existente na base de dados' })

            const result = await knex('usuarios').select('*').where('codigo_usuario', userId).first()
            sendMessage(null, 'new-update', result)

            return res.json({ message: 'Dados atualizados com sucesso!', result })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userId = req.params.id
            const user = await knex('usuarios').where('codigo_usuario', userId).del()

            if (!user) return res.status(400).json({ message: 'Usuário não existente na base de dados' })

            return res.json({ message: 'Usuário removido com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default UserController