'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, '../client/uploads');
  },
  filename: function filename(req, file, callback) {

    callback(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage }).any();
var controller = require('./order.controller');

var auth = require('../../auth/auth.service');
var router = express.Router();
router.get('/my', auth.isAuthenticated(), controller.myOrders);
router.get('/latest', controller.company);
router.post('/newcontact', controller.newcontact);
router.get('/employee', auth.isAuthenticated(), controller.employee);
router.get('/', controller.index);
router.get('/:id', auth.hasRole('manager'), controller.show);
router.post('/', auth.isAuthenticated(), upload, controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
