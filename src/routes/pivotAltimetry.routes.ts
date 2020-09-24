/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
 **  rotas POST - Inserção de informações
 **  rotas PUT - Atualização de informações
 **  rotas DELETE - Remoção de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/

import { Router } from 'express'
import PivotAltimetryController from '@controllers/PivotAltimetryController'

const router = Router();
const pivotAltimetry = new PivotAltimetryController();

router
    .get('/pivotAltimetrys/', pivotAltimetry.index)
    .post('/pivotAltimetrys/', pivotAltimetry.store)
    .get('/pivotAltimetrys/:id', pivotAltimetry.show)
    .put('/pivotAltimetrys/:id', pivotAltimetry.update)
    .delete('/pivotAltimetrys/:id', pivotAltimetry.delete)

export default router;
