'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = reset;
exports.forgot = forgot;
exports.index = index;
exports.price_company = price_company;
exports.company = company;
exports.users = users;
exports.employee = employee;
exports.create = create;
exports.show = show;
exports.update = update;
exports.destroy = destroy;
exports.changePassword = changePassword;
exports.updateCompany = updateCompany;
exports.updateServices = updateServices;
exports.updateUser = updateUser;
exports.me = me;
exports.authCallback = authCallback;

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sgTransport = require('nodemailer-sendgrid-transport');


function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2.default.merge(entity, updates);

    return updated.saveAsync().spread(function (updated) {
      return updated;
    });
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

// Reset password route
function reset(req, res) {
  _async2.default.waterfall([function (done) {
    _user2.default.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
      if (!user) {
        return res.status(422).json({ 'message': 'Password reset token is invalid or has expired.' });
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.saveAsync().then(function () {
        // res.status(204).end();
        // console.log('next async', done);
        // username + password
        var options = {
          auth: {
            //   api_user: process.env.SENDGRID_USERNAME,
            //   api_key: process.env.SENDGRID_PASSWORD
            api_key: process.env.SENDGRID_APIKEY

          }
        };

        var mailer = _nodemailer2.default.createTransport(sgTransport(options));
        //   var mailer = nodemailer.createTransport('smtps://'+process.env.EMAIL_ID+':'+process.env.EMAIL_PASSWORD+'@smtp.gmail.com');


        var mailOptions = {
          to: user.email,
          from: 'passwordreset@qtofacility.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' + 'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        mailer.sendMail(mailOptions, function (err) {
          return res.status(200).json({ 'message': 'Success! Your password has been changed.' });
        });
      }).catch(validationError(res));

      // user.save(function(err) {

      // return res.status(200);
      // req.logIn(user, function(err) {
      //   console.log('save err', err);
      // });
      // });
    });
  }], function (err) {
    if (err) return next(err);
  });
}

// Forgot password route
function forgot(req, res, next) {
  _async2.default.waterfall([function (done) {
    _crypto2.default.randomBytes(20, function (err, buf) {
      var token = buf.toString('hex');
      done(err, token);
    });
  }, function (token, done) {
    _user2.default.findOne({ email: req.body.email }).then(function (user) {
      //   var newUser = new User(user);
      // user = user.toObject();
      if (!user) {
        return res.status(422).json({ 'message': ' No account with that email address exists.' });
      }
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      user.save(function (err) {
        done(err, token, user);
      });
    });
  }, function (token, user, done) {
    // username + password
    var options = {
      auth: {
        //   api_user: process.env.SENDGRID_USERNAME,
        //   api_key: process.env.SENDGRID_PASSWORD
        api_key: process.env.SENDGRID_APIKEY

      }
    };

    var mailer = _nodemailer2.default.createTransport(sgTransport(options));
    //   var mailer = nodemailer.createTransport('smtps://'+process.env.EMAIL_ID+':'+process.env.EMAIL_PASSWORD+'@smtp.gmail.com');

    var mailOptions = {
      to: user.email,
      from: 'info@qtofacility.com',
      subject: ' Password Reset',
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://' + req.headers.host + '/reset/' + token + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    mailer.sendMail(mailOptions, function (err) {
      return res.status(201).json({ 'message': 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
    });
  }], function (err) {
    if (err) return next(err);
  });
}

/**
 * Get list of users
 * restriction: 'admin'
 */
function index(req, res) {
  return _user2.default.find({}, '-salt -password').exec().then(function (users) {
    res.status(200).json(users);
  }).catch(handleError(res));
}
/**
 * Get services company
 */
function price_company(req, res) {

  return _user2.default.find({ "$and": [{ "services._id": { "$all": req.body.services } }, { "paid_status": { "$exists": true } }, { "active": true }]

  }, '-salt -password').exec().then(function (users) {

    res.status(200).json(users);
  }).catch(handleError(res));
}
/**
 * Get list of company
 */
function company(req, res) {
  return _user2.default.find({ role: "company", "active": true }, '-salt -password').exec().then(function (users) {
    res.status(200).json(users);
  }).catch(handleError(res));
}
/**
* Get list of company
*/
function users(req, res) {
  return _user2.default.find({ role: "user", "active": true }, '-salt -password').exec().then(function (users) {
    res.status(200).json(users);
  }).catch(handleError(res));
}
/**
 * Get list of company employee
 */
function employee(req, res) {
  return _user2.default.find({ "$and": [{ role: "employee" }, { company: req.user._id }]
  }, '-salt -password').exec().then(function (users) {
    res.status(200).json(users);
  }).catch(handleError(res));
}
/**
 * Creates a new user
 */
function create(req, res, next) {
  var newUser = new _user2.default(req.body);
  newUser.provider = 'local';
  var count = 0;
  _user2.default.find({ role: "user" }).count().exec(function (err, cc) {
    count = cc + 1;
    if (newUser.role == "company" || newUser.role == "employee") {
      newUser.role == newUser.role;
    } else {
      newUser.role = 'user';
      newUser.id = 1000 + count;
    }
    newUser.save().then(function (user) {
      if (newUser.role == 'user') {
        var token = _jsonwebtoken2.default.sign({ _id: user._id }, _environment2.default.secrets.session, {
          expiresIn: 60 * 60 * 5
        });
        res.json({ token: token });
      } else {
        // email start
        var options = {
          auth: {
            //   api_user: process.env.SENDGRID_USERNAME,
            //   api_key: process.env.SENDGRID_PASSWORD
            api_key: process.env.SENDGRID_APIKEY

          }
        };

        var mailer = _nodemailer2.default.createTransport(sgTransport(options));
        //   var mailer = nodemailer.createTransport('smtps://'+process.env.EMAIL_ID+':'+process.env.EMAIL_PASSWORD+'@smtp.gmail.com');

        var mailOptions = {
          to: newUser.email,
          from: 'info@qtofacility.com',
          subject: 'New Account created',
          text: 'You are receiving this because you  have requested  for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://' + req.headers.host + '/login\n\n' + 'Your email ' + newUser.email + ' \n\n' + 'Your password ' + newUser.password + ' \n\n' + 'If you did not request this, please ignore.\n'
        };
        mailer.sendMail(mailOptions, function (err) {
          res.json({ 'message': 'An e-mail has been sent to ' + newUser.email + ' with further instructions.' });
        });
        // email end
      }
    }).catch(validationError(res));
  });
}

/**
 * Get a single user
 */
function show(req, res, next) {
  var userId = req.params.id;

  return _user2.default.findById(userId).exec().then(function (user) {
    if (!user) {
      return res.status(404).end();
    }
    res.json(user.profile);
  }).catch(function (err) {
    return next(err);
  });
}

// Updates an existing Thing in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  _user2.default.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}
/**
 * Deletes a user
 * restriction: 'admin'
 */
function destroy(req, res) {
  return _user2.default.findByIdAndRemove(req.params.id).exec().then(function () {
    res.status(204).end();
  }).catch(handleError(res));
}

/**
 * Change a users password
 */
function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return _user2.default.findById(userId).exec().then(function (user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      return user.save().then(function () {
        res.status(204).end();
      }).catch(validationError(res));
    } else {
      return res.status(403).end();
    }
  });
}
/**
* Change a company services 
*/
function updateCompany(req, res, next) {
  var userId = req.params.id;
  return _user2.default.findById(userId).exec().then(function (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.paid_status = req.body.paid_status;
    user.paid_plan = req.body.paid_plan;
    user.contacts = req.body.contacts;
    user.services = req.body.services;
    return user.save().then(function () {
      res.status(204).end();
    }).catch(validationError(res));
  });
}
/**
 * Change a users services price
 */
function updateServices(req, res, next) {
  var userId = req.user;
  return _user2.default.findById(userId).exec().then(function (user) {
    user.services = req.body.services;
    return user.save().then(function () {
      res.status(200).json(user);
    }).catch(validationError(res));
  });
}
/**
 * Change a users services price
 */
function updateUser(req, res, next) {

  _user2.default.update({ _id: req.body.formData._id }, { $set: req.body.formData }, { multi: true }, function (err, user) {

    if (err) return validationError(res);else return res.status(200).json(user);
  });
}
/**
 * Get my info
 */
function me(req, res, next) {
  var userId = req.user._id;

  return _user2.default.findOne({ _id: userId }, '-salt -password').exec().then(function (user) {
    // don't ever give out the password or salt
    if (!user) {
      return res.status(401).end();
    }
    res.json(user);
  }).catch(function (err) {
    return next(err);
  });
}

/**
 * Authentication callback
 */
function authCallback(req, res, next) {
  res.redirect('/');
}
//# sourceMappingURL=user.controller.js.map
