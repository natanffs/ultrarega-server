/**
 * Arquivo que impede o acesso à rota sem a devida autenticação
*/
import { Router } from 'express'

const router = Router()

router
    .get('/', (req, res) => {
        res.json({ message: 'Olá estranho. Você precisa se autenticar para consumir os recursos desta api.' })
    })


export default router