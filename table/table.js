"use strict";

const { text } = require("express");
const ADODB = require("node-adodb");
const connection = ADODB.open(
  "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=copamerica.mdb;"
);

let anda;
let datos = {};
var usuarios = {};
var agregada = false;
var borrado = false


module.exports = {
  listUsers: async function () {
    try {
      const users = await connection.query("SELECT * FROM Users");
      usuarios = users;
      // console.log(JSON.stringify(users, null, 2));
    } catch (error) {
      console.error(error);
    }
    // console.log(usuarios)
    return usuarios;
  },

  addUser: async function (user, pass) {
    let textinto =
      'INSERT INTO Users (usuario, clave) VALUES ("' +
      user +
      '","' +
      pass +
      '")';
    console.log(user, pass, textinto);
    var repetido = usuarios.find(u => u.usuario === user)
    console.log(repetido)
    if (repetido) return { msg: "☢ Usuario repetido" };
    try {
      const users = await connection.execute(textinto);
      usuarios.push({"usuario":user})
      agregada = true;
      // console.log(JSON.stringify(users, null, 2));
    } catch (error) {
      agregada = false;
      console.error(error);
    }
    console.log(agregada);
    if (agregada) return { msg: "Se agrego el usuario correctamente" };
    else return { msg: "☢ No se pudo agregar usuario" };
  },
  delUser: async function (user, pass) {
    let textinto =
      'Delete from Users where usuario="' + user + '" and clave="' + pass + '"';
    console.log(user, pass, textinto);
    try {
      const users = await connection.execute(textinto);
      usuarios = usuarios.filter(u => u.usuario !== user)
      borrado = true;
      // console.log(JSON.stringify(users, null, 2));
    } catch (error) {
      borrado = false;
      console.error(error);
    }
    console.log(borrado);
    if (borrado) return { msg: "Se borro el usuario correctamente" };
    else return { msg: "☢ No se pudo borrar usuario" };

  },
};

// query();
