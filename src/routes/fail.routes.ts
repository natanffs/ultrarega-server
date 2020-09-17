import { Router } from 'express'
import FailController from '@controllers/FailController'

const router = Router()
const failController = new FailController()

router
    .get('/fails/', failController.index)
    .post('/fails/', failController.store)
    .get('/fails/:id', failController.show)
    .put('/fails/:id', failController.update)
    .delete('/fails/:id', failController.delete)

export default router