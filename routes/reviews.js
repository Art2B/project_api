var express = require('express');
var router = express.Router();

var reviews = [
  {
    id: 1,
    name: 'MacDo',
    placeType: 'Fastfood',
    stars: 3
  }, {
    id: 2,
    name: 'KFC',
    placeType: 'Fastfood',
    stars: 3
  }, {
    id: 3,
    name: 'L\'été en pente douce',
    placeType: 'restaurant',
    stars: 6
  }, {
    id: 4,
    name: 'Café du Commerce',
    placeType: 'bar',
    stars: 8
  }
];

router.get('/', function(req, res, next) {
  res.send(reviews);
});
router.get('/:index', function(req, res, next){
  res.send(reviews[req.params.index]);
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