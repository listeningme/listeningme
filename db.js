var mongoose = require('mongoose');
var path = require('path');
if(!process.env.PORT){
	var configdb = require('./config').db;
}else{
	var configdb = process.env.db;
}
//heroku的寫法
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  configdb;
 
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});
require(path.join(__dirname, 'models', 'index.js'));
