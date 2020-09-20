import { Router } from 'express'
import PivotController from '@controllers/PivotController'

const router = Router()
const pivotController = new PivotController()

router
    .get('/pivots/?:/id', pivotController.index)
    .post('/pivots/', pivotController.store)
    .get('/pivots/:id', pivotController.show)
    .put('/pivots/:id', pivotController.update)
    .delete('/pivots/:id', pivotController.delete)

export default router