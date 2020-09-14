import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'

interface configUtrI {
    codigo_utr_now_configuracao: Number,
    codigo_item: Number,
    codigo_utr: Number,
    usa_minuto: Number,
   
}

class ConfigUtrController {

    async index(req: Request, res: Response) {
        try {
            const configUtr = await knex('utr_now_configuracoes_dados').select('*')
            return res.json(configUtr)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const configUtrId = req.params.id
            const configUtr = await knex('utr_now_configuracoes_dados').select('*').where('codigo_utr_now_configuracao', configUtrId).first()

            if (!configUtrId) return res.status(400).json({ message: 'Configuração UTR não existente na base de dados' })

            return res.json(configUtr)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const configUtr = req.body

            await knex('utr_now_configuracoes_dados').insert(configUtr)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const configUtrId = req.params.id
            const configUtrData = req.body
            
            
            const configUtr = await knex('utr_now_configuracoes_dados').where('codigo_utr_now_configuracao', configUtrId).update(configUtrData)

            if (!configUtr) return res.status(400).json({ message: 'Configuração UTR não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const configUtrId = req.params.id
            const configUtr = await knex('utr_now_configuracoes_dados').where('codigo_utr_now_configuracao', configUtrId).del()

            if (!configUtr) return res.status(400).json({ message: 'Configuração UTR não existente na base de dados' })

            return res.json({ message: 'Configuração UTR removido com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default ConfigUtrController;