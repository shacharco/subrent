const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RatingsSchema = new Schema({
  product: mongoose.Types.ObjectId,
  user: mongoose.Types.ObjectId,
  value: Number,
  timestamp: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Ratings', RatingsSchema );