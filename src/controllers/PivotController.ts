/**
 * Controller de Pivos, na qual contém os métodos:
 *  Index - Mostrar todos os dados,
 *  Show - Mostra um dado específico. Indice passado por meio de query params
 *  Store - Faz a inserção de dados
 *  Update - Responsável pela atualização de dados. Indice passado por meio de query params
 *  Delete - Remoção dos dados. Indice passado por meio de query params
 *  Ambos os métodos fazem uso do KNEX para inserção de dados, e em caso de sucesso ou erro retornam um JSON com uma mensagem ao Front End.
 */
import { Request, Response } from 'express'
import knex from '../database/connection'

class PivotController {
    async index(req: Request, res: Response) {
        try {
            //Listar todas as Pivots cadastradas
            //Listar todas as Pivots de um usuário
            const pivots = await knex('pivos').join('fazendas', 'fazendas.codigo_fazenda', 'pivos.codigo_fazenda').select('pivos.*', 'fazendas.nome_fazenda')

            return res.json(pivots)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const cod_pivot = req.params.id
            const pivot = await knex('pivos').join('fazendas', 'fazendas.codigo_fazenda', 'pivos.codigo_fazenda').select('pivos.*', 'fazendas.nome_fazenda').where('codigo_pivo', cod_pivot).first()

            if (!pivot) return res.status(400).json({ message: 'Pivô não existente na base de dados' })

            return res.json(pivot)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const pivot = req.body

            await knex('pivos').insert(pivot)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }
    
    async update(req: Request, res: Response) {
        try {
            const cod_pivot = req.params.id

            const pivot = await knex('pivos').where('codigo_pivo', cod_pivot).update(req.body)

            if (!pivot) return res.status(400).json({ message: 'Pivô não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const cod_pivot = req.params.id
            const pivot = await knex('pivos').where('codigo_pivo', cod_pivot).del()

            if (!pivot) return res.status(400).json({ message: 'Usuário não existente na base de dados' })

            return res.json({ message: 'Pivô removido com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }
}

export default PivotController