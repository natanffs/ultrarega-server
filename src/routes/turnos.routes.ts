import { Router } from 'express'
import TurnosRegaController from '@controllers/TurnoRegaController'

const router = Router();
const turnosRegaController = new TurnosRegaController();

router
    .get('/turnosrega/', turnosRegaController.index)
    .post('/turnosrega/:id', turnosRegaController.store)
    .get('/turnosrega/:id', turnosRegaController.show)
    .put('/turnosrega/:id', turnosRegaController.update)
    .delete('/turnosrega/:id', turnosRegaController.delete)

export default router;