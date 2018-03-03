const User = require('../models/User');

exports.getUserByID = function(req, res) {
    if(!req.params.id) return res.status(400).send({err: "Error, id is required"});

    User.findById(req.params.id, function(err, user){
        if(err) return res.status(500).send({err: err.message});
        if(!user) return res.status(404).send({err: "No user found with that ID"});

        return res.status(200).send({user: user});
    });
};

exports.createUser = function(req, res) {
    if(!req.body.first_name) return res.status(400).send({err: "First name required"});
    if(!req.body.last_name) return res.status(400).send({err: "Last name required"});
    if(!req.body.email) return res.status(400).send({err: "Email name required"});
    if(!req.body.password) return res.status(400).send({err: "Password name required"});

    let newUser = new User();
    newUser.first_name  = req.body.first_name;
    newUser.last_name   = req.body.last_name;
    newUser.email       = req.body.email;
    newUser.setPassword(req.body.password);

    newUser.save(function(err, user) {
        if(err) return res.status(500).send({err: err});
        return res.status(200).send({user: user});
    })

};


exports.login = function (req, res) {
    if(!req.body.email)         return res.status(400).send({err: "No email provided"});
    if(!req.body.password)      return res.status(400).send({err: "No password provided"});

    User.findOne({email: req.body.email}, function(err, user){
        if(err) return res.status(500).send({err: err});
        if(!user) return res.status(404).send({err: "No user found with that email"});

        if(!user.validPassword(req.body.password)) {
            return res.status(401).send({err: "Incorrect password"});
        } else {
            return res.status(200).send({token: user.generateJwt()});
        }

    })
};