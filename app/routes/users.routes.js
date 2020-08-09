const users = require('../controllers/users.controller');

module.exports = function(app) {
    app.route(app.rootUrl + '/users/register').post(users.register);
    app.route(app.rootUrl + '/users/login').post(users.login);
    app.route(app.rootUrl + '/users/authenticated').post(users.authenticated);
    app.route(app.rootUrl + '/users/updateDetails').post(users.updateUserDetails);
    app.route(app.rootUrl + '/users/updatePassword').post(users.updateUserPassword);
};