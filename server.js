let express = require('express');

let app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');
    statuteModel = require('./api/models/statuteModel')
    locationModel = require('./api/models/locationModel')

/* initialize services */
require('./api/manager');

let routes = require('./api/routes/routes.js');

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json())

routes.forEach(function(route) {
    app.use('/api' + route.url, route.route);
});

app.get('/', function(req, res) {
    res.send('Server Running!');
});

app.listen(3000, function() {
    console.log('Server running on port: ' + port);
});
