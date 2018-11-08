'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CartSchema = new _mongoose2.default.Schema({
  name: String,
  name_ar: String,
  event_date: { type: Date },
  event_start: String,
  event_end: String,
  event_game: String,
  month: String,
  year: String,
  files: Object,
  info: String,
  info_ar: String,
  active: Boolean,
  champion: String,
  user: String,
  status: Number,
  orderNo: String,
  company: {},
  cartItem: {}
});

exports.default = _mongoose2.default.model('Cart', CartSchema);
//# sourceMappingURL=cart.model.js.map
