import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'

interface pivotAltimetryI {
    codigo_altimetria: number,
    angulo: number,
    altura : number,
    latitude: number,
    longitude: number,
    codigo_pivot: number
}

class PivotAltimetryController {

    async index(req: Request, res: Response) {
        try {
            const pivotAltimetrys = await knex('altimetria_pivos').select('*')
            return res.json(pivotAltimetrys)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const pivotAltimetryId = req.params.id
            const pivotAltimetry = await knex('altimetria_pivos').select('*').where('codigo_altimetria', pivotAltimetryId).first()

            if (!pivotAltimetryId) return res.status(400).json({ message: 'Altimetria Pivô não existente na base de dados' })

            return res.json(pivotAltimetry)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const pivotAltimetry = req.body

            await knex('altimetria_pivos').insert(pivotAltimetry)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const pivotAltimetryId = req.params.id
            const pivotAltimetryData = req.body
            
            
            const pivotAltimetry = await knex('altimetria_pivos').where('codigo_altimetria', pivotAltimetryId).update(pivotAltimetryData)

            if (!pivotAltimetry) return res.status(400).json({ message: 'Altimetria Pivô não existente na base de dados' })

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const pivotAltimetryId = req.params.id
            const pivotAltimetry = await knex('altimetria_pivos').where('codigo_altimetria', pivotAltimetryId).del()

            if (!pivotAltimetry) return res.status(400).json({ message: 'Altimetria Pivô não existente na base de dados' })

            return res.json({ message: 'Altimetria Pivô removida com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default PivotAltimetryController;