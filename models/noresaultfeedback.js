'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var noresaultfeedbackSchema = new Schema({
	goSearchArrTag:        [String],
	goSearchArrGeneral:    [String],
	goSearchArrLocation:   [String],
	updateAt:   	       {type: Date, default: Date.now},
	createAt:              {type: Date, default: Date.now},
});
mongoose.model('Noresaultfeedback', noresaultfeedbackSchema);
