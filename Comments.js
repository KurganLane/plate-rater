var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	body: String,
	rating: {type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}
});

mongoose.model('Comment', CommentSchema);