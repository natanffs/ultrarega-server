/**
 * ROTA DE ALERTAS  
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/

import { Router } from 'express'
import AlertController from '@controllers/AlertController'

const router = Router();
const alertController = new AlertController();

router
    .get('/alerts/', alertController.index)
    .post('/alerts/', alertController.store)
    .get('/alerts/:id', alertController.show)
    .put('/alerts/:id', alertController.update)
    .delete('/alerts/:id', alertController.delete)

export default router;