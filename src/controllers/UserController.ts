import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'
import { permission } from 'src/routes'

interface userI {
    nome: string,
    email: string,
    senha: string,
    permissoes?: [number]
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
            const { param } = req.params

            const user = await knex('usuarios').select('*').where('codigo_usuario', userId).first()

            if (!user) return res.status(400).json({ message: 'Usuário não existente na base de dados' })
            user.senha = undefined

            if (param === 'permissions') {
                const permissions = await knex('permissoes')
                    .select('codigo_permissao')
                    .join('usuarios_has_permissoes', 'usuarios_has_permissoes.codigo_permissao', 'permissoes.id')
                    .where('usuarios_has_permissoes.codigo_usuario', userId)
                return res.json(permissions)
            }

            return res.json(user)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const { user, permissions } = req.body

            const hasUser = await knex('usuarios').select('email').where('email', user.email).first()

            if (hasUser) return res.status(400).json({ message: 'Email já existe na base de dados' })

            const hash = await bcrypt.hash(user.senha, 9)
            user.senha = hash

            const codigo_usuario = await knex('usuarios').insert(user).returning('codigo_usuario')

            for (var i = 0; i < permissions.length; i++) {
                await knex('usuarios_has_permissoes').insert({ codigo_usuario, codigo_permissao: permissions[i] })
            }

            // const result = await knex('usuarios').select('*').where('email', user.email).first()
            // sendMessage(null, 'new-insert', result)
            // console.log('aaaaaaaaaaaaa',result)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const userId = req.params.id
            const userData: userI = req.body

            // if(userData.senha) {
            //     const hash = await bcrypt.hash(userData.senha, 9)
            //     userData.senha = hash
            // }

            // if(userData.permissoes && userData.permissoes.length > 0) {
            //     try {
            //         userData.permissoes.forEach(async p => {
            //             let permissao = {
            //                 codigo_usuario: Number(userId),
            //                 codigo_permissao: Number(p)
            //             }
            //             console.log('codigooooooooooooooo', p)
            //             await knex('usuarios_has_permissoes').insert(permissao)
            //             // await knex.raw(`INSERT INTO usuarios_has_permissoes (codigo_usuario, codigo_permissao) VALUES (${userId}, ${p}`)
            //         })
            //     } catch (error) {
            //         console.log('Erro ao inserir permissões:', error)
            //     }
            //     userData.permissoes = undefined
            // }

            const user = await knex('usuarios').where('codigo_usuario', userId).update(userData)

            if (!user) return res.status(400).json({ message: 'Usuário não existente na base de dados' })

            // const result = await knex('usuarios').select('*').where('codigo_usuario', userId).first()
            // sendMessage(null, 'new-update', result)

            return res.json({ message: 'Dados atualizados com sucesso!' })
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