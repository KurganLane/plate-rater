var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Rating = mongoose.model('Rating');
var Comment = mongoose.model('Comment');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.param('rating', function(req, res, next, id){
	var query = Rating.findById(id);

	query.exec(function (err, rating){
		if(err) {return next(err);}
		if(!rating) {return next(new Error('can\'t find rating'));}

		req.rating = rating;
		return next();
	});
});

router.get('/ratings/:rating', function(req, res){
	req.rating.populate('comments', function(err, rating){
		if(err){ return next(err);}

		res.json(rating);
	});
});

router.post('/ratings/:rating/comments', function(req, res, next){
	var comment = new Comment(req.body);
	comment.rating = req.rating;

	comment.save(function(err, comment){
		if(err){ return next(err); }

		req.rating.comments.push(comment);
		req.rating.save(function(err, rating){
			if (err){return next(err);}

			res.json(comment);
		});
	});
});

router.get('/ratings', function(req, res, next){
	Rating.find(function(err, ratings){
		if(err){return next(err); }
		res.json(ratings);
	});
});

router.post('/ratings', function(req, res, next){
	var rating = new Rating(req.body);

	rating.save(function(err, rating){
		if(err){return next(err);}

		res.json(rating);
	});
});

module.exports = router;
