import { Request, Response } from 'express'
import knex from '../database/connection'

class UtrController {
    async index(req: Request, res: Response) {
        try {
            //Listar todas as utrs cadastradas
            //Listar todas as utrs de um usuário
            const utrs = await knex('utrs').select('*')

            return res.json(utrs)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const cod_utr = req.params.id
            const utr = await knex('utrs').select('*').where('codigo_utr', cod_utr).first()

            if (!utr) return res.status(400).json({ message: 'UTR não existente na base de dados' })

            return res.json(utr)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const utr = req.body
            let last_codigo_utr = 0
            const lastUtr = await knex('utrs').select('codigo_utr').orderBy('codigo_utr', 'desc').first()
            
            last_codigo_utr = lastUtr ? lastUtr.codigo_utr : 0 

            let name = `UTR_NOW_${last_codigo_utr + 1}`
            utr.nome_utr_now = name

            const result = await knex('utrs').insert(utr)

            if(result) {
                //após a inserção der certo, temos que fazer um create table com o nome_utr_now
                //e todas as linhas que acabaram de ser cadastradas aqui
                //viram colunas na utr_now
                //1 - fazer uma consulta no banco pra trazer a utr que acabou de ser inserida aqui,
                //eu acho que o knex não retorna o objeto recem inserido, ele retorna um valor se deu certo ou não
                //2 - pegar cada campo do retorno dessa utr recem inserida e criar como coluna no CREATE TABLE que vamos
                //fazer aqui dentro desse método
                //3 - se a criação der certo, realizar um insert com todos os campos nulos, ou default
                //essa linha será uma só para sempre, ou seja, o aparelho sempre fará um update desses valores
                //utilizando o id 1 dessa tabela utr_now_n
            }

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

export default UtrController