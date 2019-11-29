import jwt from 'jsonwebtoken'
import moment from 'moment'
import UserModel from '../models/user'

export default class UserController {
  private static instance: UserController
  private secret: string

  private constructor () {
    this.secret = process.env.jwtSecret
  }

  public static getInstance (): UserController {
    if (!this.instance) {
      this.instance = new UserController()
    }
    return this.instance
  }

  public async login (username: string, pass: string) {
    const user = await this.getUser(username, pass)
    if (!user) {
      return {
        code: 403,
        message: 'Forbidden'
      }
    }
    const { id, name, photo } = user
    return {
      code: 201,
      message: 'success',
      id,
      name,
      photo,
      token: this.getToken(id),
      refresh_token: this.getToken(id, 'refresh')
    }
  }

  public async refreshToken (refreshToken: string) {
    try {
      const payload: any = jwt.verify(refreshToken, this.secret, { subject: 'refresh' })
      return {
        code: 201,
        message: 'success',
        token: this.getToken(payload.aud)
      }
    } catch (error) {
      console.log(error.stack)
      return {
        code: 403,
        message: error.message
      }
    }
  }

  public verifyToken (token: string, options?: any): boolean {
    try {
      jwt.verify(token, this.secret, options)
      return true
    } catch (error) {
      console.log(error.stack)
      return false
    }
  }

  private async getUser (username: string, pass: string): Promise<LoginUser> {
    const user = await UserModel.findOne({
      name: username,
      pass
    }, 'name photo _id')

    return user as any
  }

  private async getSecret (id: string) {
    const user: any = await UserModel.findById(id)
    return user.pass
  }

  private getToken (id: string, subject: string = 'token') {
    const payload = {
      iss: 'black-horse-headlines',
      sub: subject,
      aud: id,
      exp: moment().add(10, 'minute').unix(),
      iat: moment().unix()
    }

    return jwt.sign(payload, this.secret)
  }
}
