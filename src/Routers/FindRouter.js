const express = require('express');
const path = require('path');
const router = express.Router();
const db = require("../db/db.js");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// define the home page route
router.get("/", function(req, res){
  res.redirect("/find");
});
router.get("/find/", async function(req, res){
  if(req.isAuthenticated()){
    console.log(req.user);
  }
  console.log(req.user)
  res.render("find", {});


});

router.post("/rentals/", async function(req, res){
  let rentals = [];
  if(req.body.search !== undefined){
    const search = req.body.search;
    rentals = await db.listRentalsByName(search);
    for(rental of rentals){
      delete rental["_id"];
    }
  }
  res.send(rentals);
});

module.exports = router;