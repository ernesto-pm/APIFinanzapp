const router                    = require('express').Router();
const jsonParser                = require('body-parser').json();
const TransactionController     = require('../controllers/transaction.controller');

const customMiddlewares         = require('../custom.middlewares');
const initInternalParams        = customMiddlewares.initInternalParams;
const logRequest                = customMiddlewares.logRequest;
const handle                    = customMiddlewares.handle;
const errorHandler              = customMiddlewares.errorHandler;

/** Custom Middleware **/
router.use(initInternalParams);
router.use(logRequest);


router.route('/transaction')
    .get(jsonParser, handle(TransactionController.getTransaction))
    .post(jsonParser, TransactionController.createTransaction);


/** Custom Middleware **/
router.use(errorHandler);

module.exports = router;