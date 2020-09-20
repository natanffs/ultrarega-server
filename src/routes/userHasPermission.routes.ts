import { Router } from 'express'
import UserHasPermissionController from '@controllers/UserHasPermissionController'


const router = Router();
const userHasPermissionController = new UserHasPermissionController();

router
    .get('/userHasPermissions/:id?', userHasPermissionController.index)
    .post('/userHasPermissions/', userHasPermissionController.store)
    .get('/userHasPermissions/:idUsuario', userHasPermissionController.show)
    .put('/userHasPermissions/:id', userHasPermissionController.update)
    .delete('/userHasPermissions/:id', userHasPermissionController.delete)

export default router;