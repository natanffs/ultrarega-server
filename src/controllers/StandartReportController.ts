/**
 * Controller de Padrões de relatórios, na qual contém os métodos:
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

interface standartReportI {
    codigo_padroes_relatorio: number,
    nome: String,
    prioridade: String,
    ordem: String,
    situacao: String,
}

class StandartReportController {

    async index(req: Request, res: Response) {
        try {
            const standartReports = await knex('padroes_relatorios').select('*')
            return res.json(standartReports)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const standartReportId = req.params.id
            const standartReport = await knex('padroes_relatorios').select('*').where('codigo_padroes_relatorio', standartReportId).first()

            if (!standartReportId) return res.status(400).json({ message: 'Padrão de relatório não existente na base de dados' })

            return res.json(standartReport)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const standartReport = req.body

            await knex('padroes_relatorios').insert(standartReport)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const standartReportId = req.params.id
            const standartReportData = req.body
            
            
            const standartReport = await knex('padroes_relatorios').where('codigo_padroes_relatorio', standartReportId).update(standartReportData)

            if (!standartReport) return res.status(400).json({ message: 'Padrão de relatório não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const standartReportId = req.params.id
            const standartReport = await knex('padroes_relatorios').where('codigo_padroes_relatorio', standartReportId).del()

            if (!standartReport) return res.status(400).json({ message: 'Padrão de relatório não existente na base de dados' })

            return res.json({ message: 'Padrão de relatório removido com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default StandartReportController;