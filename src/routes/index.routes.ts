import { Router } from 'express'
import UserController from '../controllers/UserController'

const router = Router()

router
    .get('/', (req, res) => {
        res.json({ message: 'Olá estranho. Você precisa se autenticar para consumir os recursos desta api.' })
    })


export default router