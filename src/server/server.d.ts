type LoginUser = {
  id: string
  _id: string
  name: string
  photo: string
}

declare enum TokenType {
  REFRESH = 'refresh',
  TOKEN = 'token'
}
