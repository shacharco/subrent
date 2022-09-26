const express = require('express');
const path = require('path');
const router = express.Router();
const db = require("../db/db.js");
const RentalsSchema = require("../db/schemas/RentalsSchema.js");
const CommentsSchema = require("../db/schemas/CommentsSchema.js");
const RatingsSchema = require("../db/schemas/RatingsSchema.js");
const bodyParser = require("body-parser");
const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');
const { findById } = require('../db/schemas/RentalsSchema.js');
const UsersSchema = require('../db/schemas/UsersSchema.js');
const {DataHandler} = require("../utils/data.js");

router.use(bodyParser.json());

router.get("/find/", async function(req, res){
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// TODO: make it return the handlers chain, and make it possible to add handlers to the end of the chains
// TODO: make it get a handler instead of regex,list and derive the handler from that.
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

router.post("/rentals/", async function(req, res){
  let rentals = await getItemsByValue("name", req.body.search, RentalsSchema);
  res.send(rentals?rentals:[]);
});

router.post("/rental/", async function(req, res){
  let rental = await getItemsByValue("_id", req.body.id, RentalsSchema, false, false);
  res.send(rental?rental:{});
});

router.post("/comments/", async function(req, res){
  let comments = await getItemsByValue("product", req.body.product?._id, CommentsSchema, false, true, mongoose.Types.ObjectId);
  comments = comments?comments:[];
  comments.map(async comment => {
    delete comment["_id"];
    let commentUser = await db.getOneByField("_id", comment.user, UsersSchema);
    comment.username = commentUser?.username;

  });
  res.send(comments);
});

router.post("/ratings/", async function(req, res){
  let ratings = await getItemsByValue("product", req.body.product?._id, RatingsSchema, false, true, mongoose.Types.ObjectId);
  ratings = ratings ? ratings : [];
  const sum = ratings.reduce((a, b) => a + b.value, 0);
  const avg = (sum / ratings.length) || 0;
  res.send({rating: avg});
});

module.exports = router;