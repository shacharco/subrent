const db = require("../../db/db.js");
const sanitize = require('mongo-sanitize');
const RentalsSchema = require("../product/schemas/RentalsSchema.js");
const UsersSchema = require("./schemas/UsersSchema.js");


async function getUserRentals(email){
    let rentals = await db.list({email: sanitize(email)}, RentalsSchema);  
    return rentals;
}
async function removeUserRental(rental){
    let result = await db.remove(sanitize(rental), RentalsSchema);
    return result;
}
async function getUserByEmail(email){
    let user = await db.getOneByField("email", sanitize(email), UsersSchema);
    return user;
}
module.exports = {getUserByEmail, getUserRentals, removeUserRental};