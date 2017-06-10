'use strict';

var app = require('express')();

// TODO - use promise instead
require('./middlewares/index.js')(app, function(err){
    if(err)
        return console.error(err);

    require('./routes.js')(app);

    app.listen(process.env.APP_PORT, function(){
        console.log('listening on port:' + process.env.APP_PORT);
    });
});
