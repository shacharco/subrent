const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../db/db.js");
const RentalsSchema = require("../db/schemas/RentalsSchema.js");
const UsersSchema = require("../db/schemas/UsersSchema.js");
const sanitize = require('mongo-sanitize');
const sanitizer = require("../utils/sanitize.js")
const auth = require("../utils/auth.js");
const mongoose = require('mongoose');
const CommentsSchema = require('../db/schemas/CommentsSchema.js');
const Comment = require("../components/Comment.js").Comment;
const RatingsSchema = require('../db/schemas/RatingsSchema.js');
const Rating = require("../components/Rating.js").Rating;
const {DataHandler} = require("../utils/data.js");

router.use(bodyParser.json());

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

router.get("/post/", function(req, res){
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});
router.post("/rent", async function(req, res){
    let result = await db.create(sanitizer.escapeJSON(sanitize(req.body)), RentalsSchema);
    res.send(!!result);
});

router.post("/comment", auth.checkAuthenticated ,async function(req, res){
    let result = await createItem(req.body?.product?._id, req.body.comment, CommentsSchema, Comment, req.user?._id, (x) => x.length != 0 ? x: null);
    if(!result){
        res.status(404);
    }else{
        res.send(!!result);
    }
});
router.post("/rating", auth.checkAuthenticated ,async function(req, res){
    let result = await createItem(req.body?.product?._id, req.body.value, RatingsSchema, Rating, req.user?._id, (x) => x > 0 && x <= 5 ? x: null);
    if(!result){
        res.status(404);
    }else{
        res.send(!!result);
    }
});

router.get("/card/", function(req, res){
    res.render("card", {});
});
router.post("/edit/", function(req, res){
    res.render("card", {});
});

module.exports = router;