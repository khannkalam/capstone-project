const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
mongoose.pluralize(null);

const AdminSchema = new Schema({
  username: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    lowercase: true,
    unique:true,
    required:'Username is required!'
  },
  email: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    max: [32, 'Too long, max 16 characters are required'],
    lowercase: true,
    unique: true,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    required: 'Password is required'
  },
  passwordConfirmation: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
   
  }
});

AdminSchema.pre('save', function (next) {
  const admin = this
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return res.status(422).json({
        'error': 'There is an error while gensalt hash'
      })
    }
    bcrypt.hash(admin.password, salt, function (err, hash) {
      if (err) {
        return res.status(422).json({
          'error': 'There is an error while password hash'
        })
      }
      admin.password = hash
      next()
    })
  })
})

AdminSchema.methods.hasSamePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('Admin', AdminSchema)