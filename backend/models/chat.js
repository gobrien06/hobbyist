var knex = require('./database');

function createChannel(members) {
    knex('channels').insert({members: []}).returning('channelid').then(result => {
        console.log(result);
        console.log(members[0]);
        for(let i = 0; i < members.length; ++i) {
            let user = members[i];
            knex('users').update({
                pending_channels: knex.raw("pending_channels || '{\"" + result.join("','") + "\"}'")
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

function getChannels(req, res) {
    knex('users').select(['channels', 'pending_channels']).where({username: req.user}).then(allChannels => {
        let promises = [];
        let pending_channels = [];
        let channels = [];
        if(allChannels[0]['pending_channels'].length != 0) {
            promises.push(knex('channels').select('*').where(knex.raw("channelid in ('" + allChannels[0]['pending_channels'].join("','") + "')")).then(result => {
                for(let i = 0; i < result.length; i++) {
                    let members = [...result[i]['members'], ...result[i]['pending_members']];
                    members = members.filter((e) => {return e != req.user});
                    if(members.length != 0) {
                        pending_channels.push({channelId: result[i]['channelid'], members: members});
                    }
                }
            }, result => {
               console.log(result); 
            }));
        }
        if(allChannels[0]['channels'].length != 0) {
            promises.push(knex('channels').select('*').where(knex.raw("channelid in ('" + allChannels[0]['channels'].join("','") + "')")).then(result => {
                for(let i = 0; i < result.length; i++) {
                    let members = [...result[i]['members'], ...result[i]['pending_members']];
                    members = members.filter((e) => {return e != req.user});
                    if(members.length != 0) {
                        channels.push({channelId: result[i]['channelid'], members: members});
                    }
                }
            }, result => {
               console.log(result); 
            }));
            
        }
        Promise.all(promises).then(result => {
            console.log({channels: channels, pending_channels: pending_channels});
            res.json({channels: channels, pending_channels: pending_channels});
        });
                
    }, result => {
        console.log(result);
    });    
}

function joinChannel(req, res) {
    knex('channels').update({
        members: knex.raw("array_append(members, ?)", req.user),
        pending_members: knex.raw("array_remove(pending_members, ?)", req.user)
    }).where({channelid: req.body.channelId}).then(result => {
        knex('users').update({
            channels: knex.raw("array_append(channels, ?)", req.body.channelId),
            pending_channels: knex.raw("array_remove(pending_channels, ?)", req.body.channelId)
        }).where({username: req.user}).then(result => {
            res.sendStatus(201);
            console.log(result);
        }, result => {
            res.sendStatus(400);
            console.log(result);
        });
    }, result => {
        res.sendStatus(400);
        console.log(result)
    });
}

function leaveChannel(req, res) {
     knex('channels').update({
         //delete row
        members: knex.raw("array_remove(members, ?)", req.user)
    }).where({channelid: req.body.channelId}).then(result => {
        knex('users').update({
            channels: knex.raw("array_remove(channels, ?)", req.body.channelId),
            pending_channels: knex.raw("array_remove(pending_channels, ?)", req.body.channelId),
        }).where({username: req.user}).then(result => {
            res.sendStatus(201);
            console.log(result);
        }, result => {
            res.sendStatus(400);
            console.log(result);
        });
    }, result => {
        res.sendStatus(400);
        console.log(result)
    });
    
}

function sendMessage(req, res) {
    knex('messages').insert({
        channelid: req.body.channelId,  
        content: req.body.message,
        date: (new Date()).toISOString()
    }).then(result => {
        res.sendStatus(201);
        console.log(result); 
    }, result => {
        res.sendStatus(400);
        console.log(result);
    });
}

function getMessages(req, res) {
    console.log('reee');
    knex('messages').select('*').where({channelid: req.body.channelId}).then(result => {
        res.status(201);
        res.json({messages: result});
        console.log(result);
    }, result => {
        res.sendStatus(400);
        console.log(result);
    });
}

module.exports = {createChannel, getChannels, sendMessage, getMessages, joinChannel, leaveChannel};