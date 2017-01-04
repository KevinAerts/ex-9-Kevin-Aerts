var mongoose = require("mongoose");
var aanwezigSchema = mongoose.Schema({
	            ID: {
	                type: Number,
	                required: true,
	                unique: true
	            },
	            naam_drone: {
	                type: String,
	                required: true
	            },
	            aantal: {
	                type: Number,
	                required: true
	            },
	            naam_locatie: {
	                type: String,
	                required: true
	            },
	            uur: {
	                type: String,
	                timestamp: true
	            }
	});

var Aanwezigheid = module.exports = mongoose.model('Aanwezig', aanwezigSchema);

module.exports = {
    AllAanwezigheden : function(callback) {
        Aanwezigheid.find(callback);
    },
    findAanwezigheden : function(id, callback){
        Aanwezigheid.find({ID:id}, callback);
    },
    saveAanwezigheden: function (aanwezig, callback) {
        Aanwezigheid.create(aanwezig, callback);
    }
};

        

