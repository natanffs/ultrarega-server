import { Router } from 'express'
import StandartReportController from '@controllers/StandartReportController'

const router = Router()
const standartReportController = new StandartReportController()

router
    .get('/standartReports/', standartReportController.index)
    .post('/standartReports/', standartReportController.store)
    .get('/standartReports/:id', standartReportController.show)
    .put('/standartReports/:id', standartReportController.update)
    .delete('/standartReports/:id', standartReportController.delete)

export default router