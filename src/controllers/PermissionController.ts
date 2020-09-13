import { Request, Response } from 'express'
import knex from '../database/connection'

class PermissionController {
    async index(req: Request, res: Response) {
        try {
            //Listar todas as utrs cadastradas
            //Listar todas as utrs de um usuário
            const permissions = await knex('permissoes').select('*')

            return res.json(permissions)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const cod_permission = req.params.id
            const permission = await knex('permissoes').select('*').where('codigo_permissao', cod_permission).first()

            if (!permission) return res.status(400).json({ message: 'Permissão não existente na base de dados' })

            return res.json(permission)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            await knex('permissoes').insert(req.body)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const cod_permission = req.params.id

            const permission = await knex('permissoes').where('codigo_permissao', cod_permission).update(req.body)

            if (!permission) return res.status(400).json({ message: 'Permissão não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const cod_permission = req.params.id
            const permission = await knex('permissoes').where('codigo_permissao', cod_permission).del()

            if (!permission) return res.status(400).json({ message: 'Permissão não existente na base de dados' })

            return res.json({ message: 'Permissão removida com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }
}

export default PermissionController