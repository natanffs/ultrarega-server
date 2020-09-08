import express, { Application } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import * as routes from './routes'
import authMiddleware from './middlewares/auth'

export class App {
    private app: Application

    constructor() {
        dotenv.config()
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
    }

    private settings() {
        
    }

    private middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors({ exposedHeaders: 'Authorization' }))
        this.app.use(morgan('dev'))
    }

    private publicRoutes() {
        this.app.use('/api', routes.index)
        this.app.use('/api', routes.auth)
    }

    private privateRoutes() {
        /** Admin routes  */
        this.app.use('/api', routes.user)
    }

    private routes() {
        this.publicRoutes()

        this.app.use(authMiddleware) /** Authentication required routes */
        this.privateRoutes()
    }

    async listen(port: number | string) {
        await this.app.listen(port)
        console.log('Server on port', port)
        console.log(`http://${process.env.DB_HOST || 'localhost'}:${port}/api`)
    }
}
