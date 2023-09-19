
const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({

    "departure": String,
    "arrival": String,
    "date": { "$date" : Date},
    "price": Number,
    "cart" : Boolean,
    "bookings" : Boolean


});

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;

