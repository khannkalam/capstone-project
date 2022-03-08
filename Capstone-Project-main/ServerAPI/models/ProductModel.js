const mongoose = require('mongoose')
const Schema = mongoose.Schema


const productSchema = new Schema({
  name: {
    type: String
  },
  company:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
  },
  description:
  {
      type: String
  },

  image:{
    type: String
  },

  price:{
      type: Number
  }
});


module.exports = mongoose.model('Product', productSchema);