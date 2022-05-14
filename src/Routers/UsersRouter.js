const express = require('express');
const router = express.Router();
const db = require("../db/db.js");
const bodyParser = require("body-parser");
const auth = require("../utils/auth.js");

router.use(bodyParser.json());

router.post("/user_info/", auth.checkAuthenticated, async function(req, res){
  res.send(req.user);
});

router.post("/user_rentals/", auth.checkAuthenticated, async function(req, res){
  try {
    let rentals = await db.listRentals({email: req.user.email});  
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
  console.log(req.body);
  let result = db.removeRental(req.body);
  res.send(result);
});


module.exports = router;