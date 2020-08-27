import * as express from "express"
import * as cors from "cors"
import * as bodyparser from "body-parser"

import { requestLoggerMiddleware } from "./request-logger-midleware"
import "./todo-controller";
import { RegisterRoutes } from "./routes";
import * as swaggerUi from "swagger-ui-express"
const app = express()
const router =  express.Router()
app.use(cors())
app.use(bodyparser.json())

app.use(requestLoggerMiddleware)
app.use(router)
RegisterRoutes(app)
try{

const swaggerDocument = require('../swagger.json')
app.use('/docs', swaggerUi.serve)
router.get('/docs', swaggerUi.setup(swaggerDocument));
}
catch(err)
{
    console.error('Unable to read swagger docs.',err)
}

export { app }