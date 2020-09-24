/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/

import { Router } from 'express'
import FarmHasUtrController from '@controllers/FarmHasUtrController'

const router = Router();
const farmHasUtrController = new FarmHasUtrController();

router
    .get('/farmHasUtrs/', farmHasUtrController.index)
    .post('/farmHasUtrs/', farmHasUtrController.store)
    .get('/farmHasUtrs/:id', farmHasUtrController.show)
    .put('/farmHasUtrs/:id', farmHasUtrController.update)
    .delete('/farmHasUtrs/:id', farmHasUtrController.delete)

export default router;