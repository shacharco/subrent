const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RentalsSchema = new Schema({
  user: String,
  phone: String,
  location: String,
  quantity: Number,
  category: String,
  name: String,
  price: Number,
  image: String,
  timestamp: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Rentals', RentalsSchema );