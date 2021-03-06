'use strict';

module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	var LocationSchema = new Schema({
		x: Number,
		y: Number,
		statute: {
			  url:String,
			division:Number,
			division_text:String,
			title:Number,
			title_text:String,
			chapter:Number,
			chapter_text:String,
			section:String,
			section_text:String,
			text:[String],
			refs:[String]
		}
	});

	mongoose.model('Location', LocationSchema, 'hrs-locations');

	return this;
}
