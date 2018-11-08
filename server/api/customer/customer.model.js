'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CustomerSchema = new mongoose.Schema({
  name: String,
  fname: String,
  email: {
    type: String,
    lowercase: true
  },
  address: String,
  newsletter: String,
  tel: String,
  mobile: String,
  active: Boolean,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});
// Validate email is not taken
CustomerSchema.path('email').validate(function (value, respond) {
  var self = this;
  return this.constructor.findOne({ email: value }).exec().then(function (user) {
    if (user) {
      if (self.id === user.id) {
        return respond(true);
      }
      return respond(false);
    }
    return respond(true);
  }).catch(function (err) {
    throw err;
  });
}, 'The specified email address is already in use.');
exports.default = mongoose.model('Customer', CustomerSchema);
//# sourceMappingURL=customer.model.js.map
