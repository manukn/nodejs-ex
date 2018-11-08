'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ResultSchema = new mongoose.Schema({
  ename: Object,
  month: String,
  year: String,
  event_id: String,
  website: String,
  active: Boolean,
  image: Object,
  category: String,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});

exports.default = mongoose.model('Result', ResultSchema);
//# sourceMappingURL=result.model.js.map
