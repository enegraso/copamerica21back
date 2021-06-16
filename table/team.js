"use strict";

const { text } = require("express");
const ADODB = require("node-adodb");
const connection = ADODB.open(
  "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=copamerica.mdb;"
);

let anda;
let datos = {};
var equipos = {};
var partidos = {};
var resultado = {}
var tabla = {}
var agregada = false
var borrado = false


module.exports = {
  listTeams: async function () {
    try {
      const teams = await connection.query("SELECT * FROM teams");
      equipos = teams;
      // console.log(JSON.stringify(users, null, 2));
    } catch (error) {
      console.error(error);
    }
    // console.log(usuarios)
    return equipos;
  },
  listMatches: async function () {
    try {
      const matches = await connection.query("SELECT * FROM viewMatches order by dateMatch");
      partidos = matches;
      // console.log(JSON.stringify(users, null, 2));
    } catch (error) {
      console.error(error);
    }
    // console.log(usuarios)
    return partidos;
  },
  listResults: async function () {
    try {
      const matches = await connection.query("SELECT * FROM viewMatches where matchStatus='done' order by dateMatch Desc");
      partidos = matches;
      // console.log(JSON.stringify(users, null, 2));
    } catch (error) {
      console.error(error);
    }
    // console.log(usuarios)
    return partidos;
  },
  listPositions: async function () {
    try {
      const matches = await connection.query("SELECT * FROM teams order by score Desc");
      tabla = matches;
      // console.log(JSON.stringify(users, null, 2));
    } catch (error) {
      console.error(error);
    }
    // console.log(usuarios)
    return tabla;

  },
  addProde: async function (userid, matchid, lresult, vresult, mresult) {
    let textinto = 'INSERT INTO prode (userid, matchid, hostresult, guestresult, matchresult) VALUES ("' + userid + '","' + matchid + '","' + lresult + '","' + vresult + '","' + mresult + '")';
    console.log(userid, matchid, lresult, vresult, mresult);
/*     var repetido = usuarios.find(u => u.usuario === user)
    console.log(repetido)
    if (repetido) return { msg: "☢ Usuario repetido" }; */
    try {
      const users = await connection.execute(textinto);
      resultado = users
      agregada = true;
      // console.log(JSON.stringify(users, null, 2));
    } catch (error) {
      agregada = false;
      console.error(error);
    }
    console.log(agregada);
    if (agregada) return { msg: "Se agrego el pronóstico correctamente" };
    else return { msg: "☢ No se pudo agregar pronostico" };
  },
  addResult: async function (matchid, lresult, vresult, mresult) {
    let textinto = 'INSERT INTO matches ( matchid, hostresult, guestresult, matchresult) VALUES ("' + userid + '","' + matchid + '","' + lresult + '","' + vresult + '","' + mresult + '")';
    console.log(userid, matchid, lresult, vresult, mresult);
/*     var repetido = usuarios.find(u => u.usuario === user)
    console.log(repetido)
    if (repetido) return { msg: "☢ Usuario repetido" }; */
    try {
      const users = await connection.execute(textinto);
      resultado = users
      agregada = true;
      // console.log(JSON.stringify(users, null, 2));
    } catch (error) {
      agregada = false;
      console.error(error);
    }
    console.log(agregada);
    if (agregada) return { msg: "Se agrego el pronóstico correctamente" };
    else return { msg: "☢ No se pudo agregar pronostico" };
  },
}