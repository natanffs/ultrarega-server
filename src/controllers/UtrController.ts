import { Request, Response } from 'express'
import knex from '../database/connection'

interface modeloUtrI {
    codigo_item: number
    nome: string
    tipo: string
    visivel: string
    fator_multiplicador: string
    unidade_medida: string
}

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
                const now = `utr_now_${codigo_utr}`
                const utr = await knex('utrs')
                    .join('pivos', 'pivos.codigo_pivo', 'utrs.codigo_pivo')
                    .join('fazendas', 'fazendas.codigo_fazenda', 'pivos.codigo_fazenda')
                    .join('turnos_regas', 'turnos_regas.codigo_utr', 'utrs.codigo_utr')
                    .select(
                        'utrs.*',
                        'fazendas.nome_fazenda',
                        'pivos.nome_pivo',
                        `turnos_regas.*`
                    ).where('utrs.codigo_utr', codigo_utr).first()

                const calcs = await knex(calc).select('nome', 'unidade_medida', 'valor').where('codigo_utr', codigo_utr)
                const nows = await knex(now).select('nome', 'fator_multiplicador', 'unidade_medida', 'valor')

                let tmp = { ...utr, calcs, nows }

                console.log(tmp)
                utrs.push(tmp)
            }

            return res.json(utrs)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async byUser(req: Request, res: Response) {
        try {
            //Listar todas as utrs cadastradas
            //Listar todas as utrs de um usuário
            const cods = await knex('utrs')
                .join('pivos', 'pivos.codigo_pivo', 'utrs.codigo_pivo')
                .join('fazendas_has_usuarios', 'fazendas_has_usuarios.codigo_fazenda', 'pivos.codigo_fazenda')
                .where('fazendas_has_usuarios.codigo_usuario', req.params.id)
                .groupBy('utrs.codigo_utr')
                .select('codigo_utr')
            let utrs = []

            for (let i = 0; i < cods.length; i++) {
                const codigo_utr = cods[i].codigo_utr
                const calc = `utr_now_calc_${codigo_utr}`
                const now = `utr_now_${codigo_utr}`
                const utr = await knex('utrs')
                    .join('pivos', 'pivos.codigo_pivo', 'utrs.codigo_pivo')
                    .join('fazendas', 'fazendas.codigo_fazenda', 'pivos.codigo_fazenda')
                    .join('turnos_regas', 'turnos_regas.codigo_utr', 'utrs.codigo_utr')
                    .select(
                        'utrs.*',
                        'fazendas.nome_fazenda',
                        'pivos.nome_pivo',
                        `turnos_regas.*`
                    ).where('utrs.codigo_utr', codigo_utr).first()

                const calcs = await knex(calc).select('nome', 'unidade_medida', 'valor').where('codigo_utr', codigo_utr)
                const nows = await knex(now).select('nome', 'fator_multiplicador', 'unidade_medida', 'valor')

                let tmp = utr
                tmp = { ...tmp, calcs, nows }

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

            const now = `utr_now_${cod_utr}`
            const config = `utr_config_${cod_utr}`
            const utr_now_data = await knex(now).join(config, `${config}.codigo_item`, `${now}.codigo_item`).select(`${now}.*`)

            return res.json(utr_now_data)
        } catch (error) {
            console.log(error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const { descricao, codigo_pivo, itens_visiveis } = req.body

            let last_codigo_utr = 0
            const lastUtr = await knex('utrs').select('codigo_utr').orderBy('codigo_utr', 'desc').first()

            last_codigo_utr = lastUtr ? lastUtr.codigo_utr : 0

            let now = `utr_now_${last_codigo_utr + 1}`
            let config = `utr_config_${last_codigo_utr + 1}`
            let calc = `utr_now_calc_${last_codigo_utr + 1}`
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

                let items: modeloUtrI[] = []

                for (var i = 0; i < utr_now_fields_ids.length; i++) {
                    const result = await knex('modelo_utr').select('codigo_item', 'nome', 'tipo', 'visivel', 'fator_multiplicador', 'unidade_medida').where('codigo_item', utr_now_fields_ids[i]).first()

                    if (result) {
                        create_string += `${result.nome} ${result.tipo}, `
                        items.push(result)
                    }
                }

                create_string = create_string.substring(0, create_string.length - 2)
                create_string += ' )'

                await knex.raw(`CREATE TABLE ${minutos} ${create_string}`)

                await knex.raw(`CREATE TABLE ${now} (
                    codigo_item INT NOT NULL PRIMARY KEY,
                    
                    nome varchar(255),
                    tipo varchar(255),
                    visivel varchar(255),
                    fator_multiplicador varchar(255),
                    unidade_medida varchar(255),
                    valor varchar(255),
                    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
                )`)

                const codigo_utr = last_codigo_utr + 1
                //items.push(codigo_utr)

                for (var i = 0; i < items.length; i++) {
                    await knex(now).insert(items[i])
                }
                await knex.raw(`INSERT INTO ${now} (nome, tipo, valor) VALUES ("codigo_utr", "INT", ${codigo_utr})`)

                await knex.raw(`CREATE TABLE ${config} (
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    codigo_utr INT,
                    codigo_item INT
                )`)

                for (var i = 0; i < itens_visiveis.length; i++) {
                    await knex(config).insert({ codigo_utr: last_codigo_utr + 1, codigo_item: itens_visiveis[i] })
                }

                await knex.raw(`CREATE TABLE ${calc} (
                    codigo_utr_now_calc int primary key auto_increment,
                    nome varchar(255),
                    valor double,
                    formula varchar(255),
                    origem varchar(255),
                    destino varchar(255),
                    unidade_medida varchar(255),
                    codigo_utr int,
                    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
                )`)

                let triggerString = "CREATE DEFINER= CURRENT_USER TRIGGER "
                triggerString += "`ultra572_rega`.`utr_now_" + codigo_utr + "_AFTER_UPDATE` AFTER UPDATE ON `utr_now_" + codigo_utr + "` FOR EACH ROW BEGIN "
                triggerString += `SELECT valor INTO @valorCodigoUtr from ${now} where nome = 'codigo_utr'; `
                triggerString += `SELECT u.codigo_utr INTO @codigoUtr FROM utrs u where codigo_utr = @valorCodigoUtr; `
                for (var i = 0; i < items.length; i++) {
                    triggerString += `if(old.nome = '${items[i].nome}' AND ((old.valor <> new.valor) OR (old.valor IS NULL))) then INSERT INTO ultra572_rega.${minutos}(codigo_utr, ${items[i].nome}, data_hora) VALUES(@codigoUtr, NEW.valor, CURRENT_TIMESTAMP); end if; `
                }

                triggerString += 'END'

                await knex.raw(triggerString)
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