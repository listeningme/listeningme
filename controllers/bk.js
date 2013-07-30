'use strict';

var models = require('../models/index.js');
var utils = require('../lib/util');
var request = require('request');
var YQL = require('yql');
var $ = require('jquery');
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


function batchChangeLocation(req,res,next){
	for(var ty in req.body._tmpid){
		models.Lawdetails.update({ '_id': req.body._tmpid[ty] },
		 {$set:{
		 	location: req.body.value,
		 }}, function (err, numberAffected, raw) {
		  //console.log(err);
		  if (err) return handleError(err);
		  console.log('done!');
		});
	}
}






function yqlparseTAO(req,res,next){
	// console.log('dd');
	// var tag_eng = [ {en_tag:'liab',ch_tag:'translation missing: zh-TW.category.liab'},  {en_tag:'edu_TPE_DOEDU',ch_tag:'translation missing: zh-TW.category.edu_TPE_DOEDU'},  {en_tag:'EDU',ch_tag:'translation missing: zh-TW.category.EDU'},  {en_tag:'TPE_DOEDU',ch_tag:'translation missing: zh-TW.category.TPE_DOEDU'},  {en_tag:'TPE_DOSW',ch_tag:'translation missing: zh-TW.category.TPE_DOSW'},  {en_tag:'NTU',ch_tag:'translation missing: zh-TW.category.NTU'},  {en_tag:'law',ch_tag:'法律訴訟'},  {en_tag:'repair',ch_tag:'修屋'},  {en_tag:'disaster',ch_tag:'災害救助'},  {en_tag:'greet',ch_tag:'關懷服務'},  {en_tag:'homecare',ch_tag:'居家照護'},  {en_tag:'examination',ch_tag:'健檢'},  {en_tag:'pregnant',ch_tag:'懷孕生產'},  {en_tag:'care',ch_tag:'育兒托育'},  {en_tag:'protect',ch_tag:'安置保護'},  {en_tag:'consoult',ch_tag:'個案諮詢'},  {en_tag:'socialinsurance',ch_tag:'社會保險補助'},  {en_tag:'tax',ch_tag:'稅捐減免'},  {en_tag:'allowance',ch_tag:'生活津貼'},  {en_tag:'emergency',ch_tag:'急難救助'},  {en_tag:'medical',ch_tag:'醫療照護'},  {en_tag:'living',ch_tag:'購屋租屋'},  {en_tag:'assistivedevice',ch_tag:'輔具'},  {en_tag:'work',ch_tag:'工作'},  {en_tag:'transportation',ch_tag:'交通'},  {en_tag:'pregnant',ch_tag:'懷孕'},  {en_tag:'pregnant',ch_tag:'懷兒子'},  {en_tag:'pregnant',ch_tag:'懷女兒'},  {en_tag:'living',ch_tag:'住屋'},  {en_tag:'living',ch_tag:'買房子'},  {en_tag:'living',ch_tag:'買厝'},  {en_tag:'living',ch_tag:'租房子'},  {en_tag:'living',ch_tag:'租厝'},  {en_tag:'assistivedevice',ch_tag:'助聽器'},  {en_tag:'assistivedevice',ch_tag:'輔助行走器'},  {en_tag:'law',ch_tag:'打官司'},  {en_tag:'NTU',ch_tag:'台大'},  {en_tag:'NTU',ch_tag:'台灣大學'},  {en_tag:'repair',ch_tag:'修房子'},  {en_tag:'repair',ch_tag:'壁癌'},  {en_tag:'disaster',ch_tag:'地震'},  {en_tag:'disaster',ch_tag:'水災'},  {en_tag:'disaster',ch_tag:'火災'},  {en_tag:'disaster',ch_tag:'天災'},  {en_tag:'homecare',ch_tag:'老人照顧'},  {en_tag:'homecare',ch_tag:'外籍看護'},  {en_tag:'homecare',ch_tag:'菲傭'},  {en_tag:'homecare',ch_tag:'印傭'},  {en_tag:'examination',ch_tag:'健康檢查'},  {en_tag:'examination',ch_tag:'身體檢查'},  {en_tag:'examination',ch_tag:'體檢'},  {en_tag:'transportation',ch_tag:'捷運'},  {en_tag:'transportation',ch_tag:'公車'},  {en_tag:'allowance',ch_tag:'老農津貼'}, ] ;	
	// var kqq ={};
	// 	kqq.location = ['KHH'];
	// 	kqq.category=[];
	// 	for (var r in tag_eng){
	// 		kqq.category.push(tag_eng[r].en_tag)
	// 	}
	// 	var kqqd = JSON.stringify(kqq);
	// $.ajax({	
	// 	type:'POST',
	// 	data:{q:kqqd},
	// 	url:'http://listening-api.g0v.tw/api/search.json',
	// 	success:function(rd){
	// 		//console.log(rd);

	// 		for(var o in rd){
	// 			console.log(rd[o].rule)
	// 			// var _arrt = [];
	// 			// for(var t in rd[o].rule.tags){
	// 			// 	_arrt.push(rd[o].rule.tags[t].tag.value)
	// 			// }
	// 			// // (new models.Taoyqlparse({
	// 			// // 	title : rd[o].rule.title,
	// 			// // 	content : rd[o].rule.content,
	// 			// // 	url:rd[o].rule.url,
	// 			// // 	_tmptag: _arrt
	// 			// // })).save(utils.checkError(next, function () {
	// 			// // 	res.end('success');
	// 			// // }));
	// 			// console.log('done!');
	// 		}
	// 	},
	// 	dataType:'jsonp'
	// })
	// var query = models.Taoyqlparse.find({});
	// 	 query.exec(function(error, results){
	//        if(results != ''){
	//        		for(var tt in results){
	//        			//console.log(results[tt].title)
	//     			(new models.Lawdetails({
	// 					title:results[tt].title,
	// 					content:results[tt].content,
	// 					location:results[tt].location,
	// 					url:results[tt].url,
	// 					firsttag:results[tt]._tmptag,
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
  yqlparseTAO:yqlparseTAO,
  batchChangeLocation:batchChangeLocation


};
