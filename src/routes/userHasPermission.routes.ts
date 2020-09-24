/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa

 */

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