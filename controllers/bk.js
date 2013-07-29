'use strict';

//var config = require('../config');
var models = require('../models/index.js');
var utils = require('../lib/util');
var request = require('request');
var YQL = require('yql');

function indexAction(req, res, next) {
  res.render('bk');
}
function getAllTagManage(req, res, next){
	var query = models.Alltag.find({});
	 query.exec(function(error, results){
        if(results != ''){
        	//console.log(results);
       		res.send(results)
        }
    });
}
function addAllTagManageFirstTag(req,res,next){
	(new models.Alltag({
		first_name_en : req.body.first_name_en,
	})).save(utils.checkError(next, function () {
		res.end('success');
	}));
}
function saveThisTagManage(req,res,next){

}
function updateAllTagManage(req,res,next){

}
function getAllFirstTag(req, res, next){
	var query = models.Firsttag.find({});
	 query.exec(function(error, results){
        if(results != ''){
       		res.send(results)
        }
    });
}
function addNewFirstTag(req, res, next){
	(new models.Firsttag({
		name_zh:req.body.name_zh,
		name_en:req.body.name_en
	})).save(utils.checkError(next, function () {
		res.end('success');
	}));
}
function getAllSecondTag(req, res, next){
	var query = models.Secondtag.find({});
	 query.exec(function(error, results){
        if(results != ''){
       		res.send(results)
        }
    });
}
function addNewSecondTag(req, res, next){
	(new models.Secondtag({
		name_zh:req.body.name_zh,
		name_en:req.body.name_en
	})).save(utils.checkError(next, function () {
		res.end('success');
	}));
}
function getAllLaws(req, res, next) {
	var query = models.Lawdetails.find({});
	 query.exec(function(error, results){
        if(results != ''){
       		res.send(results)
        }
    });
}
function getNewLaw(req, res, next){
	var query = models.Lawdetails.find({'_id':req.query._id});
	 query.exec(function(error, results){
        if(results != ''){
        	//console.log(results);
       		res.send(results)
        }
    });
}
function updateEditLaw(req, res, next){
	//console.log(req.body.unit);
	//console.log(req.body.max_content);
	console.log(req.body.secondtag);
	if(!req.body.max_content ){
		req.body.max_content = ''
	}
	if(!req.body.max_type ){
		req.body.max_type = ''
	}
	if(!req.body.title ){
		req.body.title = ''
	}
	if(!req.body.content ){
		req.body.content = ''
	}
	if(!req.body.url ){
		req.body.url = ''
	}
	if(!req.body.location ){
		req.body.location = ''
	}
	if(!req.body.unit ){
		req.body.unit = ''
	}
	if(!req.body.firsttag ){
		req.body.firsttag = ''
	}
	if(!req.body.secondtag){
		req.body.secondtag= ''
	}

	models.Lawdetails.update({ '_id': req.body._id },
	 {$set:{
	 	title : req.body.title,
	 	content : req.body.content,
	 	url : req.body.url,
	 	max_type : req.body.max_type,
	 	max_content : req.body.max_content,
	 	location: req.body.location,
	 	unit: req.body.unit,
	 	firsttag:req.body.firsttag,
	 	secondtag:req.body.secondtag
	 }}, function (err, numberAffected, raw) {
	  //console.log(err);
	  if (err) return handleError(err);

	  if(numberAffected == 1){
	  	res.send({res:true})
	  }else{
	  	res.send({res:false})
	  }
	});
}
function deleteLaw(req,res,next){
	var query = models.Lawdetails.remove({ _id: req.body._id });
	query.exec(function(error, results){
        //console.log(error);
        res.end('success');
    });
}

function addNewLaw(req, res, next) {
	//console.log(req.body.firsttag);
	(new models.Lawdetails({
		title:req.body.title,
		content:req.body.content,
		location:req.body.location,
		unit:req.body.unit,
		url:req.body.url,
		max_type:req.body.max_type,
		max_content:req.body.max_content,
		firsttag:req.body.firsttag,
		secondtag:req.body.secondtag
	})).save(utils.checkError(next, function () {
		res.end('success');
	}));
}
function getAllLocations(req, res, next) {
  	var query = models.Locationdetails.find({});
	 query.exec(function(error, results){
       //console.log(results)
       if(results != ''){
       		res.send(results)
       }
    });
}
function addNewLocations(req, res, next) {
  	(new models.Locationdetails({
		name_zh:req.body.name_zh,
		name_en:req.body.name_en,
	})).save(utils.checkError(next, function () {
		res.end('success');
	}));
}
function getAllMaxValue(req, res, next) {
  	var query = models.Maxdetails.find({});
	 query.exec(function(error, results){
       if(results != ''){
       		res.send(results)
       }
    });
}
function addNewMaxValue(req, res, next) {
  	(new models.Maxdetails({
		name_zh:req.body.name_zh,
		name_en:req.body.name_en,
	})).save(utils.checkError(next, function () {
		res.end('success');
	}));
}
function getAllUnit(req, res, next) {
  	var query = models.Unitdetails.find({});
	 query.exec(function(error, results){
       if(results != ''){
       		res.send(results)
       }
    });
}
function addNewUnit(req, res, next) {
  	(new models.Unitdetails({
		name_zh:req.body.name_zh,
		name_en:req.body.name_en,
	})).save(utils.checkError(next, function () {
		res.end('success');
	}));
}
function getSecondCategoryTag(req,res,next){
	var query = models.Secondcategorytag.find({});
	 query.exec(function(error, results){
       if(results != ''){
       		res.send(results)
       }
    });
}

function addSecondCategoryTag(req,res,next){
	(new models.Secondcategorytag({
		name_zh:req.body.name_zh,
		name_en:req.body.name_en,
	})).save(utils.checkError(next, function () {
		res.end('success');
	}));
}
function addThisTagManage(req,res,next){
	(new models.Alltag({
		first_name_en : req.body.first_name_en,
		second_name_en : req.body.second_name_en,
		third_name_en : req.body.third_name_en,
	})).save(utils.checkError(next, function () {
		res.end('success');
	}));
}
function updateThisTagManage(req,res,next){

}









function yqlparseTAO(req,res,next){
	// var query = models.Taoyqlparse.find({});
	// 	 query.exec(function(error, results){
	//        if(results != ''){
	//        		for(var tt in results){
	//        			//console.log(results[tt].title)
	//     			(new models.Lawdetails({
	// 					title:results[tt].title,
	// 					content:results[tt].content,
	// 					location:results[tt].location,
	// 					unit:results[tt].unit,
	// 					url:results[tt].url,
	// 				})).save(utils.checkError(next, function () {
	// 					res.end('success');
	// 					console.log('done!');
	// 				}));
	//        		}
	//        		//res.send(results)
	//        }
	//     });
	//console.log(req.body.url);
	// new YQL.exec('select * from data.html.cssselect where url="'+req.body.url+'" and css=".cNone"', function(response) {
	//   	//console.log(response.query.results.results.table[20].tr[1].td[1].p.content)
	// 	// var _c ='##法規內容'
	// 	// for(var yy in response.query.results.results.td.p[0].span.font){
	// 	// 	_c += '\n'+response.query.results.results.td.p[0].span.font[yy].content
	// 	// }
	// 	// console.log(_c);

	// 	// var _c ='##法規內容';
	// 	// 	_c += '\n'+response.query.results.results.td.span.font.content
	// 	// console.log(_c);


	// 	// var _c ='##法規內容';
	// 	// 	_c += '\n'+response.query.results.results.td.p.span.font.span[.content
	// 	// console.log(_c);

	// 	var _c ='##法規內容'
	// 	for(var yy in response.query.results.results.td.p.span.font.span){
	// 		_c += '\n'+response.query.results.results.td.p.span.font.span[yy].content
	// 	}
	// 	console.log(_c);

		
	// 	// var _c =''
	// 	// for (var k in response.query.results.results.div[2].table[0].tr[3].td[1].p ){
	// 	// 	if(response.query.results.results.div[2].table[0].tr[3].td[1].p[k].strong){
	// 	// 		if(!response.query.results.results.div[2].table[0].tr[3].td[1].p[k].strong.content){
	// 	// 			_c += '\n##'+response.query.results.results.div[2].table[0].tr[3].td[1].p[k].strong;
	// 	// 		}else{
	// 	// 			_c += '\n##'+response.query.results.results.div[2].table[0].tr[3].td[1].p[k].strong.content;
	// 	// 		}
	// 	// 	}
	// 	// 	_c += '\n'+response.query.results.results.div[2].table[0].tr[3].td[1].p[k].content;
	// 	// }
	// 	// var _c = '\n##詳細內容';
	// 	// _c += '\n'+response.query.results.results.table[20].tr[1].td[1].p.content;
	// 	// console.log(_c);
	// 	req.body.url = req.body.url.replace("http://","");
	// 	(new models.Taoyqlparse({
	// 		title : req.body.title,
	// 		content : _c,
	// 		location : req.body.location,
	// 		unit : req.body.unit,
	// 		url:req.body.url
	// 	})).save(utils.checkError(next, function () {
	// 		res.end('success');
	// 	}));
	// });
}


// Example #1 - Param binding

module.exports = {
  index: indexAction,
  getAllTagManage:getAllTagManage,
  updateAllTagManage:updateAllTagManage,
  addThisTagManage:addThisTagManage,
  updateThisTagManage:updateThisTagManage,
  saveThisTagManage:saveThisTagManage,
  addAllTagManageFirstTag:addAllTagManageFirstTag,
  getAllFirstTag:getAllFirstTag,
  addNewFirstTag:addNewFirstTag,
  getAllSecondTag:getAllSecondTag,
  addNewSecondTag:addNewSecondTag,
  getAllLaws:getAllLaws,
  getNewLaw:getNewLaw,
  addNewLaw:addNewLaw,
  deleteLaw:deleteLaw,
  updateEditLaw:updateEditLaw,
  getAllLocations:getAllLocations,
  addNewLocations:addNewLocations,
  getAllMaxValue:getAllMaxValue,
  addNewMaxValue:addNewMaxValue,
  getAllUnit:getAllUnit,
  addNewUnit:addNewUnit,
  getSecondCategoryTag:getSecondCategoryTag,
  addSecondCategoryTag:addSecondCategoryTag,
  yqlparseTAO:yqlparseTAO


};
