var express = require('express');
var router = express.Router();

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
  res.send(reviews);
});

router.post('/new', function(req, res, next){
  var newReview = req.query;
  reviews.push(newReview);
  res.json({message: 'review added'});
});

router.delete('/delete', function(req, res, next){
  reviews = [];
  res.json({message: 'all reviews deleted'});
});

module.exports = router;