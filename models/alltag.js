'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var alltagSchema = new Schema({
	first_name_en:         String,
	second_name_en:       [String],
	third_name_en:        [String],
	updateAt:   		  {type: Date, default: Date.now},
	createAt:      		  {type: Date, default: Date.now},
});
mongoose.model('Alltag', alltagSchema);
