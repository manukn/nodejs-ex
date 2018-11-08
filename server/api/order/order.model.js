'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderSchema = new _mongoose2.default.Schema({

  name_ar: String,
  news: String,
  news_ar: String,
  user: Object,
  problemPhoto: {},
  files: {},
  name: String,
  email: String,
  mobile: String,
  message: String,
  sector: String,
  startDate: { type: Date },
  status: { type: String, default: 'Pending' },
  active: { type: Boolean, default: true },
  payment_method: String,
  created_at: { type: Date },
  updated_at: { type: Date }
});

OrderSchema.pre('save', function (next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

exports.default = _mongoose2.default.model('Order', OrderSchema);
//# sourceMappingURL=order.model.js.map
