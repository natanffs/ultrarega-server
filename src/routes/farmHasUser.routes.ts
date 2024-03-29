/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/


import { Router } from 'express'
import FarmHasUserController from '@controllers/FarmHasUserController'

const router = Router();
const farmHasUserController = new FarmHasUserController();

router
    .get('/farmHasUsers/', farmHasUserController.index)
    .post('/farmHasUsers/', farmHasUserController.store)
    .get('/farmHasUsers/:id', farmHasUserController.show)
    .put('/farmHasUsers/:id', farmHasUserController.update)
    .delete('/farmHasUsers/:id', farmHasUserController.delete)

export default router;