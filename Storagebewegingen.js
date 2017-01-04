var mongoose = require("mongoose");
var bewegingSchema = mongoose.Schema({
            bewegingid: {
                type: Number,
                required: true,
                unique: true
            },
            beginlocatie: {
                naam_drone: { type: String },
                datum_vertrek: { type: Date}
            },
            eindlocatie: {
                naam_drone: { type: String },
                datum_aankomst: { type: Date}
            },
            duur: {
                type: Number,
                required: true
            },
            weer: {
                type: String
            },
            beweging: {
                type: Boolean,
                required: true
            }
});

var Beweging = module.exports = mongoose.model('Beweging', bewegingSchema);

module.exports = {
    AllBewegingen : function(callback) {
        Beweging.find(callback);
    },

    findBewegingen : function(id, callback){
        Beweging.find({bewegingid:id}, callback);
    },
    
    saveBewegingen: function (beweging, callback) {
        Beweging.create(beweging, callback);
    }

};
