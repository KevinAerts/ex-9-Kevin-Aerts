var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var dallocaties = require('./Storagelocaties.js');
var validatelocaties = require('./Validatelocaties.js');


var app = express();
app.use(bodyparser.json());














app.listen(4567);
console.log("server is opgestart...");

