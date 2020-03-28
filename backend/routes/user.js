var express = require('express');
var router = express.Router();
var users = require('../models/users');
var geohashmap = require('../models/geohashmap');

router.post('/users', function(req, res) {
    users.insert(req, res);
});


router.post('/users/geo', users.authenticateJWT, function(req, res) {
    let nearby = geohashmap.add({
        username: req.user,
        timestamp: Date.now(),
        lat: req.body.lat,
        lon: req.body.lon
    });
    res.json(nearby);
});

router.post('/users/update', users.authenticateJWT, function(req, res) {
    users.updateUser(req, res);
});

router.post('/auth', function(req, res) {
    users.authenticate(req, res);
});

module.exports = router;