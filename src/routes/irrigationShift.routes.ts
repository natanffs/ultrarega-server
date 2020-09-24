/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/

import { Router } from 'express'
import IrrigationShiftController from '@controllers/IrrigationShiftController'

const router = Router()
const irrigationShiftController = new IrrigationShiftController()

router
    .get('/irrigationShifts/', irrigationShiftController.index)
    .post('/irrigationShifts/', irrigationShiftController.store)
    .get('/irrigationShifts/:id', irrigationShiftController.show)
    .put('/irrigationShifts/:id', irrigationShiftController.update)
    .delete('/irrigationShifts/:id', irrigationShiftController.delete)

export default router