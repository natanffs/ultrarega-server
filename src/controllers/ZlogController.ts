import { Request, Response } from 'express'
import knex from '../database/connection'

class UtrController {
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
            const { descricao, codigo_pivo } = req.body

            let last_codigo_utr = 0
            const lastUtr = await knex('utrs').select('codigo_utr').orderBy('codigo_utr', 'desc').first()

            last_codigo_utr = lastUtr ? lastUtr.codigo_utr : 0

            let now = `utr_now_${last_codigo_utr + 1}`
            let minutos = `utr_minutos_${last_codigo_utr + 1}`
            
            const utr = {
                nome_utr_now: now,
                descricao,
                codigo_pivo
            }

            const result = await knex('utrs').insert(utr, 'codigo_utr')

<<<<<<< HEAD
                const arrayItens = `${Object.values(dadosModelUtr)}`;
            
                let vetItens = arrayItens.split(',')

                let insert_string = ''


                for(let i=0; i < vetItens.length; i++){
                    const infoModelUtr = await knex('modelo_utr')
                    .select('nome', 'tipo')
                    .where('codigo_item',vetItens[i])
                    
                    insert_string += `${JSON.stringify(infoModelUtr)},`
                    insert_string = string.replace(, 
                }  


                
                return res.json({dadosModelUtr,insert_string, arrayItens, vetItens})
=======
            if (result) {

                //const id = knex('utrs').select('codigo_utr').where('codigo_pivo', codigo_pivo).where('descricao', descricao).orderBy('codigo_utr', 'desc')

                const utr_now_fields_ids: number[] = req.body.codigo_itens
                let create_string = ` ( codigo_utr_now INT NOT NULL AUTO_INCREMENT PRIMARY KEY, codigo_utr INT, `

                for (var i = 0; i < utr_now_fields_ids.length; i++) {
                    const result = await knex('modelo_utr').select('nome', 'tipo').where('codigo_item', utr_now_fields_ids[i]).first()
                    
                    if (result) {
                        create_string += `${result.nome} ${result.tipo}, `
                    }    
                }

                create_string = create_string.substring(0, create_string.length - 2)
                create_string += ' )'
>>>>>>> 44382a1eda7c1785f65fc5ff771ed7d2a3045ca2

                await knex.raw(`CREATE TABLE ${now} ${create_string}`)
                
                await knex(`${now}`).insert({ codigo_utr: result })
                await knex.raw(`CREATE TABLE ${minutos} ${create_string}`)
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