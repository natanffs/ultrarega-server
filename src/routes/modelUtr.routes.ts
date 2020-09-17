import { Router } from 'express'
import ModelUtrController from '@controllers/ModelUtrController'

const router = Router();
const modelUtrController = new ModelUtrController();

router
    .get('/modelUtrs/', modelUtrController.index)
    .post('/modelUtrs/', modelUtrController.store)
    .get('/modelUtrs/:id', modelUtrController.show)
    .put('/modelUtrs/:id', modelUtrController.update)
    .delete('/modelUtrs/:id', modelUtrController.delete)

export default router;