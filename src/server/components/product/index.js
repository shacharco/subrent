const db = require("../../db/db.js");
const sanitize = require('mongo-sanitize');
const sanitizer = require("../../utils/sanitize.js")
const mongoose = require('mongoose');
const RentalsSchema = require("./schemas/RentalsSchema.js");
const Product = require("./Product.js").Product;
const CommentsSchema = require("./schemas/CommentsSchema.js");
const Comment = require("./Comment.js").Comment;
const RatingsSchema = require("./schemas/RatingsSchema.js");
const Rating = require("./Rating.js").Rating;
const UsersSchema = require("../user/schemas/UsersSchema.js");
const {DataHandler} = require("../../utils/data.js");

// TODO: make it return the handlers chain, and make it possible to add handlers to the end of the chains
// TODO: make it get a handler instead of regex,list and derive the handler from that.
async function createItem(id, value, schema, type, userId, postSanitation = x=>x){
    let createHandler = new DataHandler(async x => {
        if (x[0] == null || x[1] == null){
            return null;
        }
        let obj = new type(x[0], userId, x[1]);
        let result = await db.create(obj.toJson(), schema);
        return result;
    });
    let postSanitizingHandler = new DataHandler(x => [x[0], postSanitation(x[1])], createHandler);
    let sanitizingHandler = new DataHandler(x => [x[0], sanitize(x[1])], postSanitizingHandler);
    let existingHandler = new DataHandler(x => db.validateExists("_id", mongoose.Types.ObjectId(x[0]), RentalsSchema) ? x : [null, x[1]], sanitizingHandler);
    let sanitizingIdHandler = new DataHandler(x => [sanitize(x[0]), x[1]], existingHandler);
    let items = null;
    try {
      items = sanitizingIdHandler.handle([id, value]);
    } catch (error) {
      console.log(error);
      items = null;
    }
    return items;
  }
async function getItemsByValue(field, value, schema, regex = true, list=true, postSanitation = x=>x){
    let listRegexHandler = new DataHandler(async x => await db.listByFieldRegex(field, x, schema));
    let listHandler = new DataHandler(async x => await db.listByField(field, x, schema));
    let oneHandler = new DataHandler(async x => await db.getOneByField(field, x, schema));
    let postSanitizingHandler = new DataHandler(x => postSanitation(x), list? regex? listRegexHandler:listHandler : oneHandler);
    let sanitizingHandler = new DataHandler(x => sanitize(x), postSanitizingHandler);
    let existingHandler = new DataHandler(x => x!==undefined?x:null, sanitizingHandler);
    let items = null;
    try {
        items = existingHandler.handle(value);
    } catch (error) {
        console.log(error);
        items = null;
    }
    return items;
}

async function createRating(productId, value, userID){
    let result = await createItem(productId, value, RatingsSchema, Rating, userID, (x) => x > 0 && x <= 5 ? x: null);
    return result;
}
async function createComment(productId, text, userID){
    let result = await createItem(productId, text, CommentsSchema, Comment, userID, (x) => x > 0 && x <= 5 ? x: null);
    return result;
}
async function createRental(productInput){
    let sanitizedProductInput = sanitizer.escapeJSON(sanitize(productInput));
    let product = new Product(sanitizedProductInput.name, sanitizedProductInput.price, sanitizedProductInput.user, sanitizedProductInput.phone, sanitizedProductInput.location, sanitizedProductInput.category, sanitizedProductInput.quantity);
    let result = await db.create(product.toJson(), RentalsSchema);
    return result;
}
async function getRentals(search){
    let rentals = await getItemsByValue("name", search, RentalsSchema);
    return rentals;
}
async function getRentalById(rentalID){
    let rental = await getItemsByValue("_id", rentalID, RentalsSchema, false, false);
    return rental;
}
async function getComments(productId){
    let comments = await getItemsByValue("product", productId, CommentsSchema, false, true, mongoose.Types.ObjectId);
    comments = comments?comments:[];
    comments.map(async comment => {
      delete comment["_id"];
      let commentUser = await db.getOneByField("_id", comment.user, UsersSchema);
      comment.username = commentUser?.username;
  
    });
    return comments;
}
async function getRating(productId){
    let ratings = await getItemsByValue("product", productId, RatingsSchema, false, true, mongoose.Types.ObjectId);
    ratings = ratings ? ratings : [];
    const sum = ratings.reduce((a, b) => a + b.value, 0);
    const avg = (sum / ratings.length) || 0;
    return avg;
}

  module.exports = {createComment, createRental, createRating, getRentals, getRentalById, getComments, getRating};