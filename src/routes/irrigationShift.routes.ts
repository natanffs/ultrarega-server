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