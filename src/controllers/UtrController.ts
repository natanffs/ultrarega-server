import { Request, Response } from 'express'
import knex from '../database/connection'

class UtrController {
    async index(req: Request, res: Response) {
        try {
            //Listar todas as utrs cadastradas
            //Listar todas as utrs de um usuário
            const cods = await knex('utrs').select('codigo_utr')
            let utrs = []

            for (let i = 0; i < cods.length; i++) {
                const codigo_utr = cods[i].codigo_utr
                const calc = `utr_now_calc_${codigo_utr}`
                const minutos = `utr_minutos_${codigo_utr}`
                const utr = await knex('utrs')
                    .join('pivos', 'pivos.codigo_pivo', 'utrs.codigo_pivo')
                    .join('fazendas', 'fazendas.codigo_fazenda', 'pivos.codigo_fazenda')
                    .join(calc, `${calc}.codigo_utr`, 'utrs.codigo_utr')
                    .join('turnos_regas', 'turnos_regas.codigo_utr', 'utrs.codigo_utr')
                    .join(minutos, `${minutos}.codigo_utr`, 'utrs.codigo_utr')
                    .select(
                        'utrs.*',
                        'fazendas.nome_fazenda',
                        'pivos.nome_pivo',
                        `${calc}.codigo_utr`,
                        `turnos_regas.*`,
                        `${minutos}.posicao_angular`,
                        `${minutos}.informacao_sentido`,
                    ).where('utrs.codigo_utr', codigo_utr).first()

                const calcs = await knex(calc).select('nome', 'valor', 'unidade_medida').where('codigo_utr', codigo_utr)
                let tmp = utr
                tmp = {...tmp, calcs}
                console.log(tmp)
                utrs.push(tmp)
            }

            return res.json(utrs)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const cod_utr = req.params.id
            const calc = `utr_now_calc_${cod_utr}`
            const utr = await knex('utrs')
                .join('pivos', 'pivos.codigo_pivo', 'utrs.codigo_pivo')
                .join('fazendas', 'fazendas.codigo_fazenda', 'pivos.codigo_fazenda')
                .join(calc, `${calc}.codigo_utr`, 'utrs.codigo_utr')
                .join('turnos_regas', 'turnos_regas.codigo_utr', 'utrs.codigo_utr')
                .select(
                    'utrs.*',
                    'fazendas.nome_fazenda',
                    'pivos.nome_pivo',
                    `${calc}.codigo_utr`,
                    `turnos_regas.*`
                ).where('utrs.codigo_utr', cod_utr).first()

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