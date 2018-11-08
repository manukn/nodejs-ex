'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactSchema = new _mongoose2.default.Schema({
  name: String,
  mobile: String,
  active: Boolean,
  email: String,
  message: String,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});

exports.default = _mongoose2.default.model('Contact', ContactSchema);
//# sourceMappingURL=contact.model.js.map
