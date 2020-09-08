import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface Idecoded {
    id: Number,
    level: Number
}

declare global {
    namespace Express {
        interface Request {
            userId: Number,
            userLevel: Number
        }
    }
}

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
        return res.status(401).json({ error: 'Acesso não autorizado' })

    const parts = authHeader.split(' ')

    if (parts.length !== 2)
        return res.status(401).json({ error: 'Falha na autenticação' })

    const [ scheme, token ] = parts

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json({ error: 'Token mal formatado' })

    jwt.verify(token,  process.env.SECRET || 'beterraba-vermelha', (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' })
        
        const { id, level } = (decoded as Idecoded)
        
        req.userId = id
        req.userLevel = level

        return next()
    })
}