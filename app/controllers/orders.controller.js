const db = require('../config/db');


const validateData = (data) => {
    let validated = true;
    if (data.address.email.length === 0 && !this.validateEmail(data.address.email)) {
        validated = false;
    }
    if (data.address.name.length === 0) {
        validated = false;
    }
    var regex = /^(\+?\d{1,3}|\d{1,4})$/gm
    if (data.address.number.length === 0 && !data.address.number.match(regex)) {
        validated = false;
    }
    if (data.address.mobile.length === 0 && !/^\d+$/.test(data.address.mobile)) {
        validated = false;
    }
    if (data.address.street.length === 0) {
        validated = false;
    }
    if (data.address.country === '-' || data.address.country.length === 0) {
        validated = false;
    }
    if (data.address.state.length === 0) {
        validated = false;
    }
    if (data.address.city.length === 0) {
        validated = false;
    }
    if (data.address.zipcode.length === 0 || !/^\d+$/.test(data.address.zipcode)) {
        validated = false;
    }

    if (data.paymentType.length === 0) {
        validated = false;
    }
    if (!/^\d+$/.test(data.subtotal)) {
        validated = false;
    }
    if (!/^\d+$/.test(data.total)) {
        validated = false;
    }
    if (!/^\d+$/.test(data.delivery)) {
        validated = false;
    }
    if (data.order.length === 0) {
        validated = false;
    }

    return validated;
};

exports.add = async function (req, res) {
    if (
        Object.keys(req.body).includes('paymentType') && 
        Object.keys(req.body).includes('subtotal') && 
        Object.keys(req.body).includes('total') &&
        Object.keys(req.body).includes('delivery') &&
        Object.keys(req.body).includes('order') &&
        Object.keys(req.body).includes('address') &&
        Object.keys(req.body).includes('userId')
    ) {
        if (validateData(req.body)) {
            var d = new Date();

            const order = {
                userId: req.body.userId,
                paymentType: req.body.paymentType,
                subtotal: req.body.subtotal,
                total: req.body.total,
                delivery: req.body.delivery,
                order: req.body.order,
                address: req.body.address,
                proccesed: false,
                ordered: false,
                date: d.toLocaleString(),
                status: 'pending'
            };

            db.connect().then(client => {
                client.db('ui').collection('orders').insertOne(order);
                res.sendStatus(201);
            }).catch(err => {
                res.sendStatus(500);
            });
        } else {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(500);
    }
};

exports.getUserOrders = async function (req, res) {
    if (req.headers['x-authorization'] !== null || req.headers['x-authorization'] !== '' || req.headers['x-authorization'] !== undefined) {
        db.connect().then(client => {
            client.db('ui').collection('users').findOne({token:req.headers['x-authorization']}).then(result => {
                if (result !== null) {
                    client.db('ui').collection('orders').find({userId:String(result._id)}).toArray((err, userOrders) => {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.status(200).json(userOrders);
                        }
                    });
                } else {
                    res.sendStatus(404);
                }
            }).catch(err => {
                res.sendStatus(500);
            });
        }).catch(err => {
            res.sendStatus(500);
        })
    }
};