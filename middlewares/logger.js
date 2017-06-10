'use strict';

var logger = require('morgan');

module.exports = function(app){
    app.use(logger(function(tokens, req, res){

        return [
            `timestamp=${tokens['date'](req, res, 'iso')}`,
            `request_method=${tokens.method(req, res)}`,
            `request_url=${tokens.url(req, res)}`,
            `request_body=${JSON.stringify(req.body)}`,
            `response_body=${JSON.stringify(res.body)}`,
            `response_status=${tokens.status(req, res)}`,
            `response_time=${tokens['response-time'](req, res)}`,
        ].join(', ');
    }));
};
