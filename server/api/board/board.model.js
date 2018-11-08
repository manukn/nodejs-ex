'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BorardSchema = new mongoose.Schema({
  name: String,
  name_ar: String,
  website: String,
  website_ar: String,
  active: Boolean,
  image: Object,
  category: String,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});

exports.default = mongoose.model('Borard', BorardSchema);
//# sourceMappingURL=board.model.js.map
