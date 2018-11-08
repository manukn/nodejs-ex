'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var LinksSchema = new mongoose.Schema({
  name: String,
  event_id: String,
  country: String,
  active: Boolean,
  image: Object,
  address: String,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});

exports.default = mongoose.model('Links', LinksSchema);
//# sourceMappingURL=links.model.js.map
