import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

import { sendMessage } from '../websocket'
import { alert } from 'src/routes'

interface userHasPermissionI {
    codigo_usuarios_has_permissoes: number,
    codigo_permissao: number,
    codigo_usuario: number

}

class UserHasPermissionController {

    async index(req: Request, res: Response) {
        try {
            const userHasPermission = await knex('usuarios_has_permissoes').select('*')
            return res.json(userHasPermission)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        /*try {
            const userHasPermissionId = req.params.id 
            const idUser =  req.params.idUsuario;

            if(idUser != ''){
                console.log('WSD')
                console.log()
                return res.json(idUser)
            }

            return res.json(idUser)
            /*const userHasPermission = await knex('usuarios_has_permissoes').select('*').where('codigo_usuarios_has_permissoes', userHasPermissionId).first()

            if (!userHasPermission) return res.status(400).json({ message: 'Permissão do usuário não existente na base de dados' })*

            //return res.json(userHasPermission)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }*/
    }

    async store(req: Request, res: Response) {
        try {
            const {codigo_usuario } = req.body
            const arrayPermissoes =  Object.values(req.body.codigo_permissao);

           
            for(var i=0; i < arrayPermissoes.length; i++ ){
                await knex('usuarios_has_permissoes').insert({codigo_usuario, codigo_permissao:arrayPermissoes[i]})
            }

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })

        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        /*try {
            const farmHasUserId = req.params.id
            const farmHasUserData = req.body
            
            
            const farmHasUser = await knex('usuarios_has_permissoes').where('codigo_usuarios_has_permissoes', farmHasUserId).update(farmHasUserData)

            if (!farmHasUser) return res.status(400).json({ message: 'Fazenda não existente na base de dados' })

            

            return res.json({ message: 'Dados atualizados com sucesso!'})
            
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }*/
    }

    async delete(req: Request, res: Response) {
        /*/try {
            const farmHasUserId = req.params.id
            const farmHasUser = await knex('usuarios_has_permissoes').where('codigo_usuarios_has_permissoes', farmHasUserId).del()

            if (!farmHasUser) return res.status(400).json({ message: 'Fazenda por usuário não existente na base de dados' })

            return res.json({ message: 'Associação de Fazenda e Usuário removida com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }*/
    }
}

export default UserHasPermissionController;