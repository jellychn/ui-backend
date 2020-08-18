const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('../tools/token');

validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

exports.register = async function(req, res) {
    if (Object.keys(req.body).includes('email') && Object.keys(req.body).includes('password') && Object.keys(req.body).includes('firstname') && Object.keys(req.body).includes('lastname')) {
        let validated = 0;
        if (req.body.email.length > 0 && validateEmail(req.body.email)) {
            validated += 1;
        }
        if (req.body.password.length >= 8) {
            validated += 1;
        }
        if (req.body.firstname.length > 0) {
            validated += 1;
        }
        if (req.body.lastname.length > 0) {
            validated += 1;
        }
    
        const saltRounds = 10;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const user = {
            'email': req.body.email,
            'password': hashedPassword,
            'firstname': req.body.firstname.toLowerCase(),
            'lastname': req.body.lastname.toLowerCase(),
            'cart': [],
            'favorites': []
        };
    
        if (validated === 4) {
            db.connect().then((client) => {
                client.db('ui').collection('users').find({email:req.body.email}).toArray((err, result) => {
                    if (err) {
                        res.status(500).json({'error':err});
                    } else {
                        if (result.length > 0) {
                            res.status(200).json({'error':'email in use'});
                        } else {
                            client.db('ui').collection('users').insertOne(user);
                            res.sendStatus(201);
                        }
                    }
                })
            }).catch((err) => {
                res.status(500).json({'error':err});
            });
        } else {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(500);
    }
};

exports.login = async function(req, res) {
    if (Object.keys(req.body).includes('email') && Object.keys(req.body).includes('password')) {
        let validated = 0;
        if (req.body.email.length > 0 && validateEmail(req.body.email)) {
            validated += 1;
        }
        if (req.body.password.length > 0) {
            validated += 1;
        }
    
        if (validated === 2) {
            db.connect().then(client => {
                client.db('ui').collection('users').findOne({email:req.body.email}).then(result => {
                    if (result !== null) {
                        let hashedPassword = result.password;
                        bcrypt.compare(req.body.password, hashedPassword).then((r) => {
                            if (r === true) {
                                let token = jwt.encrypt(result._id.toString());
                                client.db('ui').collection('users').updateOne({email:req.body.email}, { $set: { 'token' : token  }})
                                res.status(200).json({'token':token});
                            } else {
                                res.status(200).json({'error':'email and password combination is incorrect'});
                            }
                        });
                    } else {
                        res.status(200).json({'error':'email and password combination is incorrect'});
                    }
                }).catch(err => {
                    res.sendStatus(500);
                });
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

exports.logout = async function(req, res) {
    console.log(req.headers)
    if (req.headers['x-authorization'] !== null || req.headers['x-authorization'] !== '' || req.headers['x-authorization'] !== undefined) {
        db.connect().then(client => {
            client.db('ui').collection('users').findOne({token:req.headers['x-authorization']}).then(result => {
                if (result !== null) {
                    client.db('ui').collection('users').updateOne({token:req.headers['x-authorization']}, { $set: {'token':null}});
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            }).catch(err => {
                res.sendStatus(500);
            });
        }).catch(err => {
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(500);
    }
};

exports.authenticated = async function(req, res) {
    if (req.headers['x-authorization'] !== null || req.headers['x-authorization'] !== '' || req.headers['x-authorization'] !== undefined) {
        db.connect().then(client => {
            client.db('ui').collection('users').findOne({token:req.headers['x-authorization']}).then(result => {
                if (result !== null) {
                    res.sendStatus(200);
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

exports.getUser = async function(req, res) {
    if (req.headers['x-authorization'] !== null || req.headers['x-authorization'] !== '' || req.headers['x-authorization'] !== undefined) {
        db.connect().then(client => {
            client.db('ui').collection('users').findOne({token:req.headers['x-authorization']}).then(result => {
                if (result !== null) {
                    res.status(200).json({
                        '_id': result._id,
                        'email': result.email,
                        'firstname': result.firstname,
                        'lastname': result.lastname,
                        'cart': result.cart,
                        'favorites': result.favorites
                    });
                } else {
                    res.sendStatus(404);
                }
            }).catch(err => {
                res.sendStatus(500);
            });
        }).catch(err => {
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(404);
    }
};

exports.updateUserDetails = async function(req, res) {
    if (Object.keys(req.body).includes('email') && Object.keys(req.body).includes('firstname') && Object.keys(req.body).includes('lastname')) {
        let validated = 0;
        if (req.body.email.length > 0 && validateEmail(req.body.email)) {
            validated += 1;
        }
        if (req.body.firstname.length > 0) {
            validated += 1;
        }
        if (req.body.lastname.length > 0) {
            validated += 1;
        }
    
        if (validated === 3) {
            if (req.headers['x-authorization'] !== null || req.headers['x-authorization'] !== '' || req.headers['x-authorization'] !== undefined) {
                db.connect().then(client => {
                    client.db('ui').collection('users').findOne({email:req.body.email}).then(result => {
                        if (result !== null) {
                            client.db('ui').collection('users').updateOne({token:req.headers['x-authorization']}, { $set: {'email':req.body.email, 'firstname':req.body.firstname, lastname:req.body.lastname}});
                            res.sendStatus(200);
                        } else {
                            res.sendStatus(404);
                        }
                    }).catch(err => {
                        res.sendStatus(404);
                    });
                }).catch(err => {
                    res.sendStatus(500);
                });
            } else {
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(500);
    }
};

exports.updateUserPassword = async function(req, res) {
    if (Object.keys(req.body).includes('oldPassword') && Object.keys(req.body).includes('newPassword')) {
        let validated = 0;
        if (req.body.oldPassword.length > 0) {
            validated += 1;
        }
        if (req.body.newPassword.length >= 8) {
            validated += 1;
        }
    
        if (validated === 2) {
            if (req.headers['x-authorization'] !== null || req.headers['x-authorization'] !== '' || req.headers['x-authorization'] !== undefined) {
                db.connect().then(client => {
                    client.db('ui').collection('users').findOne({token:req.headers['x-authorization']}).then(result => {
                        if (result !== null) {
                            let hashedPassword = result.password;
                            bcrypt.compare(req.body.oldPassword, hashedPassword).then((r) => {
                                if (r === true) {
                                    const saltRounds = 10;
                                    let salt = bcrypt.genSaltSync(saltRounds);
                                    let newHashedPassword = bcrypt.hashSync(req.body.newPassword, salt);
                                    client.db('ui').collection('users').updateOne({token:req.headers['x-authorization']}, { $set: {'password':newHashedPassword}});
                                    res.sendStatus(200);
                                } else {
                                    res.status(200).json({'error':'password does not match this account'});
                                }
                            });
                        } else {
                            res.sendStatus(404);
                        }
                    }).catch(err => {
                        res.sendStatus(404);
                    });
                }).catch(err => {
                    res.sendStatus(500);
                });
            } else {
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(500);
    }
};

exports.updateUserCart = async function(req, res) {
    if (Object.keys(req.body).includes('cart')) {
        if (req.headers['x-authorization'] !== null || req.headers['x-authorization'] !== '' || req.headers['x-authorization'] !== undefined) {
            db.connect().then(client => {
                client.db('ui').collection('users').findOne({token:req.headers['x-authorization']}).then(result => {
                    if (result !== null) {
                        client.db('ui').collection('users').updateOne({token:req.headers['x-authorization']}, { $set: {'cart':req.body.cart}});
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(404);
                    }
                }).catch(err => {
                    res.sendStatus(404);
                });
            }).catch(err => {
                res.sendStatus(500);
            });
        }
    }
};