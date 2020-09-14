import { Router } from 'express'
import UtrController from '@controllers/UtrMinutesController'

const router = Router();
const utrController = new UtrController()

router.get('/utr/:id', utrController.show)

export default router