var knex = require('./database');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var bcrypt = require('bcrypt');

var accessTokenSecret = crypto.randomBytes(64).toString('hex');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, payload) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }
            req.user = payload.user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

function authenticate(req, res) {
    knex('users').select('*').where({username: req.body.username}).then(result => {
        bcrypt.compare(req.body.password, result[0]['password'], (err, result) => {
            if(result == true) {
                let accessToken = jwt.sign({user: req.body.username}, accessTokenSecret);
                res.json({
                    token: accessToken
                });
            } else {
                res.sendStatus(401);
            };
        });
    }, result => {
        res.sendStatus(401);
    });
}

module.exports = {authenticateJWT, authenticate};