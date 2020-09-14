import { Router } from 'express'
import ComandUtrController from '@controllers/ComandUtrController'

const router = Router();
const comandUtrController = new ComandUtrController();

router
    .get('/comandUtrs/', comandUtrController.index)
    .post('/comandUtrs/', comandUtrController.store)
    .get('/comandUtrs/:id', comandUtrController.show)
    .put('/comandUtrs/:id', comandUtrController.update)
    .delete('/comandUtrs/:id', comandUtrController.delete)

export default router;