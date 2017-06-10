'use strict';

module.exports = function(app){
    var express = require('express');
    var router = express.Router();

    app.use('/healthcheck', require('./resources/healthcheck'));
    app.use('/', require('./resources/resume'));
};
