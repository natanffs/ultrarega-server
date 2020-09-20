import { Router } from 'express'
import PermissionController from '@controllers/PermissionController'

const router = Router();
const permissionController = new PermissionController();

router
    .get('/permissions/:byUser?', permissionController.index)
    .post('/permissions/', permissionController.store)
    .get('/permissions/:id', permissionController.show)
    .put('/permissions/:id', permissionController.update)
    .delete('/permissions/:id', permissionController.delete)

export default router;