var knex = require('./database');

function createChannel(members) {
    knex('channels').insert({members: []}).returning('channelid').then(result => {
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

function getChannels(req, res) {
    knex('users').select(['channels', 'pending_channels']).where({username: req.user}).then(result => {
        res.json(result[0]);
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