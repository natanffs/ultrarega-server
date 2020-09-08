import { Request, Response } from 'express'
import knex from '../database/connection'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class AuthController {
    
    async login(req: Request, res: Response) { 
        if (!req.body.email || !req.body.password) return res.status(400).json({ message: 'Usuário ou senha não informados' })

        const user = await knex('usuario').select('*').where({ email: req.body.email }).first()
        
        if (!user || !await bcrypt.compare(req.body.password, user.senha)) return res.status(400).json({ message: 'Usuário ou senha incorretos' })

        const permissions = await knex
        .raw('select permissoes.idPermissao, permissoes.descricao FROM permissoes join usuario_has_permissoes on usuario_has_permissoes.idPermissao = permissoes.idPermissao where usuario_has_permissoes.idUsuario = ' + user.id)
        
        user.senha = undefined
        user.permissoes = permissions[0]
        
        const token: string = jwt.sign({ id: user.id, permissions: permissions[0] }, process.env.SECRET || 'beterraba-vermelha', { expiresIn: 86400 })

        return res.header('Authorization', `Bearer ${token}`).json({user, token})
    }
}

export default AuthController