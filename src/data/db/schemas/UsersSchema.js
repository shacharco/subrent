const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  timestamp: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Users', UsersSchema );