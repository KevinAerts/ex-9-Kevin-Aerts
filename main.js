var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var dallocaties = require('./Storagelocaties.js');
var validatelocaties = require('./Validatelocaties.js');


var app = express();
mongoose.connect('mongodb://localhost:27017/API');
app.use(bodyparser.json());

//------ alles van locaties ------
// opvangen van een GET op /locaties
app.get('/locaties', function (request, response) {
    dallocaties.AllLocaties(function (err, locatie) {
        if(err){
            throw err;
        }
        response.send(locatie);
    });
});

// opvangen van een GET op /locaties/:naam_drone
app.get('/locaties/:id', function (request, response) {
    dallocaties.findLocaties(request.params.id, function (err, locatie) {
        if (locatie) {
        response.send(locatie);
    } else {
        throw err;
    }
    });
});



app.listen(4567);
console.log("server is opgestart...");

