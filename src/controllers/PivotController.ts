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

            return res.json({ message: 'Usuário removido com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }
}

export default PivotController