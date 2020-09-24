/**
 * ROTA DE UTR COMANDOS  
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/


import { Router } from 'express'
import ComandUtrController from '@controllers/ComandUtrController'

const router = Router();
const comandUtrController = new ComandUtrController();

router
    .get('/comandUtrs/', comandUtrController.index)
    .post('/comandUtrs/', comandUtrController.store)
    .get('/comandUtrs/:id', comandUtrController.show)
    .put('/comandUtrs/:id', comandUtrController.update)
    .delete('/comandUtrs/:id', comandUtrController.delete)

export default router;