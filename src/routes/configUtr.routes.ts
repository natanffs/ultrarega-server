/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/


import { Router } from 'express'
import ConfigUtrController from '@controllers/ConfigUtrController'

const router = Router();
const configUtrController = new ConfigUtrController();

router
    .get('/configUtrs/', configUtrController.index)
    .post('/configUtrs/', configUtrController.store)
    .get('/configUtrs/:id', configUtrController.show)
    .put('/configUtrs/:id', configUtrController.update)
    .delete('/configUtrs/:id', configUtrController.delete)

export default router;