const mongoose = require('mongoose');
const RentalsSchema = require("./schemas/RentalsSchema.js");
var yaml_config = require('js-yaml');
var fs = require('fs');
const path = require('path');
const config = yaml_config.load(fs.readFileSync(path.join(__dirname, '..', '..', 'config.yml')));

mongoose.connect(config.db_connection_string, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});
console.log(connection);

async function createRental(rental){
    try {
        const res = await RentalsSchema.create(rental);
    } catch(error) {
        console.error(error)
        return false;
    }
    return true;
}
async function removeRental(rental){
    try {
        const res = await RentalsSchema.deleteOne(rental);
    } catch(error) {
        console.error(error)
        return false;
    }
    return true;
}
async function listRentalsByName(nameSearch){
    const query = { "name": { "$regex": nameSearch, "$options": "i" }};
    return await listRentals(query);
}

async function listRentals(query){
    const rentals = await RentalsSchema.find(query).lean();
    return rentals;
}
module.exports = {
    createRental, listRentals, listRentalsByName, removeRental
}