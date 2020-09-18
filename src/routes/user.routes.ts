import { Router } from 'express'
import UserController from '@controllers/UserController'

const router = Router();
const userController = new UserController();

router
    .get('/users/', userController.index)
    .post('/users/', userController.store)
    .get('/users/:id/:param?', userController.show)
    .put('/users/:id', userController.update)
    .delete('/users/:id', userController.delete)

export default router;