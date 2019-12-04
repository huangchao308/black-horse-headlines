type LoginUser = {
  id: string
  _id: string
  name: string
  photo: string
}

declare const enum TokenType {
  REFRESH = 'refresh',
  TOKEN = 'token'
}
