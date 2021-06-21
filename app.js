'use strict';

var express = require('express');
var morgan = require('morgan')
var cors = require('cors') // solo para visible a dominios externos
var app = express();
var copa = require("./routes/copamerica")
var equipos = require("./routes/teams")

module.exports = app; // Esto es solo para testear mas facil

// app.use(express.json) => PONER LOS PARENTESIS A LA FUNCION (ver línea siguiente)
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(copa)
app.use(equipos)
// El condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
if (!module.parent) app.listen(3001);