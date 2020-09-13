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
