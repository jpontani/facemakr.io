
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Watchfaces = new Schema({
    name: {
        type: String
    },
    layers: [Layers]
});
