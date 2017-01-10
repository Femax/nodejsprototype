var express = require('express');
var router = express.Router();

router.get('/user', function (req, res) {
    const userId = req.body.userId || {};
    User.find({
        userId: userId
    }, function (err, user) {
        if (err) res.status(400).send(err.message);
        else {
            res.status(200).send(user);
        }
    })
});

router.put('/user', function (req, res) {
    const login = req.body.login || {};
    const password = req.body.password || {};
    const phone = req.body.phone || {};

    var user = new User({
        login: login,
        password: password,
        phone: phone
    });
    // user.save(user, fucntion(err, user)
    // {
    //     if (err) res.status(400).send(err);
    //     else res.status(200).send(user);
    // }
    // )
    ;
});


module.exports = router;
