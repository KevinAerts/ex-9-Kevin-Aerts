var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());

app.listen(4567);

console.log("server is opgestart...");

