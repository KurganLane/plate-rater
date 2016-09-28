var mongoose = require('mongoose');

var RatingSchema = new mongoose.Schema({
	state: String,
	number: String,
	rating: String,
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('Rating', RatingSchema);