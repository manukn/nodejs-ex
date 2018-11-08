'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TaskSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  image: String,
  category: String,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});

exports.default = mongoose.model('Task', TaskSchema);
//# sourceMappingURL=task.model.js.map
