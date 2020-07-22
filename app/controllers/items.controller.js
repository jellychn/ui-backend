const db = require('../config/db');
const { ObjectId } = require('mongodb');

exports.getItems = async function(req, res) {
    let combine = [{ gender:req.query.gender}]
    if (Object.keys(req.query).includes('q')) {
        const color = 'colors.' + req.query.q;
        combine.push({$or: [{ name: new RegExp(`.*${req.query.q}.*`, "i") }, {[color]:{ $exists : true } }]});
    }
    if (req.query.category !== 'all') {
        combine.push({ category: new RegExp(`.*${req.query.category.slice(0, -1)}.*`, "i") });
    }

    db.connect().then((client) => {
        if (Object.keys(req.query).length === 0) {
            client.db('ui').collection('items').find({ "colors.black" : { $exists : true } }).toArray((err, result) => {
                if (err) throw err
                res.status(200).json(result);
            })
        } else {
            client.db('ui').collection('items').find(
                {$and: combine}).toArray((err, result) => {
                if (err) throw err
                res.status(200).json(result);
            })            
        }
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