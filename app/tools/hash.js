const bcrypt = require('bcrypt');

exports.hash = async function(password) {
    const saltRounds = 10;
    let salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};