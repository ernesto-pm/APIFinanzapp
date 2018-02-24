const Transaction   = require('../models/Transaction');
const _             = require('lodash');
const FILTER_KEYS   = ['user_id', 'year']

exports.createTransaction = function(req, res) {
    if(!req.body.user_id)           return res.status(400).send({err: "Error, user_id required"});
    if(!req.body.category)          return res.status(400).send({err: "Error, category required"});
    if(!req.body.date)              return res.status(400).send({err: "Error, date required"});
    if(!req.body.quantity)          return res.status(400).send({err: "Error, quantity required"});
    if(!req.body.is_expenditure)    return res.status(400).send({err: "Error, is_expenditure required"});

    let newTransaction = new Transaction();
    newTransaction.user                         = req.body.user_id;
    newTransaction.category                     = req.body.category;

    newTransaction.date                         = new Date(req.body.date);
    newTransaction.day                          = newTransaction.date.getDay();
    newTransaction.month                        = newTransaction.date.getMonth();
    newTransaction.year                         = newTransaction.date.getFullYear();

    newTransaction.quantity                     = req.body.quantity;
    newTransaction.is_expenditure               = req.body.is_expenditure;
    if(req.body.concept) newTransaction.concept = req.body.concept;

    newTransaction.save(function(err, transaction) {
        if(err) return res.status(500).send({err: err});
        return res.status(200).send({transaction: transaction});
    })

};


exports.getTransaction = params => {

    params = _.pick(params, FILTER_KEYS)
    if(_.isEmpty(params)) return Promise.reject(new Error("No parameters, you need to specify user_id"))

    return Transaction.find({
        user: params.user_id,
        year: _.has(params, "year") ? {"$eq" : params.year} : {"$gte" : 1900}
    }).populate("category");
}