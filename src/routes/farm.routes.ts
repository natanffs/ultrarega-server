/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/

import { Router } from 'express'
import FarmController from '@controllers/FarmController'

const router = Router();
const farmController = new FarmController();

router
    .get('/farms/', farmController.index)
    .get('/farms/:id/user', farmController.getFarmByUserId)
    .post('/farms/', farmController.store)
    .get('/farms/:id', farmController.show)
    .put('/farms/:id', farmController.update)
    .delete('/farms/:id', farmController.delete)

export default router;