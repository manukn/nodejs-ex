'use strict';

var express = require('express');
var email = require('./send');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const sendmail = require('sendmail')();
var router = express.Router();
router.post('/', function (req, res) {
    var options = {
        auth: {
            api_key: process.env.SENDGRID_APIKEY
        }
    };
    if(req.body.text) req.body.html=req.body.text;
    //var mailer = nodemailer.createTransport(sgTransport(options));
    sendmail(req.body, function (error, info) {
        if (error) {
            res.status('400').json({ err: error });
        } else {
            res.status('200').json({ success: true });
        }
    });
});

module.exports = router;
//# sourceMappingURL=index.js.map
