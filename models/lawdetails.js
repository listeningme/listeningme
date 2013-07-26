'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var lawdetailsSchema = new Schema({
	//law_id:       {type: Number, index: true}
	title:        		String,
	content:      		String,
	location:     		String,
	unit:         		[String],
	url:          		String,
	blogurl:      		[String],
	max_type:     		String,
	max_content:  		String,
	checklayer:   		{type: Number, default: 0},
	firsttag :    		[String],
	secondtag :   		[String],
	thirdtag :    		[String],
	user_firsttag :     [String],
	user_secondtag :    [String],
	user_thirdtag :     [String],
	updateAt:     		{type: Date, default: Date.now},
	createAt:      		{type: Date, default: Date.now},
});
mongoose.model('Lawdetails', lawdetailsSchema);
