const Category   = require('../models/Category');

exports.createCategory = function(req, res) {

    if(!req.body.user_id)           return res.status(400).send({err: "Error, user_id required"});
    if(!req.body.type)              return res.status(400).send({err: "Error, type required"});

    let newCategory     = new Category();
    newCategory.user    = req.body.user_id;
    newCategory.type    = req.body.type;

    newCategory.save(function(err, category) {
        if(err) return res.status(500).send({err: err});
        return res.status(200).send({category: category});
    })

};