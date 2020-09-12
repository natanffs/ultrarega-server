import { Router } from 'express'
import AlertController from '@controllers/AlertController'

const router = Router();
const alertController = new AlertController();

router
    .get('/alerts/', alertController.index)
    .post('/alerts/', alertController.store)
    .get('/alerts/:id', alertController.show)
    .put('/alerts/:id', alertController.update)
    .delete('/alerts/:id', alertController.delete)

export default router;