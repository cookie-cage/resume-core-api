'use strict';

var responseTime = require('response-time');

module.exports = function (app) {
    app.use(responseTime());
};
