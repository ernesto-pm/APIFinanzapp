let user        = require('./routes/user.routes');
let transaction = require('./routes/transaction.routes');
let category    = require('./routes/category.routes');

let api_routes = function(app) {
    app.use('/api/v1/', user);
    app.use('/api/v1/', transaction);
    app.use('/api/v1/', category);
};

module.exports = api_routes;