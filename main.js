var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var dallocaties = require('./Storagelocaties.js');
var validatelocaties = require('./Validatelocaties.js');
var dalaanwezigheden = require('./Storageaanwezigheden.js');
var validateaanwezigheden = require('./Validateaanwezigheden.js');

var app = express();
mongoose.connect('mongodb://localhost:27017/API');
app.use(bodyparser.json());

//------ alles van locaties ------ (Opdracht 5)
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

// opvangen van een POST op /locaties. 
app.post("/locaties", function(request, response) {
    // de data in de body wordt toegekend aan onze locatie variabele.
    // deze is enkel opgevuld indien het JSON is.
    var locatie = request.body;
    // Valideren dat velden bestaan
    var errors = validatelocaties.fieldsNotEmpty(locatie, "naam_drone", "mac_address_drone", "naam_locatie", "beschrijving");
    if (errors) {
        response.status(400).send({
            msg: "Volgende velden zijn verplicht of fout: " + errors.concat()
        });
        return;
    }
    /*
    // Valideren dat we niet dezelfde locatie 2x hebben
    var existingLocatie = dal.findLocatie(locatie.naam_drone);
    if (existingLocatie) {
        response.status(409).send({
            msg: "Naam_drone moet uniek zijn!",
            link: "../locaties/" + existingLocatie.id
        });
        return;
    }
    Dit hoeft niet meer omdat we met moongoose zeggen dat ze uniek of niet uniek moeten zijn
    */
    dallocaties.saveLocaties(locatie, function(err, locatie) {
        if(err){
            throw err;
        }
        response.send(locatie);
    });
});

//----- alles van aanwezigheden ----- (Opdraccht 5)
// opvangen van een GET op /aanwezigheden
app.get('/aanwezigheden', function (request, response) {
    dalaanwezigheden.AllAanwezigheden(function (err, aanwezig) {
        if(err){
            throw err;
        }
        response.send(aanwezig);
    });
});

// opvangen van een GET op /aanwezigheden/:ID
app.get('/aanwezigheden/:id', function (request, response) {
    dalaanwezigheden.findAanwezigheden(request.params.id, function (err, aanwezig) {
        if (aanwezig) {
        response.send(aanwezig);
    } else {
        throw err;
    }
    });
});

// opvangen van een POST op /aanwezigheden. 
app.post("/aanwezigheden", function(request, response) {
    // de data in de body wordt toegekend aan onze locatie variabele.
    // deze is enkel opgevuld indien het JSON is.
    var personen = request.body;
    // Valideren dat velden bestaan
    var errors = validateaanwezigheden.fieldsNotEmpty(personen, "ID", "naam_drone", "aantal", "naam_locatie", "uur");
    if (errors) {
        response.status(400).send({
            msg: "Volgende velden zijn verplicht of fout: " + errors.concat()
        });
        return;
    }
    dalaanwezigheden.saveAanwezigheden(personen, function(err, personen) {
        if(err){
            throw err;
        }
        response.send(personen);
    });
});


app.listen(4567);
console.log("server is opgestart...");