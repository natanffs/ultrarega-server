import { Request, Response } from 'express'
import knex from '../database/connection'

class UtrController {
    async index(req: Request, res: Response) {
        try {
            //Listar todas as utrs cadastradas
            //Listar todas as utrs de um usuário
            //const utrs = await knex('utr')
        } catch (error) {
            console.log(error)
        }
    }

    async show(req: Request, res: Response) {
        try {
            //const cod_utr = req.body.cod_utr

        } catch (error) {
            console.log(error)
        }
    }

    async store(req: Request, res: Response) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
    
    async update(req: Request, res: Response) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
}

export default UtrController