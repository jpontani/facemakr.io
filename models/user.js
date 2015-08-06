
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
});
