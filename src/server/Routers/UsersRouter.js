const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../utils/auth.js");
const path = require('path');
const user = require("../components/user");

router.use(bodyParser.json());

router.get("/currentUser/", auth.checkAuthenticated, async function(req, res){
  res.send(req.user);
});

router.get("/userRentals/", auth.checkAuthenticated, async function(req, res){
  try {
    let rentals = await user.getUserRentals(req.user.email);
    res.send(rentals);
  } catch(error) {
    console.log(error);
    res.send([]);
  }
});

router.get("/user/", auth.checkAuthenticated, async function(req, res){
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

router.delete("/item", async function(req, res){
  let result = await user.removeUserRental(req.body);
  res.send(result);
});

router.get("/userInfo", async function(req, res){
  try {
    let userResult = await user.getUserByEmail(req.query.email);
    if(userResult) {
      res.send(userResult);
    } else {
      res.send(undefined);
    }
  } catch(error) {
    console.log(error);
    res.send(undefined);
  }

});

module.exports = router;