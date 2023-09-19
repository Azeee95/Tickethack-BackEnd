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

    Trip.find({departure : dep, arrival: arr}).then(searchdata => 
            
        {

            if (searchdata[0]) {

            for (let obj of searchdata) {

                let newDate = new Date (obj.date)

                if (moment(dateTrip).format('L') == moment(newDate).format('L')) {

                    resultTrips.push(obj);
                    resultTrips[0].Message = 'Trips found';
                    console.log(resultTrips[(resultTrips.length-1)]) 
                    console.log(moment(newDate).format('LT'));
                    console.log('-------------------------')

                } 

            }

        }
    
        res.json(resultTrips);

    });
    
  });

  router.post('/updatecart', function(req, res, next) {

    let dep = req.body.departure;
    let arr =  req.body.arrival;
    let dateParam = req.body.date;

    let dateTrip = new Date(dateParam)

    Trip.updateOne(
        { departure : dep, arrival : arr},
        { bookings: false }
       ).then(() => {
        
        Trip.find().then(data => {
          console.log(data);
        });
       
       });




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