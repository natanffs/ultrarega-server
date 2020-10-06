/**
 * Rotas do sistema, que faz a conexão com frontend:
 ** rota responsável por fazer o registro e login do usuário no sistema, através do Authcontroller
*/



import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'

const router = Router()
const authController = new AuthController()
const userController = new UserController()

router
    .post('/register', userController.store)
    .post('/login', authController.login)

export default router