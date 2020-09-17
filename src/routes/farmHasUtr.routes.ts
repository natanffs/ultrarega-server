import { Router } from 'express'
import FarmHasUtrController from '@controllers/FarmHasUtrController'

const router = Router();
const farmHasUtrController = new FarmHasUtrController();

router
    .get('/farmHasUtrs/', farmHasUtrController.index)
    .post('/farmHasUtrs/', farmHasUtrController.store)
    .get('/farmHasUtrs/:id', farmHasUtrController.show)
    .put('/farmHasUtrs/:id', farmHasUtrController.update)
    .delete('/farmHasUtrs/:id', farmHasUtrController.delete)

export default router;