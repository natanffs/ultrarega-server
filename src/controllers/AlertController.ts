/**
 * Controller de Alertas, na qual contém os métodos:
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

interface alertI {
    codigo_alerta: number,
    nome: String,
    situacao_alerta: String,
}

class AlertController {

    async index(req: Request, res: Response) {
        try {
            const alerts = await knex('alertas').select('*')
            return res.json(alerts)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const alertId = req.params.id
            const alert = await knex('alertas').select('*').where('codigo_alerta', alertId).first()

            if (!alertId) return res.status(400).json({ message: 'Alerta não existente na base de dados' })

            return res.json(alert)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const alert = req.body

            await knex('alertas').insert(alert)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const alertId = req.params.id
            const alertData = req.body
            
            
            const alert = await knex('alertas').where('codigo_alerta', alertId).update(alertData)

            if (!alert) return res.status(400).json({ message: 'Alerta não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const alertId = req.params.id
            const alert = await knex('alertas').where('codigo_alerta', alertId).del()

            if (!alert) return res.status(400).json({ message: 'Alerta não existente na base de dados' })

            return res.json({ message: 'Alerta removido com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default AlertController;