/**
 * User Routes
 */

// Dependencies
const Router = require('express').Router();
const userController = require('../controllers/user');
const {checkJwt} = require('../middlewares/auth') ;

/* ================================
	UNAUTHENTICATED ROUTES
================================ */

Router.use('/login', userController.loginUser);

/* ================================
	AUTHENTICATED ROUTES
================================ */

Router.get('/', userController.fetchMembers);

// Router.patch('/', userController);

Router.post('/logout', checkJwt, userController.logout);

module.exports = Router;