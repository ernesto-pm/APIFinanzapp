const _ = require('lodash')

const handlePromisedResponse = func => (req, res, next) => {
    func(req)
        .then(filterQueryParams(req.query))
        .then(result => res.json(result))
        .catch(err => next(err))
}

const filterQueryParams = ({ fields, omit }) => result => {
    const filterParams = obj => fields ? _.pick(obj, fields.split(','))
        : omit ? _.omit(obj, omit.split(','))
            : obj

    return Array.isArray(result) ? _.map(result, filterParams) : filterParams(result)
}

exports.handle = func => handlePromisedResponse(req => {
    return func(_.assign({}, req.query, req.params, req.internal))
})

exports.initInternalParams = (req, res, next) => {
    req.internal = {}
    next()
}

exports.logRequest = (req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url} from ${req.ip}`)
    next()
}

exports.errorHandler = (err, req, res, next) => {
    if (err) {
        res.status(err.status || 500).json({ error: err.message })
    } else {
        next()
    }
}