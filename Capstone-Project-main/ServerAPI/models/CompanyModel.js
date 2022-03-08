const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
  company: {
    type: String,
    
  }
});


module.exports = mongoose.model('Company', companySchema);