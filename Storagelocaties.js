var mongoose = require("mongoose");
var locatieSchema = mongoose.Schema({
            naam_drone: {
                type: String,
                required: true,
                unique: true
            },
            mac_address_drone: {
                type: String,
                required: true,
                unique: true
            },
            naam_locatie: {
                type: String,
                required: true,
                unique: true
            },
            beschrijving: {
                type: String,
                required: true
            }
});
var Locatie = module.exports = mongoose.model('Locatie', locatieSchema);

module.exports = {

    AllLocaties : function(callback) {
        Locatie.find(callback);
    },
    findLocaties : function(id, callback){
        Locatie.find({naam_drone:id}, callback);
    },
    saveLocaties: function (locatie, callback) {
        Locatie.create(locatie, callback);
    },
    updateLocaties: function (id, locatie, callback) {
        Locatie.findOneAndUpdate({naam_drone:id}, locatie , callback);
    }
};

