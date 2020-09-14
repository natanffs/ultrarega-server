import { Router } from 'express'
import ConfigUtrController from '@controllers/ConfigUtrController'

const router = Router();
const configUtrController = new ConfigUtrController();

router
    .get('/configUtrs/', configUtrController.index)
    .post('/configUtrs/', configUtrController.store)
    .get('/configUtrs/:id', configUtrController.show)
    .put('/configUtrs/:id', configUtrController.update)
    .delete('/configUtrs/:id', configUtrController.delete)

export default router;