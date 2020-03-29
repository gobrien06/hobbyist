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


async function getMatchingUsers(req, res, nearby) {
    knex('users').select(['hobby', 'connected_members']).where({username: req.user}).then(user_info => {     
        let hobby = user_info[0]['hobby'];
        if(hobby) {
            //Match hobbies
            knex('users').select(['username', 'hobby']).where(knex.raw("\"username\" not in ('" + user_info[0]['connected_members'].join("','") + "') and \"username\" in ('" + nearby.map(n => n.username).join("','") + "') and hobby && '{\"" + hobby.join("\",\"") + "\"}'")).then(result => {
                let promises = [];
                console.log(result);
                //Create channel for each match
                for(let i = 0; i < result.length; i++) {
                    let members = [req.user, result[i]['username']];
                    promises.push(knex('channels').insert({members: [], pending_members: members}).returning('channelid').then(channelId => {
                        result[i]['pending_channel'] = channelId[0];
                        result[i]['hobby'] = result[i]['hobby'].filter(value => hobby.includes(value));
                        console.log('members' + members.length);
                        //Add matches to each others blacklist
                        for(let k = 0; k < members.length; k++) {
                            console.log('k ' + k);
                            let user = members[k];         
                            console.log(members.filter((e, index) => {return index != k}));  
                            knex('users').update({
                                pending_channels: knex.raw("array_append(pending_channels, ?)", channelId[0]),
                                connected_members: knex.raw("connected_members || '{\"" + members.filter((e, index) => {return index != k}).join("','") + "\"}'")
                            }).where({username: user}).then(result => {  
                                console.log(result);
                            }, result => {
                                console.log(result);
                            });
                            console.log(members);
                        }                
                        
                    }, result => {
                        console.log(result)
                    })); 
                }
                Promise.all(promises).then(() => {
                    console.log('rea');
                    console.log(result);
                    res.json(result);
                });
            }, result => {
                console.log(result);
                res.json([]);
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

