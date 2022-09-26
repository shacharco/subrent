const express = require('express');
const router = express.Router();
const db = require("../db/db.js");
const RentalsSchema = require("../db/schemas/RentalsSchema.js");
const UsersSchema = require("../db/schemas/UsersSchema.js");
const bodyParser = require("body-parser");
const auth = require("../utils/auth.js");
const sanitize = require('mongo-sanitize');
const path = require('path');

router.use(bodyParser.json());

router.post("/user_info/", auth.checkAuthenticated, async function(req, res){
  res.send(req.user);
});

router.post("/user_rentals/", auth.checkAuthenticated, async function(req, res){
  try {
    let rentals = await db.list({email: sanitize(req.user.email)}, RentalsSchema);  
    res.send(rentals);
  } catch(error) {
    console.log(error);
    res.send([]);
  }
});

router.get("/user/", auth.checkAuthenticated, async function(req, res){
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

router.post("/removeItem", function(req, res){
  console.log(sanitize(req.body));
  let result = db.remove(sanitize(req.body), RentalsSchema);
  res.send(result);
});

router.post("/user", async function(req, res){
  try {
    let user = await db.getOneByField("email", sanitize(req.body.email), UsersSchema);
    if(user) {
      res.send(user);
    } else {
      res.send(undefined);
    }
  } catch(error) {
    console.log(error);
    res.send(undefined);
  }

});

module.exports = router;