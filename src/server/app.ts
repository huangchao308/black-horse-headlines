import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import authRouter from './routers/auth-router'
import VerifyToken from './middlewares/verify-token'
import verifyToken from './middlewares/verify-token';

const app = new Koa()

app.use(bodyParser())

app.use(authRouter.routes())
app.use(verifyToken())

export default app
