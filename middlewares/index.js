'use strict';

module.exports = function (app, next) {
    require('./logger')(app);
    require('./body_parser')(app);
    require('./response_time')(app);
    require('./database')(next);
};
