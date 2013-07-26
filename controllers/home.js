'use strict';

//var config = require('../config');
var models = require('../models/index.js');
var utils = require('../lib/util');
var request = require('request');
var querystring = require("querystring");
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
function indexlaws(req, res, next) {
	var query = models.Lawdetails.find({});
	 query.exec(function(error, results){
        if(results != ''){
       		res.send(results)
        }
    });
}
//查詢結果
function search(req, res, next) {
    // var general = decodeURIComponent(req.query.general)
    var general = req.query.general;
    general = general.split(',');
    var tag =req.query.tag;
    tag = tag.split(',');
    console.log(general);
    if(req.query.general!=[ 'null' ] && req.query.tag == [ 'null' ]){
      var query = models.Lawdetails.find({location:req.query.location,"$or":[{title:new RegExp('('+general.join('|')+')')},{content:new RegExp('('+general.join('|')+')')}]});
      query.exec(function(error, results){
        console.log(error);
        if(results != ''){
          res.send(results)
        }else{
          res.send('none');
        }
      });
    }
    else if(req.query.general!=[ 'null' ] && req.query.tag != [ 'null' ]){
      var query = models.Lawdetails.find({location:req.query.location,firsttag:tag,"$or":[{title:new RegExp('('+general.join('|')+')')},{content:new RegExp('('+general.join('|')+')')}]});
      query.exec(function(error, results){
        if(results != ''){
          res.send(results)
          //console.log(results)
        }else{
          res.send('none');
        }
      });
    }
    else if(req.query.general==[ 'null' ] && req.query.tag == [ 'null' ]){
      var query = models.Lawdetails.find({location:req.query.location});
      query.exec(function(error, results){
        if(results != ''){
          res.send(results)
          //console.log(results)
        }else{
          res.send('none');
        }
      });
    }
    else if(req.query.general==[ 'null' ] && req.query.tag != [ 'null' ]){
      var query = models.Lawdetails.find({firsttag:tag,location:req.query.location});
      query.exec(function(error, results){
        if(results != ''){
          res.send(results)
          console.log(results)
        }else{
          res.send('none');
        }
      });
    }
}
function lawDetails(req, res, next) {
  console.log(req.query._id);
	var query = models.Lawdetails.find({_id:req.query._id});
	 query.exec(function(error, results){
        if(results != ''){
          console.log(results);
       		res.send(results)
        }
    });
}
function lawListsOnSameLocation(req, res, next) {
	var query = models.Lawdetails.find({'location':req.body.location});
	 query.exec(function(error, results){
        if(results != ''){
       		res.send(results)
        }
    });
}
function location(req, res, next) {
	var query = models.Locationdetails.find({});
	 query.exec(function(error, results){
       //console.log(results)
       if(results != ''){
       		res.send(results)
       }
    });
}
function UnitsOnSameLocation(req, res, next) {
	var query = models.Unitdetails.find({'location':req.body.location});
	 query.exec(function(error, results){
       if(results != ''){
       		res.send(results)
       }
    });
}
function noResaultFeedBack(req,res,next){
  (new models.Noresaultfeedback({
    goSearchArrTag:req.body.goSearchArrTag,
    goSearchArrGeneral:req.body.goSearchArrGeneral,
    goSearchArrLocation:req.body.goSearchArrLocation,
  })).save(utils.checkError(next, function () {
    res.end('success');
  }));
}

module.exports = {
  index: indexAction,
  indexlaws:indexlaws,
  search:search,
  lawDetails:lawDetails,
  lawListsOnSameLocation:lawListsOnSameLocation,
  location:location,
  UnitsOnSameLocation:UnitsOnSameLocation,
  noResaultFeedBack:noResaultFeedBack
};
