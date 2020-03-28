var knex = require('./database');
var bcrypt = require('bcrypt');
var chat = require('../models/chat');

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


function updateUser(req, res) {
    knex('users').where({username: req.user}).update({
        hobby: req.body.hobby.map(s => s.toLowerCase()),
    }).then(result => {
        res.sendStatus(201);
    }, result => {
        res.sendStatus(400);
        console.log(result);
    });
}


function getMatchingUsers(req, res, nearby) {
    knex('users').select('hobby').where({username: req.user}).then(hobby => {     
        hobby = hobby[0]['hobby'];
        if(hobby) {
            console.log(hobby);
            knex('users').select(['username', 'hobby']).where(knex.raw("\"username\" in ('" + nearby.map(n => n.username).join("','") + "') and hobby && '{\"" + hobby.join("\",\"") + "\"}'")).then(result => {
                for(let i = 0; i < result.length; ++i) {
                    let members = [req.user, result[i]['username']];
                    knex('channels').insert({members: [], pending_members: members}).returning('channelid').then(result => {
                        result[i]['pending_channel'] = result[0];
                        result[i]['hobby'] = result[i]['hobby'].filter(value => hobby.includes(value));
                        console.log(result);
                        console.log(members[0]);
                        for(let i = 0; i < members.length; ++i) {
                            let user = members[i];
                            knex('users').update({
                                pending_channels: knex.raw("array_append(pending_channels, ?)", result[0])
                            }).where({username: user}).then(result => {
                                console.log(result);
                            }, result => {
                                console.log(result);
                            });
                        }
                    }, result => {
                        console.log(result)
                    });                        
                }
                res.json({nearby: result});
            }, result => {
                console.log(result);
                res.json({nearby: []});
            });
        } else {
            res.json({nearby: []});
        }
    }, result => {
        console.log(result);
        res.json({nearby: []});
    });
}

function getHobby(req, res) {
    knex('users').select('hobby').where({username: req.user}).then(result => {
        res.json(result[0]);
    }, result => {
        console.log(result);
    });
}

module.exports = {insert, getMatchingUsers, updateUser, getHobby};

