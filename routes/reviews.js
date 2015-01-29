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
      res.status(200).send(data);
    }
  });
});
router.get('/:id', function(req, res, next){
  Review.find({'_id': req.params.id}, function(err, data){
    if(err){
      res.status(500).send({'error': err});
    } else {
      res.status(200).send(data);
    }
  });
});

router.post('/new', function(req, res, next){
  var newReview = new Review(req.query);
  newReview.save(function (err) {
    if (err) return res.status(500).send({'error': err});
  });
  res.status(201).json({message: 'review added'});
});

router.put('/edit/:id', function(req, res){
  Review.update({_id: req.params.id}, req.body, function(err, data){
    if(err){
      res.status(500).send({'error': err});
    } else {
      res.status(201).json ({message: 'review updated'});
    }
  });
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