var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var reviewSchema = require('../database/review');
var Review = mongoose.model('Review', reviewSchema);

// GET Routes
router.get('/', function(req, res, next) {
  Review.find({}, function(err, data){
    if(err){
      res.status(500).send({'error': err});
    } else {
      if(req.get('Accept').indexOf("html") >= 0){
        res.render('reviews', {reviews: data});
      } else {
        res.status(200).json(data);
      }
    }
  });
});
router.get('/topPlaces', function(req, res, next) {
  Review.find().sort({stars: 'desc'}).limit(3).exec(function(err, data){
    if(err){
      res.status(500).send({'error': err});
    } else {
      if(req.get('Accept').indexOf("html") >= 0){
        res.render('reviews', {reviews: data});
      } else {
        res.status(200).json(data);
      }
    }
  });
});
router.get('/new', function(req, res){
  if(req.get('Accept').indexOf("html") >= 0){
    res.render('newReview');
  }
});
router.get('/edit/:id', function(req, res){
  Review.find({'_id': req.params.id}, function(err, data){
    if(err){
      res.status(500).send({'error': err});
    } else {
      if(req.get('Accept').indexOf("html") >= 0) {
        res.render('editReview', {review: data[0]});
      }
    }
  });
});
router.get('/search', function(req, res){
  var params = {};
  if(req.query.name){
    params.name = req.query.name;
  }
  if(req.query.placeType){
    params.placeType = req.query.placeType;
  }
  if(req.query.stars){
    params.stars = req.query.stars;
  }

  if(req.get('Accept').indexOf("html") >= 0){
    res.render('searchReview')
  } else {
    Review.find(params, function(err, data){
      if(err){
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    });
  }

});
router.get('/:id', function(req, res, next){
  Review.find({'_id': req.params.id}, function(err, data){
    if(err){
      res.status(500).send({'error': err});
    } else {
      if(req.get('Accept').indexOf("html") >= 0){
    res.render('singleReview', {review: data[0]});
  } else {
        res.status(200).json(data);
      }
    }
  });
});

// POST Routes
router.post('/new', function(req, res, next){
  var newReview = new Review(req.query);
  newReview.save(function (err) {
    if (err) return res.status(500).send({'error': err});
  });
  res.status(201).json({message: 'review added'});
});

// PUT Routes
router.put('/edit/:id', function(req, res){
  Review.update({_id: req.params.id}, req.query, function(err, data){
    if(err){
      res.status(500).send({'error': err});
    } else {
      res.status(201).json ({message: 'review updated'});
    }
  });
});

// DELETE Routes
router.delete('/delete', function(req, res, next){
  Review.remove({}, function(err, data){
    if(err){
      res.status(500).send({'error': err});
    } else {
      res.status(204).json({message: 'database deleted'});
    }
  });
});
router.delete('/delete/:id', function(req, res, next){
  Review.remove({_id: req.params.id}, function(err, data){
    if(err){
      res.status(500).send({'error': err});
    } else {
      res.status(204).json({message: 'review deleted'});
    }
  });
});

module.exports = router;