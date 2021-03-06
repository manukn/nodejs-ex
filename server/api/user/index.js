'use strict';

var _express = require('express');

var _user = require('./user.controller');

var controller = _interopRequireWildcard(_user);

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/company', auth.isAuthenticated(), controller.company);
router.get('/employee', auth.isAuthenticated(), controller.employee);
router.get('/userall', auth.isAuthenticated(), controller.users);
router.post('/price_company', auth.isAuthenticated(), controller.price_company);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id/userUpdate', auth.isAuthenticated(), controller.updateUser);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/services', auth.isAuthenticated(), controller.updateServices);
router.put('/:id/updateCompany', auth.isAuthenticated(), controller.updateCompany);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/forgot', controller.forgot);
router.post('/reset/:token', controller.reset);
module.exports = router;
//# sourceMappingURL=index.js.map
