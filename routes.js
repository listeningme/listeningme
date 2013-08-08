'use strict';

var path = require('path');
var controllers = require(path.join(__dirname, 'controllers', 'index.js'));
var models = require(path.join(__dirname, 'models', 'index.js'));

//var config = require(path.join(__dirname, '/', 'config.json'));

module.exports = function (app) {  
  app.get('/', controllers.home.index);
  //隨機挑法條
  app.get('/indexlaws', controllers.home.indexlaws);
  //查詢結果（全文檢索）
  app.get('/search', controllers.home.search);
  //得到單一法條詳情
  app.get('/get/lawDetails', controllers.home.lawDetails);
  //得到同地區的相同法條
  app.get('/get/lawListsOnSameLocation', controllers.home.lawListsOnSameLocation);
  //得到地區清單
  app.get('/get/location', controllers.home.location);
  //得到identify 
  app.get('/get/identifyDetails', controllers.home.identifyDetails);
  //得到此地區機關
  app.get('/get/UnitsOnSameLocation', controllers.home.UnitsOnSameLocation);
  //得到所有第一階層tags
  app.get('/get/allFirstTag', controllers.home.allFirstTag);
  //傳送查詢結果為沒有的意見回饋
  app.post('/noResaultFeedBack', controllers.home.noResaultFeedBack);
  //傳送單一法條勘誤回饋
  app.post('/sendLawErrFeedback', controllers.home.sendLawErrFeedback);




  //-------一般user登入驗證
  
  


  //-------登入驗證
  app.get('/bk/login',controllers.bk.login);
  app.post('/bk/userlogin',controllers.bk.userlogin);
  app.get('/bk/logout',controllers.bk.logout);  
  //-------後端
  app.get('/bk', controllers.bk.index);
  //查詢全階層tag
  app.get('/bk/getAllTagManage', controllers.bk.getAllTagManage);
  //新增全階層tag的某個tag 
  app.post('/bk/addThisTagManage', controllers.bk.addThisTagManage);
  //更新全階層tag的某個tag 
  app.post('/bk/updateThisTagManage', controllers.bk.updateThisTagManage);
  //在全階層tag新增一個第一階層tags
  app.post('/bk/addAllTagManageFirstTag',controllers.bk.addAllTagManageFirstTag);
  //把這個tags編輯存進去
  app.post('/bk/saveThisTagManage',controllers.bk.saveThisTagManage);
  //查詢第一階層tag
  app.get('/bk/getAllFirstTag', controllers.bk.getAllFirstTag);
  //新增第一階層tag 
  app.post('/bk/addNewFirstTag', controllers.bk.addNewFirstTag);
  //查詢第二階層tag
  app.get('/bk/getAllSecondTag', controllers.bk.getAllSecondTag);
  //新增第二階層tag 
  app.post('/bk/addNewSecondTag', controllers.bk.addNewSecondTag);
  //取得所有的福利法條
  app.get('/bk/getAllLaws', controllers.bk.getAllLaws);
  //新增福利法條
  app.post('/bk/addNewLaw', controllers.bk.addNewLaw);
  //取得單一法條詳情
  app.get('/bk/getNewLaw', controllers.bk.getNewLaw);
  //更新修改後法條
  app.post('/bk/updateEditLaw', controllers.bk.updateEditLaw);
  //刪除這個法條
  app.post('/bk/deleteLaw', controllers.bk.deleteLaw);
  //取得所有地區
  app.get('/bk/getAllLocations', controllers.bk.getAllLocations);
  //新增地區
  app.post('/bk/addNewLocations', controllers.bk.addNewLocations);
  //取得所有最大價值
  app.get('/bk/getAllMaxValue', controllers.bk.getAllMaxValue);
  //新增最大價值
  app.post('/bk/addNewMaxValue', controllers.bk.addNewMaxValue);
  //取得所有福利機關
  app.get('/bk/getAllUnit', controllers.bk.getAllUnit);
  //新增福利機關
  app.post('/bk/addNewUnit', controllers.bk.addNewUnit);
  //app.get('/addneworg', controllers.low.addNewOrg);
  //取得所有子類別清單
  app.get('/bk/getSecondCategoryTag', controllers.bk.getSecondCategoryTag);
  //新增子類別清單
  app.post('/bk/addSecondCategoryTag', controllers.bk.addSecondCategoryTag);
  app.post('/bk/yqlparseTAO',controllers.bk.yqlparseTAO);
  app.post('/bk/batchchangelocation',controllers.bk.batchChangeLocation);
}
