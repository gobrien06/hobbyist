var express = require('express');
var router = express.Router();
var users = require('../models/users');
var auth = require('../models/auth');
var geohashmap = require('../models/geohashmap');

router.post('/users', function(req, res) {
    users.insert(req, res);
});


router.post('/users/geo', auth.authenticateJWT, function(req, res) {
    let nearby = geohashmap.add({
        username: req.user,
        timestamp: Date.now(),
        lat: req.body.lat,
        lon: req.body.lon
    });
    if(nearby.length == 0) {
        res.json({nearby: []});
    } else {
        users.getMatchingUsers(req, res, nearby);
    }
});

router.post('/users/update', auth.authenticateJWT, function(req, res) {
    users.updateUser(req, res);
});

router.get('/users/hobby', auth.authenticateJWT, function(req, res) {
    users.getHobby(req, res);
});

router.post('/auth', function(req, res) {
    auth.authenticate(req, res);
});

module.exports = router;