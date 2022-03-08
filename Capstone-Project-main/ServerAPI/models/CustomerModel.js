const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
mongoose.pluralize(null);

const CustomerSchema = new Schema({
  username: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    lowercase: true,
    unique:true,
    required:'Username is required!'
  },
  firstname:{
    type:String,
    required: "Firstname is required!",
    min: [4, 'Too short, min 4 characters are required']
  },
  lastname:{
    type:String,
    required: 'Lastname is required!',
    min: [4, 'Too short, min 4 characters are required']
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
   
  },

  addressline1: {
      type: String,
      required: 'Address is required!'
      
  },
  addressline2: {
      type: String
      
  },

  city: {
      type: String,
      required: 'City is required!',
      max: [35, 'Too Long, max 16 character are allowed']
    
    },


  zipcode: {
      type: String,
      required: 'Zipcode is required!',
      max: [6,'Too Long, max 5 character is allowed']
  },

  state:{
      type:String,
      required: 'State is required!'
  }



});

CustomerSchema.pre('save', function (next) {
  const customer = this
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return res.status(422).json({
        'error': 'There is an error while gensalt hash'
      })
    }
    bcrypt.hash(customer.password, salt, function (err, hash) {
      if (err) {
        return res.status(422).json({
          'error': 'There is an error while password hash'
        })
      }
      customer.password = hash
      next()
    })
  })
})

CustomerSchema.methods.hasSamePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('Customer', CustomerSchema)