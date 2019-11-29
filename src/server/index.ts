import mongoose, { Error } from 'mongoose'
import app from './app'

mongoose.connect('mongodb://localhost', {
  dbName: "test",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, err => {
  if (err) {
    console.log(err)
    const ctx = app.context
    ctx.response.status = 507
    ctx.response.message = 'database error'
  }
  console.log('DB connected.')
  app.listen(3000)
  console.log('Server start on port: 3000')
})

const db = mongoose.connection

db.on('error', (err: Error) => {
  console.log(err)
  const ctx = app.context
  ctx.response.status = 507
  ctx.response.message = 'database error'
})
