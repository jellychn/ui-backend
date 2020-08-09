const crypto = require('crypto');
const config = require('./config');

exports.encrypt = function(data) {
    var cipher = crypto.createCipher('aes-256-ecb', config.secret);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
};

exports.decrypt = function(data) {
    var cipher = crypto.createDecipher('aes-256-ecb', config.secret);
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
};