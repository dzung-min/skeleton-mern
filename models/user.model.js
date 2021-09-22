const mongoose = require('mongoose')
const validator = require('validator').default
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: 'Email is required',
      validate: (val) => {
        if (!validator.isEmail(val)) {
          throw new Error('Please fill a valid email address')
        }
      },
    },
    password: {
      type: String,
      required: 'Password is required',
      minlength: [8, 'Password must contains at least 8 characters'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

UserSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model('User', UserSchema)
