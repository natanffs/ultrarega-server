/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/

import { Router } from 'express'
import UserController from '@controllers/UserController'

const router = Router();
const userController = new UserController();

router
    .get('/users/', userController.index)
    .post('/users/', userController.store)
    .get('/users/:id/:param?', userController.show)
    .put('/users/:id', userController.update)
    .delete('/users/:id', userController.delete)

export default router;