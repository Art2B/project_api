var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var reviewSchema = require('../database/review');
var Review = mongoose.model('Review', reviewSchema);

var reviews = [
  {
    name: 'MacDo',
    placeType: 'Fastfood',
    stars: 3
  }, {
    name: 'KFC',
    placeType: 'Fastfood',
    stars: 3
  }, {
    name: 'L\'été en pente douce',
    placeType: 'restaurant',
    stars: 6
  }, {
    name: 'Café du Commerce',
    placeType: 'bar',
    stars: 8
  }
];

router.get('/', function(req, res, next) {
  Review.find({}, function(err, data){
    if(err){
      res.status(500).send({'error': err});
    } else {
      res.send(data);
    }
  });
});
router.get('/:index', function(req, res, next){
  res.send(reviews[req.params.index]);
});

router.post('/new', function(req, res, next){
  var newReview = req.query;
  reviews.push(newReview);
  res.json({message: 'review added'});
});
router.put('/edit/:index', function(req, res){
  reviews[req.params.index] = req.query;
  res.json ({message: 'review updated'});
});


router.delete('/delete', function(req, res, next){
  reviews = [];
  res.json({message: 'all reviews deleted'});
});
router.delete('/delete/:index', function(req, res, next){
  reviews.splice(req.params.index, 1);
  res.json({message: 'review deleted'});
});

module.exports = router;