import { Router } from 'express'
import FarmHasUserController from '@controllers/FarmHasUserController'

const router = Router();
const farmHasUserController = new FarmHasUserController();

router
    .get('/farmHasUsers/', farmHasUserController.index)
    .post('/farmHasUsers/', farmHasUserController.store)
    .get('/farmHasUsers/:id', farmHasUserController.show)
    .put('/farmHasUsers/:id', farmHasUserController.update)
    .delete('/farmHasUsers/:id', farmHasUserController.delete)

export default router;