'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlogSchema = new _mongoose2.default.Schema({
  title: String,
  author: String,
  info: String,
  image: Object,
  active: Boolean
});

exports.default = _mongoose2.default.model('Blog', BlogSchema);
//# sourceMappingURL=blog.model.js.map
