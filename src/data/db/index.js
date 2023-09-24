const db = require("./db.js");
const fs = require("fs");
const path = require("path");
const {serialize: serialize, deserialize: deserialize} = require("./serializer.js");
const RentalsSchema = require("./schemas/RentalsSchema.js");
const CommentsSchema = require("./schemas/CommentsSchema.js");
const RatingsSchema = require("./schemas/RatingsSchema.js");
const UsersSchema = require("./schemas/UsersSchema.js");
const {Query, Response} = require("./schemas/grpc.js")
async function createRental(call, callback) {
    callback(null, deserialize(await db.create(serialize(call.request), RentalsSchema)));
}
async function createComment(call, callback) {
    callback(null, deserialize(await db.create(serialize(call.request), CommentsSchema)));
}
async function createRating(call, callback) {
    callback(null, deserialize(await db.create(serialize(call.request), RatingsSchema)));
}
async function createUser(call, callback) {
    callback(null, deserialize(await db.create(serialize(call.request), UsersSchema)));
}
async function listRentals(call, callback) {
    let query = new Query(serialize(call.request));
    let list = deserialize(await db.list(query.query, RentalsSchema));
    callback(null, {list: list});
}
async function listComments(call, callback) {
    let query = new Query(serialize(call.request));
    let list = deserialize(await db.list(query.query, CommentsSchema));
    callback(null, {list: list});
}
async function listRatings(call, callback) {
    let query = new Query(serialize(call.request));
    let list = deserialize(await db.list(query.query, RatingsSchema));
    callback(null, {list: list});
}
async function listUsers(call, callback) {
    let query = new Query(serialize(call.request));
    let list = deserialize(await db.list(query.query, UsersSchema));
    callback(null, {list: list});
}
async function getRental(call, callback) {
    let query = new Query(serialize(call.request));
    callback(null, deserialize(await db.getOne(query.query, RentalsSchema)));
}
async function getUser(call, callback) {
    let query = new Query(serialize(call.request));
    callback(null, deserialize(await db.getOne(query.query, UsersSchema)));
}
async function deleteRental(call, callback) {
    let query = new Query(serialize(call.request));
    let response = new Response(deserialize(await db.remove(query.query, RentalsSchema)));
    if(response.value){
        removeRentalFiles(query.query);
    }
    callback(null, response.toJson());
}
function removeRentalFiles(rental){
    if(rental.image){
        let res = fs.unlinkSync(path.join(__dirname, "../../../", rental.image));
    }
}
async function deleteComment(call, callback) {
    let query = new Query(serialize(call.request));
    let response = new Response(deserialize(await db.remove(query.query, CommentsSchema)));
    callback(null, response.toJson());
}
async function deleteRating(call, callback) {
    let query = new Query(serialize(call.request));
    let response = new Response(deserialize(await db.remove(query.query, RatingsSchema)));
    callback(null, response.toJson());
}
async function deleteUser(call, callback) {
    let query = new Query(serialize(call.request));
    let response = new Response(deserialize(await db.remove(query.query, UsersSchema)));
    callback(null, response.toJson());
}

module.exports = {
    createRental,
    createComment,
    createRating,
    createUser,

    listRentals,
    listComments,
    listRatings,
    listUsers,

    getRental,
    getUser,

    deleteRental,
    deleteComment,
    deleteRating,
    deleteUser

}