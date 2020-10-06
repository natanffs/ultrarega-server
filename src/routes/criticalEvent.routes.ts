/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/


import { Router } from 'express'
import CriticalEventController from '@controllers/CriticalEventController'

const router = Router()
const criticalEventController = new CriticalEventController()

router
    .get('/criticalEvents/', criticalEventController.index)
    .post('/criticalEvents/', criticalEventController.store)
    .get('/criticalEvents/:id', criticalEventController.show)
    .put('/criticalEvents/:id', criticalEventController.update)
    .delete('/criticalEvents/:id', criticalEventController.delete)

export default router