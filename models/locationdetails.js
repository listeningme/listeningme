'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var locationdetailsSchema = new Schema({
	name_zh:        String,
	name_en:      String,
	updateAt:   	{type: Date, default: Date.now},
	createAt:     {type: Date, default: Date.now},
});
mongoose.model('Locationdetails', locationdetailsSchema);
