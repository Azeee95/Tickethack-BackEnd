var express = require('express');
var router = express.Router();
const Trip = require ('../models/trips')
const moment = require('moment')

router.get('/', function(req, res, next) {

    Trip.find().then(data => 
        
        { 
        res.json(data); 
    });

  }); 

router.post('/search', function(req, res, next) {

    let dep = req.body.departure;
    let arr =  req.body.arrival;
    let dateParam = req.body.date;

    let dateTrip = new Date(dateParam)
    let resultTrips = [{Message : 'No trip found'}]

    Trip.find({departure : {$regex: new RegExp(dep, 'i')}, arrival: {$regex: new RegExp(arr, 'i')}}).then(searchdata => 
            
        {

            if (searchdata[0]) {

            for (let obj of searchdata) {

                let newDate = new Date (obj.date)

                if (moment(dateTrip).format('L') == moment(newDate).format('L')) {

                    resultTrips.push(obj);
                    resultTrips[0].Message = 'Trips found';
                } 

            }

        }

            res.json(resultTrips);

    });
    
  });

  // Ajout au panier

  router.post('/addcart', function(req, res, next) {

    let id = req.body._id;

    Trip.updateOne(
        { _id : id},
        { cart: true }
       ).then (() => {

        res.json('Trip added to Cart');

       });



  })

// Suppression du panier

router.post('/deletecart', function(req, res, next) {

    let id = req.body._id;

    Trip.updateOne(
        { _id : id},
        { cart: false }
       ).then (() => {

        res.json('Trip deleted from Cart');

       });


  })

  // Ajout au Bookings

  router.post('/addbookings', function(req, res, next) {

    let id = req.body._id;

    Trip.updateOne(
        { _id : id},
        { bookings: true }
       ).then (() => {

        res.json('Trip added to Bookings');

       });;


  })
  

  router.get('/cart', function(req, res, next) {

    Trip.find({cart : true}).then(data => 
        
        { 
        res.json(data); 
    });

  }); 


  router.get('/bookings', function(req, res, next) {

    Trip.find({bookings : true}).then(data => 
        
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