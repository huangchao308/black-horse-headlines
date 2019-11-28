import jwt from 'jsonwebtoken'
import moment from 'moment'
import UserModel from '../models/user'

export default class AuthController {
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
      id,
      name,
      photo,
      token: this.getToken(id, pass),
      refresh_token: this.getToken(id, pass, 'refresh')
    }
  }

  private async getUser (username: string, pass: string): Promise<LoginUser> {
    const user = await UserModel.findOne({
      name: username,
      pass
    }, 'name photo _id')

    return user as any
  }

  private getToken (id: string, secret: string, subject: string = 'token') {
    const payload = {
      iss: 'black-horse-headlines',
      sub: subject,
      aud: id,
      exp: moment().add(10, 'minute').unix(),
      iat: moment().unix()
    }

    return jwt.sign(payload, secret)
  }
}
