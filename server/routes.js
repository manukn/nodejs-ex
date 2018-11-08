/**
 * Main application routes
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  // Insert routes below
  app.use('/api/categorys', require('./api/category'));
  app.use('/api/cart', require('./api/cart'));
  app.use('/api/blogs', require('./api/blog'));
  app.use('/api/links', require('./api/links'));
  app.use('/api/board', require('./api/board'));
  app.use('/api/contact', require('./api/contactus'));
  app.use('/api/gallery', require('./api/gallery'));
  app.use('/api/result', require('./api/result'));
  app.use('/api/orders', require('./api/order'));
  app.use('/api/sendmail', require('./api/sendmail'));
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/tasks', require('./api/task'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_errors2.default[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendFile(_path2.default.resolve(app.get('appPath') + '/index.html'));
    //res.sendFile('../dist/client/index.html');
  });
};

var _errors = require('./components/errors');

var _errors2 = _interopRequireDefault(_errors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routes.js.map
