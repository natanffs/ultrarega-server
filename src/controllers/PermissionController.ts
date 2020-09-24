/**
 * Controller de Permissões, na qual contém os métodos:
 *  Index - Mostrar todos os dados,
 *  Show - Mostra um dado específico. Indice passado por meio de query params
 *  Store - Faz a inserção de dados
 *  Update - Responsável pela atualização de dados. Indice passado por meio de query params
 *  Delete - Remoção dos dados. Indice passado por meio de query params
 *  Ambos os métodos fazem uso do KNEX para inserção de dados, e em caso de sucesso ou erro retornam um JSON com uma mensagem ao Front End.
 */
import { Request, Response } from 'express'
import knex from '../database/connection'

class PermissionController {
    async index(req: Request, res: Response) {
        try {
            // const { byUser } = req.params
            //Listar todas as utrs cadastradas
            //Listar todas as utrs de um usuário
            // if(byUser) {
            //     console.log
            // }
            const permissions = await knex('permissoes').select('*')

            return res.json(permissions)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async byUser(req: Request, res: Response) {
        try {
            // const { byUser } = req.params
            //Listar todas as utrs cadastradas
            //Listar todas as utrs de um usuário
            // if(byUser) {
            //     console.log
            // }
            const permissions = await knex('permissoes').select('*').where('', '')

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