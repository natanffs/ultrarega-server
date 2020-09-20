import { Router } from 'express'
import FarmController from '@controllers/FarmController'

const router = Router();
const farmController = new FarmController();

router
    .get('/farms/', farmController.index)
    .get('/farms/:id/user', farmController.getFarmByUserId)
    .post('/farms/', farmController.store)
    .get('/farms/:id', farmController.show)
    .put('/farms/:id', farmController.update)
    .delete('/farms/:id', farmController.delete)

export default router;