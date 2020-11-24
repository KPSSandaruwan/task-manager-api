const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //To make this compulsary
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
})


//This is just a relationship between two fields
//It's not stored in the database
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
}) 


//Special about "toJSON" method
//Then we can manipulate the object that comes out from this
userSchema.methods.toJSON = function () {
  const user = this

  //Getting raw profile data
  const userObject = user.toObject()
  
  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar
  return userObject
}

//Defining Token genetarate function
//methods are accessable on instances and called instance method
//We use function because we have to use 'this' binding
//Arrow function doesn't help for 'this' binding
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

//statics methods are accessable on the model and called model methods
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }
  return user
}

//Setting the middleware
//Hash the pain text password before saving
//pre -> before save  post -> After  asve
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  // To know that function is over
  // This will trigger the process is finish
  next()
})

//Delete user tasks when user is deleted
userSchema.pre('remove', async function (next) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})

//Creating a mongoose model
const User = mongoose.model('User', userSchema)


module.exports = User



