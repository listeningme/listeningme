'use strict';

var config = require('../config');
var models = require('../models/index.js');
var utils = require('../lib/util');
var request = require('request');

// function indexAction(req, res, next) {
//   request('http://listening-api.g0v.tw/api/tags.json', 
//     utils.checkError(next, function (err, _res, body) {
//       var alltag = JSON.parse(body);
//       // err should be null
//       var query = models.synonyms.find({});
//       query.exec(utils.checkError(next, function (err, qresults) {
//         for (var y in qresults){  
//           var tags = {}; tags.tag = {};
//           tags.tag.value_zh = qresults[y].synonyms;
//           tags.tag.value = qresults[y].tags;
//           alltag.push(tags);
//         }
//         var query2 = models.Helpme.find({}).sort({"updatedAt": -1}).limit(3);
//         query2.exec(utils.checkError(next, function (reqq, results) {
//           res.render('index2', {
//             data: results,
//             alltag:alltag,
//             title:config.title,
//           });
//         }));
//       }));
//     }));
// }
function indexAction(req, res, next) {
  res.render('index');
}

module.exports = {
  index: indexAction
};
