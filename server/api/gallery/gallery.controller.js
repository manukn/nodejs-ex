/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tasks              ->  index
 * POST    /api/tasks              ->  create
 * GET     /api/tasks/:id          ->  show
 * PUT     /api/tasks/:id          ->  update
 * DELETE  /api/tasks/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.getresult = getresult;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gallery = require('./gallery.model');

var _gallery2 = _interopRequireDefault(_gallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.removeAsync().then(function () {
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

// Gets a list of Tasks
function index(req, res) {
  _gallery2.default.findAsync().then(respondWithResult(res)).catch(handleError(res));
}
function getresult(req, res) {

  _gallery2.default.find({ event_id: req.body.id }, function (err, orders) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(orders);
  });
}
// Gets a single Task from the DB
function show(req, res) {
  _gallery2.default.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Task in the DB
function create(req, res) {
  _gallery2.default.createAsync(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Task in the DB
function update(req, res) {

  _gallery2.default.update({ _id: req.params.id }, { $set: req.body }, { multi: true }, function (err, cart) {
    if (err) {
      return handleError(res, err);
    } else {
      return res.status(200).json(cart);
    }
  });
}

// Deletes a Task from the DB
function destroy(req, res) {
  _gallery2.default.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=gallery.controller.js.map
