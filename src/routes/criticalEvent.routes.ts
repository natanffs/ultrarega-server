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