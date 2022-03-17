/**
 * Admin Routes
 */

// Dependencies
const Router = require('express').Router();
const adminController = require('../controllers/admin');
const {checkJwt, checkRole} = require('../middlewares/auth');

/* ================================
	UNAUTHENTICATED ROUTES
================================ */

/* ================================
	AUTHENTICATED ROUTES
================================ */

Router.post('/', checkJwt, checkRole(['Admin']), adminController.createAdmin);

Router.post('/aicte', checkJwt, checkRole(['Admin']), adminController.createAICTEAdmin);

module.exports = Router;