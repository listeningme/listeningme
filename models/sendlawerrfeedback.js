'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var sendlawerrfeedbackSchema = new Schema({
	lawid:        String,
	type_sel:     String,
	content:      String,
	email:        String,
	updateAt:   	       {type: Date, default: Date.now},
	createAt:              {type: Date, default: Date.now},
});
mongoose.model('Sendlawerrfeedback', sendlawerrfeedbackSchema);
