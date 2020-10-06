/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/

import { Router } from 'express'
import UtrController from '@controllers/UtrController'

const router = Router();
const utrController = new UtrController()

router
    .get('/utrs', utrController.index)
    .get('/utrsbyUser/:id', utrController.byUser)
    .post('/utrs/', utrController.store)
    .get('/utrs/:id', utrController.show)
    .put('/utrs/:id', utrController.update)
    .delete('/utrs/:id', utrController.delete)

export default router