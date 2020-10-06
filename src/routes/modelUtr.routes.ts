/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/

import { Router } from 'express'
import ModelUtrController from '@controllers/ModelUtrController'

const router = Router();
const modelUtrController = new ModelUtrController();

router
    .get('/modelUtrs/', modelUtrController.index)
    .post('/modelUtrs/', modelUtrController.store)
    .get('/modelUtrs/:id', modelUtrController.show)
    .put('/modelUtrs/:id', modelUtrController.update)
    .delete('/modelUtrs/:id', modelUtrController.delete)

export default router;