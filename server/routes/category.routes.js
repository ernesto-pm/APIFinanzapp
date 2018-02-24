const router                    = require('express').Router();
const jsonParser                = require('body-parser').json();
const CategoryController        = require('../controllers/category.controller');

const customMiddlewares         = require('../custom.middlewares');
const initInternalParams        = customMiddlewares.initInternalParams;
const logRequest                = customMiddlewares.logRequest;
const handle                    = customMiddlewares.handle;
const errorHandler              = customMiddlewares.errorHandler;

/** Custom Middleware **/
router.use(initInternalParams);
router.use(logRequest);


router.route('/category')
    .post(jsonParser, CategoryController.createCategory);


/** Custom Middleware **/
router.use(errorHandler);

module.exports = router;