/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/categorys              ->  index
 * POST    /api/categorys              ->  create
 * GET     /api/categorys/:id          ->  show
 * PUT     /api/categorys/:id          ->  update
 * DELETE  /api/categorys/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.single = single;
exports.brand = brand;
exports.services = services;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _category = require('./category.model');

var _category2 = _interopRequireDefault(_category);

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

// Gets a list of Categorys
function index(req, res) {
  _category2.default.findAsync().then(respondWithResult(res)).catch(handleError(res));
}
function single(req, res) {
  _category2.default.findOne({ name: req.body.slug, game: req.body.brand }).then(respondWithResult(res)).catch(handleError(res));
}
function brand(req, res) {
  _category2.default.find({ game: req.body.brand }).then(respondWithResult(res)).catch(handleError(res));
}
// Gets a specific  Category from the DB
function services(req, res) {
  _category2.default.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}
// Gets a single Category from the DB
function show(req, res) {
  _category2.default.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Category in the DB
function create(req, res) {
  _category2.default.createAsync(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Category in the DB
function update(req, res) {
  _category2.default.update({ _id: req.params.id }, { $set: req.body }, { multi: true }, function (err, cart) {
    if (err) {
      return handleError(res, err);
    } else {
      return res.status(200).json(cart);
    }
  });
}

// Deletes a Category from the DB
function destroy(req, res) {
  _category2.default.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=category.controller.js.map
