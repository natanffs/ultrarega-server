import { Request, Response } from 'express'
import knex from '../database/connection'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class AuthController {

    async login(req: Request, res: Response) {
        try {
            if (!req.body.email || !req.body.password) return res.status(400).json({ message: 'Usuário ou senha não informados' })

            const user = await knex('usuarios').select('*').where({ email: req.body.email }).first()

            if (!user || !await bcrypt.compare(req.body.password, user.senha)) return res.status(400).json({ message: 'Usuário ou senha incorretos' })

            const permissions = await knex('permissoes')
                                                        .select('permissoes.*')
                                                        .join('usuarios_has_permissoes', 'usuarios_has_permissoes.codigo_permissao', 'permissoes.id')
                                                        .where('usuarios_has_permissoes.codigo_usuario', user.codigo_usuario )
                                                        .groupBy('permissoes.id')

            user.senha = undefined
            user.permissoes = permissions[0]
            console.log(permissions)

            const token: string = jwt.sign({ id: user.id }, process.env.SECRET || 'beterraba-vermelha')

            return res.header('Authorization', `Bearer ${token}`).json({ user: user.codigo_usuario, token, permissions })
        } catch (error) {
            console.log(error)
        }
    }
}

export default AuthController