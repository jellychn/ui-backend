const orders = require('../controllers/orders.controller');

module.exports = function(app) {
    app.route(app.rootUrl + '/orders/add').post(orders.add);
    app.route(app.rootUrl + '/orders/userOrders').post(orders.getUserOrders);
};