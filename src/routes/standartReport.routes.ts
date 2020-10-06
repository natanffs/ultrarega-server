/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/

import { Router } from 'express'
import StandartReportController from '@controllers/StandartReportController'

const router = Router()
const standartReportController = new StandartReportController()

router
    .get('/standartReports/', standartReportController.index)
    .post('/standartReports/', standartReportController.store)
    .get('/standartReports/:id', standartReportController.show)
    .put('/standartReports/:id', standartReportController.update)
    .delete('/standartReports/:id', standartReportController.delete)

export default router