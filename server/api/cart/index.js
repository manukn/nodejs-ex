'use strict';

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require('express');
var controller = require('./cart.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/champget', controller.Champindex);

router.get('/champ/:id', controller.Champshow);
router.post('/champ', controller.Champcreate);
router.put('/champ/:id', controller.Champupdate);
router.patch('/champ/:id', controller.Champupdate);
router.delete('/champ/:id', controller.Champdestroy);
router.get('/my', auth.isAuthenticated(), controller.cartmy);
router.post('/user', controller.user);
router.post('/champion', controller.userChamp);
router.post('/cartitem', controller.cartItem);
router.put('/:id/update', controller.updatesingleCart);
router.post('/update', controller.updateCart);

module.exports = router;
//# sourceMappingURL=index.js.map
