/**
 * Rotas do sistema, que faz a conexão com frontend:
 **  rotas GET - Busca de informações
** As rotas, podem em algumas situações ter ou não parâmetros, que serão as informações adicionais recebidas ou enviadas do Frontend ao backend e vice-versa
*/
import { Router } from 'express'
import UtrController from '@controllers/UtrMinutesController'

const router = Router();
const utrController = new UtrController()

router.get('/utr/:id', utrController.show)

export default router