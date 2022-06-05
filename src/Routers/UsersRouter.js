const express = require('express');
const router = express.Router();
const db = require("../db/db.js");
const bodyParser = require("body-parser");
const auth = require("../utils/auth.js");
const sanitize = require('mongo-sanitize');

router.use(bodyParser.json());

router.post("/user_info/", auth.checkAuthenticated, async function(req, res){
  res.send(req.user);
});

router.post("/user_rentals/", auth.checkAuthenticated, async function(req, res){
  try {
    let rentals = await db.listRentals({email: sanitize(req.user.email)});  
    res.send(rentals);
  } catch(error) {
    console.log(error);
    res.send([]);
  }
});

router.get("/user/", auth.checkAuthenticated, async function(req, res){
  res.render("users", {});
});

router.post("/removeItem", function(req, res){
  console.log(sanitize(req.body));
  let result = db.removeRental(sanitize(req.body));
  res.send(result);
});


module.exports = router;