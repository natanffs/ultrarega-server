import { Router } from 'express'
import ExternalUserController from '@controllers/ExternalUserController'

const router = Router();
const externalUserController = new ExternalUserController();

router
    .get('/externalUsers/', externalUserController.index)
    .post('/externalUsers/', externalUserController.store)
    .get('/externalUsers/:id', externalUserController.show)
    .put('/externalUsers/:id', externalUserController.update)
    .delete('/externalUsers/:id', externalUserController.delete)

export default router;