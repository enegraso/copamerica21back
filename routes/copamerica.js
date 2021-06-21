"use strict";

var express = require("express");
var router = express.Router();
var tables = require("../table/table");

module.exports = router;

router.get("/users", (req, res) => {
  // res.status(200)
  var result = tables.listUsers();
  result
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
});

// get user when login
router.get("/user", (req, res) => {
  const {name, pass} = req.query
  var result = tables.getUser(name, pass);
  result
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
});

// register user
router.post("/users", (req, res) => {
  const { name, pass } = req.body;
  var result = tables.addUser(name, pass);
  console.log(result)
  result 
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
});

router.delete("/users", (req, res) => {
  const { name, pass } = req.body;
  var result = tables.delUser(name, pass);
  result
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
});
