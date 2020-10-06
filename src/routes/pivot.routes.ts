/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/

import { Router } from 'express'
import PivotController from '@controllers/PivotController'

const router = Router()
const pivotController = new PivotController()

router
    .get('/pivots', pivotController.index)
    .post('/pivots/', pivotController.store)
    .get('/pivots/:id', pivotController.show)
    .put('/pivots/:id', pivotController.update)
    .delete('/pivots/:id', pivotController.delete)

export default router