var express = require('express');
const bodyParser = require('body-parser');

const allowCrossOriginRequests = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
};

module.exports = function () {
    const app = express();
    app.rootUrl = '/api';

    // MIDDLEWARE
    app.use(allowCrossOriginRequests);
    app.use(bodyParser.json());
    app.use(bodyParser.raw({ type: 'text/plain'}));  // for the /executeSql endpoint
    app.use(bodyParser.raw({ type: 'image/png', limit: '50mb' }));  // for the /executeSql endpoint
    app.use(bodyParser.raw({ type: 'image/jpeg', limit: '50mb' }));  // for the /executeSql endpoint
    app.use(bodyParser.raw({ type: 'multipart/form-data', limit: '50mb' }));  // for the /executeSql endpoint

    // ROUTES
    require('../routes/items.routers')(app);
    require('../routes/users.routes')(app);
    require('../routes/orders.routes')(app);

    // DEBUG (you can remove this)
    app.get('/', function (req, res) {
        res.send({ 'message': 'Hello World!' })
    });

    return app;
}