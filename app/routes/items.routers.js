const items = require('../controllers/items.controller');

module.exports = function(app) {
    app.route(app.rootUrl + '/items').get(items.getItems);
    app.route(app.rootUrl + '/items/:itemId').get(items.getItem);
};