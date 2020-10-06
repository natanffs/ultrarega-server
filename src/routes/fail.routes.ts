/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/


import { Router } from 'express'
import FailController from '@controllers/FailController'

const router = Router()
const failController = new FailController()

router
    .get('/fails/', failController.index)
    .post('/fails/', failController.store)
    .get('/fails/:id', failController.show)
    .put('/fails/:id', failController.update)
    .delete('/fails/:id', failController.delete)

export default router