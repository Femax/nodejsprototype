var User = require('../models/user.js')
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.addUser = function(req, res) {
    var user = new user({
        login: req.body.login,
        password: req.body.password
    });
    user.save(function(err, user) {
        if (err) console.log(err);
        else {
            var token = jwt.sign(res, global.config.secret, {
                expiresIn: 1440 // expires in 1 hours
            });
            res.status(200).json({
                message: 'Validation successful',
                token: token
            });
        }
    })
};


router.login = function(req, res) {
    var currentUser = user.findUserByName(req.body.name, err => res.status(404).send('wrong login or password'));
    if (currentUser.password === req.body.password) {
        var token = jwt.sign(res, global.config.secret, {
            expiresIn: 1440 // expires in 1 hours
        });
        currentUser.updateToken(token);
        res.status(200).json({
            message: 'Validation successful',
            token: token
        });
    }
};
module.exports = router;
