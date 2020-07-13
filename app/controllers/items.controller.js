const db = require('../config/db');
const { ObjectId } = require('mongodb');

exports.getItems = async function(req, res) {
    db.connect().then((client) => {
        client.db('ui').collection('items').find().toArray((err, result) => {
            if (err) throw err
            res.status(200).json(result);
          })
    });
};

exports.getItem = async function (req, res) {
    db.connect().then((client) => {
        client.db('ui').collection('items').findOne({"_id":ObjectId(req.params.itemId)}, (err, result) => {
            if (err) throw err
            res.status(200).json(result)
        });
    })
};