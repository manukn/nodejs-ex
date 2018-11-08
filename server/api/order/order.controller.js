/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  update
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.company = company;
exports.employee = employee;
exports.myOrders = myOrders;
exports.index = index;
exports.show = show;
exports.newcontact = newcontact;
exports.create = create;
exports.count = count;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _order = require('./order.model');

var _order2 = _interopRequireDefault(_order);

var _shared = require('../../config/environment/shared');

var config = _interopRequireWildcard(_shared);

var _send = require('../sendmail/send');

var email = _interopRequireWildcard(_send);

var _contact = require('../contactus/contact.model');

var _contact2 = _interopRequireDefault(_contact);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function orderPlaced(res, statusCode) {
  res.req.body.to = res.req.body.email;
  res.req.body.name = res.req.body.name;
  res.req.body.html = res.req.body.message;
  res.req.body.mobile = res.req.body.mobile;
  res.req.body.subject = res.req.body.subject;
  email.send(config.mailOptions.orderPlaced(res.req.body));
 
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
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
    return updated.save().then(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}
/**
 * Get services company
 */
function company(req, res) {

  return _order2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}
/**
 * Get services employee
 */
function employee(req, res) {
  var userID = req.user._id;
  userID = userID.toString();
  //5818c9c7f505b51e8c3af63c
  _order2.default.find({ items: { "$elemMatch": { emp: userID } } }, function (err, orders) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(orders);
  });
}
// Get all orders by a user
function myOrders(req, res) {
  _order2.default.find({ email: req.user.email }, function (err, orders) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(orders);
  });
}

// Gets a list of Orders
function index(req, res) {
  return _order2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Order from the DB
function show(req, res) {
  return _order2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}
// Creates a new Contact in the DB
function newcontact(req, res) {
  return _contact2.default.create(req.body).then(orderPlaced(res, 201)).catch(handleError(res));
}
// Creates a new Order in the DB
function create(req, res) {

  return _order2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}
// Get all features group count
function count(req, res) {
  if (req.query) {
    var q = isJson(req.query.where);
    _order2.default.find(q).count().exec(function (err, count) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json([{ count: count }]);
    });
  }
}

// Updates an existing Order in the DB
function update(req, res) {

  _order2.default.update({ _id: req.params.id }, { $set: req.body }, { multi: true }, function (err, cart) {
    if (err) {
      return handleError(res, err);
    } else {
      return res.status(200).json(cart);
    }
  });
}

// Deletes a Order from the DB
function destroy(req, res) {
  return _order2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=order.controller.js.map
