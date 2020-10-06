/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/

import { Router } from 'express'
import TurnosRegaController from '@controllers/TurnoRegaController'

const router = Router();
const turnosRegaController = new TurnosRegaController();

router
    .get('/turnosrega/', turnosRegaController.index)
    .post('/turnosrega/:id', turnosRegaController.store)
    .get('/turnosrega/:id', turnosRegaController.show)
    .put('/turnosrega/:id', turnosRegaController.update)
    .delete('/turnosrega/:id', turnosRegaController.delete)

export default router;