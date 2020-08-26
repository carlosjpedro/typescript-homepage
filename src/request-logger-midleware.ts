import { Request, Response, NextFunction } from "express"


const requestLoggerMiddleware = (req: Request, resp: Response, next: NextFunction) => {
    console.info(`${req.method} ${req.originalUrl}`)
    const start = new Date().getTime()

    resp.on('finish', () => {
        const elapsed = new Date().getTime() - start
        console.info(`${req.method}  ${req.originalUrl} ${req.statusCode} ${elapsed}ms`)
    })
    next()
}

export { requestLoggerMiddleware }