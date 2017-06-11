'use strict';

module.exports = function (app, next) {
    require('./body_parser')(app);
    require('./database')(next);
};
