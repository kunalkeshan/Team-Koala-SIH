/**
 * Committee Member Routes
 */

// Dependencies
const Router = require('express').Router();
const committeeMemberController = require('../controllers/committeeMember');
const {checkJwt, checkRole} = require('../middlewares/auth');

/* ================================
	UNAUTHENTICATED ROUTES
================================ */

/* ================================
	AUTHENTICATED ROUTES
================================ */

module.exports = Router;