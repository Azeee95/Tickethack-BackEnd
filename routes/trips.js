var express = require('express');
var router = express.Router();
const Trip = require ('../models/trips')

router.get('/', function(req, res, next) {

    Trip.find().then(data => 
        
        { 
        res.json(data); 
    });

  });


  router.post('/new', function(req, res, next) {

    const newTrip = new Trip ({

        departure: req.body.departure,
        arrival: req.body.arrival,
        date: {$date:req.body.date},
        price: req.body.price
    
      })
    
      newTrip.save().then(() => {
    
        res.json('New trip added')
      });
  });


  module.exports = router;