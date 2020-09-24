/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/

import { Router } from 'express'
import PermissionController from '@controllers/PermissionController'

const router = Router();
const permissionController = new PermissionController();

router
    .get('/permissions', permissionController.index)
    .get('/permissions/byUser/:id', permissionController.byUser)
    .post('/permissions/', permissionController.store)
    .get('/permissions/:id', permissionController.show)
    .put('/permissions/:id', permissionController.update)
    .delete('/permissions/:id', permissionController.delete)

export default router;