import { Request, Response } from 'express'
import knex from '../database/connection'

class ZlogController {
    async index(req: Request, res: Response) {
        try {
            //Listar todas as utrs cadastradas
            //Listar todas as utrs de um usuário
            //const utrs = await knex('utrs').select('*')

            const utrs = await knex('utrs')
                .join('pivos', 'pivos.codigo_pivo', 'utrs.codigo_pivo')
                .join('fazendas', 'fazendas.codigo_fazenda', 'pivos.codigo_fazenda')
                .select('utrs.*', 'fazendas.nome_fazenda');

            return res.json(utrs)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const cod_utr = req.params.id

            const utr = await knex('utrs')
                .join('pivos', 'pivos.codigo_pivo', 'utrs.codigo_pivo')
                .join('fazendas', 'fazendas.codigo_fazenda', 'pivos.codigo_fazenda')
                .select('utrs.*', 'fazendas.nome_fazenda').where('codigo_utr', cod_utr).first()

            if (!utr) return res.status(400).json({ message: 'UTR não existente na base de dados' })

            return res.json(utr)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const log = req.body

        
            await knex('ZLOG').insert(log, 'codigo_utr')

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const cod_utr = req.params.id

            const utr = await knex('utrs').where('codigo_utr', cod_utr).update(req.body)

            if (!utr) return res.status(400).json({ message: 'UTR não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const cod_utr = req.params.id
            const utr = await knex('utrs').where('codigo_utr', cod_utr).del()

            if (!utr) return res.status(400).json({ message: 'UTR não existente na base de dados' })

            return res.json({ message: 'UTR removido com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }
}

export default ZlogController