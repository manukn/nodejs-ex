'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CategorySchema = new mongoose.Schema({
  image: Object,
  name: String,
  name_ar: String,
  img: Object,
  game: String,
  details: String,
  details_ar: String,
  active: Boolean,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String,
  fb: String,
  tw: String,
  inst: String,
  google: String
});

exports.default = mongoose.model('Category', CategorySchema);
//# sourceMappingURL=category.model.js.map
