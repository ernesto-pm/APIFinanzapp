const express           = require('express');
const PORT              = process.env.port || 8016;
const bodyParser        = require('body-parser');
const methodOverride    = require('method-override');
const routes            = require('./server/routes');
const colors            = require('colors');
const app               = express();
require('./server/config/db');


app.use(methodOverride("X-HTTP-Method-Override"));
routes(app);

app.listen(PORT, () => {
    console.log(`Server running on: ${PORT}`.green);
});