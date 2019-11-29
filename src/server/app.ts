import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import authRouter from './routers/auth-router'

const app = new Koa()

app.use(bodyParser())

app.use(authRouter.routes())

export default app
