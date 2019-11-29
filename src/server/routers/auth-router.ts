import Router from 'koa-router'
import { Context } from 'koa';
import UserController from '../controllers/user-controller'

const router = new Router({ prefix: '/mp/v1_0/authorizations' })
const userController = UserController.getInstance()

router.post('/', async (ctx: Context) => {
  const { username, pass } = ctx.request.body
  const { code, message, ...data } = await userController.login(username, pass)
  ctx.response.status = code
  ctx.response.body = {
    message,
    data
  }
})

router.put('/', async (ctx: Context) => {
  const token = ctx.request.headers.authorization.split(' ')[1]
  const { code, message, ...data } = await userController.refreshToken(token)
  ctx.response.status = code
  ctx.response.body = {
    message,
    data
  }
})

export default router
