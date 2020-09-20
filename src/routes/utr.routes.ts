import { Router } from 'express'
import UtrController from '@controllers/UtrController'

const router = Router();
const utrController = new UtrController()

router
    .get('/utrs', utrController.index)
    .post('/utrs/', utrController.store)
    .get('/utrs/:id', utrController.show)
    .put('/utrs/:id', utrController.update)
    .delete('/utrs/:id', utrController.delete)

export default router