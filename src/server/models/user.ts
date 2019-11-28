import mongoose from 'mongoose'

export default mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  pass: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  intro: String,
  photo: String
}))
