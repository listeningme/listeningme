'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var taoyqlparseSchema = new Schema({
  title:        String,
  content:      String,
  location:     String,
  url:          String,
  unit:         [String]

});



mongoose.model('Taoyqlparse', taoyqlparseSchema);
