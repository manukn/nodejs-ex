'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var GallerySchema = new mongoose.Schema({
  ename: Object,
  active: Boolean,
  event_id: String,
  image: Object,
  videos: Object,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});

exports.default = mongoose.model('Gallery', GallerySchema);
//# sourceMappingURL=gallery.model.js.map
