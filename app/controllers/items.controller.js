const db = require('../config/db');

exports.getItems = async function(req, res) {
    db.connect().then((client) => {
        client.db('ui').collection('items').find().toArray((err, result) => {
            if (err) throw err
            res.status(200).json(result);
          })
    });
};