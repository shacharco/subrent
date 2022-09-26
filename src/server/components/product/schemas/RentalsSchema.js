const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RentalsSchema = new Schema({
  email: String,
  phone: String,
  location: String,
  quantity: Number,
  category: String,
  name: String,
  price: Number,
  timestamp: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Rentals', RentalsSchema );