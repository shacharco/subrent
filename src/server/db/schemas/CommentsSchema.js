const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  product: mongoose.Types.ObjectId,
  user: mongoose.Types.ObjectId,
  text: String,
  timestamp: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Comments', CommentsSchema );