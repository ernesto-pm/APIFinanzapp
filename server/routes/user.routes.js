const router            = require('express').Router();
const jsonParser        = require('body-parser').json();
const UserController    = require('../controllers/user.controller');

router.route('/user/:id')
    .get(jsonParser, UserController.getUserByID);

router.route('/user')
    .post(jsonParser, UserController.createUser);

router.route('/user/login')
    .post(jsonParser, UserController.login);

module.exports = router;