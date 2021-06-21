"use strict";

var express = require("express");
var router = express.Router();
var teams = require("../table/team");

module.exports = router;

router.get("/teams", (req, res) => {
    // res.status(200)
    var result = teams.listTeams();
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

router.get("/matches", (req, res) => {
    // res.status(200)
    var result = teams.listMatches();
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

  router.get("/results", (req, res) => {
    // res.status(200)
    var result = teams.listResults();
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

  router.get("/positions", (req, res) => {
    // res.status(200)
    var result = teams.listPositions();
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

  router.post("/prode", (req, res) => {
    // res.status(200)
    var mresult = ""
    const { userid, matchid, lresult, vresult} = req.body
    if (!userid) {
      res.status(400)
      res.send({"error":"Debe ingresar el usuario"})
    }
    if (!matchid) {
      res.status(400)
      res.send({"error":"Debe ingresar el partido a pronosticar"})
    }
    if (lresult > vresult) mresult = "L"
    else if (lresult < vresult) mresult = "V"
    else mresult = "E"
    var result = teams.addProde(userid, matchid, lresult, vresult, mresult);
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

  router.put("/results", (req, res) => {
    // res.status(200)
    var mresult = ""
    const { matchid, lresult, vresult} = req.body
    if (!matchid) {
      res.status(400)
      res.send({"error":"Debe ingresar el partido"})
    }
    if (lresult > vresult) mresult = "L"
    else if (lresult === vresult) mresult = "E"
    else mresult = "V"
    var result = teams.addResult(matchid, lresult, vresult, mresult);
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

  router.get("/prodes", (req, res) => {
    const {iduser, idmatch} = req.query
    var result = teams.listProde(iduser,idmatch);
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

  router.get("/pronos", (req, res) => {
	const iduser = req.query.iduser
    var result = teams.listPronos(iduser);
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