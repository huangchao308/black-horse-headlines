import UserController from '../controllers/user-controller'
import { Context, Next } from 'koa'

const userController = UserController.getInstance()

export default () => {
  return (ctx: Context, next: Next) => {
    const token = ctx.request.headers.authorization.split(' ')[1]
    if (userController.verifyToken(token)) {
      next()
    } else {
      ctx.response.status = 401
      ctx.response.body = {
        message: 'Invalid authorization'
      }
    }
  }
}
