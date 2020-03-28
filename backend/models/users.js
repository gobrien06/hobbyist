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
                res.status(401);
            };
        });
    }, result => {
        res.status(401);
    });
}

function updateUser(res, user) {
    
}

module.exports = {insert, authenticateJWT, authenticate};

/*
function getMatchingUsers(user, nearby) {
    select hobbies from table where username in user
    
    
    SELECT * FROM TABLE WHERE USERNAME IN (nearby) AND HOBBY @> ARRAY['asdf', 'dsfa', 'adfs']::varchar[]
}
*/