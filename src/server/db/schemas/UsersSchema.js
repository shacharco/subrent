const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  email: String,
  username: String,
  timestamp: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Users', UsersSchema );