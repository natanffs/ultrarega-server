/**
 * Controller de Fazendas, na qual contém os métodos:
 *  Index - Mostrar todos os dados,
 *  Show - Mostra um dado específico. Indice passado por meio de query params
 *  Store - Faz a inserção de dados
 *  Update - Responsável pela atualização de dados. Indice passado por meio de query params
 *  Delete - Remoção dos dados. Indice passado por meio de query params
 *  Ambos os métodos fazem uso do KNEX para inserção de dados, e em caso de sucesso ou erro retornam um JSON com uma mensagem ao Front End.
 */

import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'

interface farmI {
    codigo_fazenda: number,
    nome_fazenda: String,
    cnpj: String,
    inscricao_produtor: String,
    latitude: number,
    longitude: number,

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

    async getFarmByUserId(req: Request, res: Response) {
        try {
            const id = req.params.id
            const farms = await knex('fazendas')
                .join('fazendas_has_usuarios', 'fazendas_has_usuarios.codigo_fazenda', 'fazendas.codigo_fazenda')
                .select('fazendas.*')
                .where('fazendas_has_usuarios.codigo_usuario', id)

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
            const { farm, users } = req.body

            const codigo_fazenda = await knex('fazendas').insert(farm).returning('codigo_fazenda')

            if(users) {
                for (var i = 0; i < users.length; i++) {
                    await knex('fazendas_has_usuarios').insert({ codigo_fazenda, codigo_usuario: users[i] })
                }
            }

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const farmId = req.params.id
            let farmData = req.body

            if (farmData.codigo_usuarios) {
                try {
                    farmData.codigo_usuarios.forEach(async usr => {
                        let rel = {
                            codigo_fazenda: Number(farmId),
                            codigo_usuario: Number(usr),
                        }

                        await knex('fazendas_has_usuarios').insert(rel)
                        // await knex.raw(`INSERT INTO usuarios_has_permissoes (codigo_usuario, codigo_permissao) VALUES (${userId}, ${p}`)
                    })
                } catch (error) {
                    console.log('Erro ao inserir relacionamento:', error)
                }
                farmData.codigo_usuarios = undefined
            }

            const farm = await knex('fazendas').where('codigo_fazenda', farmId).update(farmData)

            if (!farm) return res.status(400).json({ message: 'Fazenda não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!' })

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