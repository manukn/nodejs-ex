'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChampionSchema = new _mongoose2.default.Schema({
  name: String,
  name_ar: String,
  subname: String,
  subname_ar: String,
  event_start: String,
  event_end: String,
  month: String,
  year: String,
  files: Object,
  info: String,
  active: Boolean,
  champion: String,
  user: String,
  status: Number,
  orderNo: String

});

exports.default = _mongoose2.default.model('Champion', ChampionSchema);
//# sourceMappingURL=champion.model.js.map
