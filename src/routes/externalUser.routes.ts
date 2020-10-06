/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/


import { Router } from 'express'
import ExternalUserController from '@controllers/ExternalUserController'

const router = Router();
const externalUserController = new ExternalUserController();

router
    .get('/externalUsers/', externalUserController.index)
    .post('/externalUsers/', externalUserController.store)
    .get('/externalUsers/:id', externalUserController.show)
    .put('/externalUsers/:id', externalUserController.update)
    .delete('/externalUsers/:id', externalUserController.delete)

export default router;