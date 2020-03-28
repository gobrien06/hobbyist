var knex = require('./database');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var accessTokenSecret = "test";

function insert(req, res) {
    bcrypt.hash(req.body.password, 12).then((hash) => {
        knex('users').insert({
        username: req.body.username, 
        phone: req.body.phone,
        password: hash
        }).then(result => {
            let accessToken = jwt.sign({user: req.body.username}, accessTokenSecret);
            res.json({
                token: accessToken
            });
        }, result => {
            res.json({
                success: false
            });
        });
    });
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, payload) => {
            if (err) {
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

function updateUser(req, res) {
    knex('users').where({username: req.user}).update({
        hobby: req.body.hobby,
    }).then(result => {
        res.sendStatus(201);
    }, result => {
        res.sendStatus(400);
        console.log(result);
    });
}


function getMatchingUsers(user, nearby) {
    knex('users').select('hobby').where({username: user.
    
    knex('users').select('*').where(knex.raw("('" + nearby.join("','") + "') and hobby && \"{" + hobby.join("','") + "}\"")).then(result => {
        
    }, result => {
        
    });
}

function getHobby(req, res) {
    knex('users').select('hobby').where({username: req.user}).then(result => {
        res.json({hobby: result});
    }, result => {
        console.log(result);
    });
}

module.exports = {insert, authenticateJWT, authenticate, updateUser, getHobby};

