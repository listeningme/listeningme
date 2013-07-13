'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var crypto = require('crypto');

var UserSchema = new Schema({
  name:        {type: String, index: true},
  login:       {type: String, unique: true},
  pass:        String,
  email:       {type: String, unique: true},
  activeKey:   String,
  active:      Boolean,
  createAt:    {type: Date, default: Date.now},
  token:       String,
  key:         String,
  level:       {type: Number, default: 0}
});

/**
 * 使用使用者 email 取得 gavatar 頭像
 * @param {string} size 圖片尺寸
 * @returns {string} 
 * @since v0.0.1
 */
UserSchema.methods.avatar = function (size) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(this.email);
  return 'http://www.gravatar.com/avatar/' + md5sum.digest('hex') + '?s=' + (size || 120);
};

/**
 * 取多使用者資料
 * @param {object} query MongoDB 的查詢方法
 * @param {object} fields 顯示/不顯示的欄位, ex: {_id: 0, content: 0}.（可選）
 * @param {object} opts Mongodb 查詢時的可選項目, ex: {limit: 10}. （可選）
 * @param {function} cb callback function
 * @since v0.0.1
 */
UserSchema.statics.getUsers = function () {
  var args = arguments;
  var query;
  var fields = {};
  var opts = {};
  var cb;

  switch (args.length) {
  case 2:
    query = args[0];
    cb = args[1];
    break;
  case 4:
    query = args[0];
    fields = args[1];
    opts = args[2];
    cb = args[3];
    break;
  default:
    throw new Error('參數數目不對');
  }

  this.find(query, fields, opts, function (err, users) {
    if (err) {
      cb(err);
      return;
    }
    cb(null, users);
  });
};

/**
 * 使用 login 取得使用者資訊
 * @param {object} login 使用者帳號
 * @param {object} fields 顯示/不顯示的欄位, ex: {_id: 0, content: 0}.（可選）
 * @param {function} cb callback function
 * @since v0.0.1
 */
UserSchema.statics.getUserByLogin = function (login, fields, cb) {
  if (!cb) {
    cb = fields;
    fields = {};
  }
  this.findOne({login: login}, fields, function (err, user) {
    if (err) {
      cb(err);
      return;
    }
    cb(null, user);
  });
};

/**
 * 使用 id 取得使用者資訊
 * @param {object} id 使用者 id
 * @param {object} fields 顯示/不顯示的欄位, ex: {_id: 0, content: 0}.（可選）
 * @param {function} cb callback function
 * @since v0.0.1
 */
UserSchema.statics.getUserById = function (id, fields, cb) {
  if (!cb) {
    cb = fields;
    fields = {};
  }
  this.findOne({_id: id}, fields, function (err, user) {
    if (err) {
      cb(err);
      return;
    }
    cb(null, user);
  });
};

/**
 * 使用 email 取得使用者資訊
 * @param {string} email 使用者 email
 * @param {object} fields 顯示/不顯示的欄位, ex: {_id: 0, content: 0}.（可選）
 * @param {function} cb callback function
 * @since v0.0.1
 */
UserSchema.statics.getUserByEmail = function (email, fields, cb) {
  if (!cb) {
    cb = fields;
    fields = {};
  }
  this.findOne({email: email}, fields, function (err, user) {
    if (err) {
      cb(err);
      return;
    }
    cb(null, user);
  });
};

mongoose.model('User', UserSchema);
