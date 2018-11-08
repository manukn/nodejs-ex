'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.send = send;
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const sendmail = require('sendmail')();
function send(req) {
    var options = {
        auth: {
            api_key: process.env.SENDGRID_APIKEY
        }
    };

    //var mailer = nodemailer.createTransport(sgTransport(options));
if(req.text) req.html=req.text;
    sendmail(req, function (error, info) {
        var res = {};
        if (error) {
            res = { status: 408, err: error };
        } else {
            res = { status: 200, success: true };
        }
        return res;
    });
}
//# sourceMappingURL=send.js.map
