'use strict';

var models = require('../models/index.js');
var utils = require('../lib/util');
var request = require('request');
var YQL = require('yql');
if(!process.env.PORT){
    var sessionsecret = require('./../config').sessionsecret;
    var auth_cookie_name =  require('./../config').auth_cookie_name;
}else{
	var sessionsecret = process.env.sessionsecret;
	var auth_cookie_name = process.env.authcookiename;
}
var crypto = require('crypto');
//加密
function encrypt(str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}
//解密
function decrypt(str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
function auth_user(req, res, next) {
    if (req.session.user) {
        return next();//若没有session，直接跳過中間件
    } else {
        var cookie = req.cookies[auth_cookie_name];//讀cookie，通過配置讀cookie
        if (!cookie) {
            return next();//若沒有cookie則跳過中間件
        }
        var auth_token = decrypt(cookie, sessionsecret);//解密
        var auth = auth_token.split('\t');
        var user = auth[0], passwd = auth[1];//解密後拿到資料
		var query = models.Alltag.find({'name':user,'pass':passwd});
		query.exec(function(error, results){
	        if(results != ''){
	        	req.session.regenerate(function(){
	                req.session.user = user.username;
	                req.session.apiauth = 1;
	            	return next();
	            });
	        }else{
	        	return next();
	        }
	    });
    }
}
function login(req, res ,next){
	res.render('login');
}
function userlogin(req,res,next){
	var query = models.User.findOne({'name':req.body.name,'pass':req.body.password});
	 query.exec(function(error, results){
	 	//console.log(results)
        if(results != null){
       		req.session.regenerate(function(){
                req.session.user = results.name;
                req.session.apiauth = 1;
            	res.redirect('/bk');
            });
        }else{
        	res.redirect('/bk/login');
        }
    });
}
//使用者登出
function logout(req, res, next) {
	console.log('kerker')
    req.session.destroy();
    res.clearCookie(auth_cookie_name, { path: '/' });
    res.redirect(req.headers.referer || '/');
};
//=======================================================
function indexAction(req, res, next) {
	if(req.session.user){
	    res.render('bk',{ _isLogin:true});
	  }else{
	    res.redirect('/');
	  }
}
function getAllTagManage(req, res, next){
	console.log(req.session);
	if(req.session.apiauth == 1){
		var query = models.Alltag.find({});
		 query.exec(function(error, results){
	        if(results != ''){
	        	//console.log(results);
	       		res.send(results)
	        }
	    });
	}
	
}
function addAllTagManageFirstTag(req,res,next){
	if(req.session.apiauth == 1){
		(new models.Alltag({
			first_name_en : req.body.first_name_en,
		})).save(utils.checkError(next, function () {
			res.end('success');
		}));
	}
}
function saveThisTagManage(req,res,next){

}
function updateAllTagManage(req,res,next){

}
function getAllFirstTag(req, res, next){
	if(req.session.apiauth == 1){
		var query = models.Firsttag.find({});
		 query.exec(function(error, results){
	        if(results != ''){
	       		res.send(results)
	        }
	    });
	}
}
function addNewFirstTag(req, res, next){
	if(req.session.apiauth == 1){
		(new models.Firsttag({
			name_zh:req.body.name_zh,
			name_en:req.body.name_en
		})).save(utils.checkError(next, function () {
			res.end('success');
		}));
	}
}
function getAllSecondTag(req, res, next){
	if(req.session.apiauth == 1){
		var query = models.Secondtag.find({});
		 query.exec(function(error, results){
	        if(results != ''){
	       		res.send(results)
	        }
	    });
	}
}
function addNewSecondTag(req, res, next){
	if(req.session.apiauth == 1){
		(new models.Secondtag({
			name_zh:req.body.name_zh,
			name_en:req.body.name_en
		})).save(utils.checkError(next, function () {
			res.end('success');
		}));
	}
}
function getAllLaws(req, res, next) {
	if(req.session.apiauth == 1){
		var query = models.Lawdetails.find({});
		 query.exec(function(error, results){
	        if(results != ''){
	       		res.send(results)
	        }
	    });
	}
}
function getNewLaw(req, res, next){
	if(req.session.apiauth == 1){
		var query = models.Lawdetails.find({'_id':req.query._id});
		 query.exec(function(error, results){
	        if(results != ''){
	        	//console.log(results);
	       		res.send(results)
	        }
	    });
	}
}
function updateEditLaw(req, res, next){
	if(req.session.apiauth == 1){
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
}
function deleteLaw(req,res,next){
	if(req.session.apiauth == 1){
		var query = models.Lawdetails.remove({ _id: req.body._id });
		query.exec(function(error, results){
	        //console.log(error);
	        res.end('success');
	    });
	}
}

function addNewLaw(req, res, next) {
	if(req.session.apiauth == 1){
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
}
function getAllLocations(req, res, next) {
  	if(req.session.apiauth == 1){
	  	var query = models.Locationdetails.find({});
		 query.exec(function(error, results){
	       //console.log(results)
	       if(results != ''){
	       		res.send(results)
	       }
	    });
	}
}
function addNewLocations(req, res, next) {
	if(req.session.apiauth == 1){
	  	(new models.Locationdetails({
			name_zh:req.body.name_zh,
			name_en:req.body.name_en,
		})).save(utils.checkError(next, function () {
			res.end('success');
		}));
	}
}
function getAllMaxValue(req, res, next) {
  	if(req.session.apiauth == 1){
	  	var query = models.Maxdetails.find({});
		 query.exec(function(error, results){
	       if(results != ''){
	       		res.send(results)
	       }
	    });
	}
}
function addNewMaxValue(req, res, next) {
  	if(req.session.apiauth == 1){
	  	(new models.Maxdetails({
			name_zh:req.body.name_zh,
			name_en:req.body.name_en,
		})).save(utils.checkError(next, function () {
			res.end('success');
		}));
	}
}
function getAllUnit(req, res, next) {
	if(req.session.apiauth == 1){
	  	var query = models.Unitdetails.find({});
		 query.exec(function(error, results){
	       if(results != ''){
	       		res.send(results)
	       }
	    });
	}
}
function addNewUnit(req, res, next) {
	if(req.session.apiauth == 1){
	  	(new models.Unitdetails({
			name_zh:req.body.name_zh,
			name_en:req.body.name_en,
		})).save(utils.checkError(next, function () {
			res.end('success');
		}));
	}
}
function getSecondCategoryTag(req,res,next){
	if(req.session.apiauth == 1){
		var query = models.Secondcategorytag.find({});
		 query.exec(function(error, results){
	       if(results != ''){
	       		res.send(results)
	       }
	    });
	}
}

function addSecondCategoryTag(req,res,next){
	if(req.session.apiauth == 1){
		(new models.Secondcategorytag({
			name_zh:req.body.name_zh,
			name_en:req.body.name_en,
		})).save(utils.checkError(next, function () {
			res.end('success');
		}));
	}
}
function addThisTagManage(req,res,next){
	if(req.session.apiauth == 1){
		(new models.Alltag({
			first_name_en : req.body.first_name_en,
			second_name_en : req.body.second_name_en,
			third_name_en : req.body.third_name_en,
		})).save(utils.checkError(next, function () {
			res.end('success');
		}));
	}
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
  login:login,
  auth_user:auth_user,
  logout:logout,
  userlogin:userlogin,
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
