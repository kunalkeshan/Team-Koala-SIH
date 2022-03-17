/**
 * Committee Head Routes
 */

// Dependencies
const Router = require('express').Router();
const committeeHeadController = require('../controllers/committeeHead');
const {checkJwt, checkRole} = require('../middlewares/auth');

/* ================================
	UNAUTHENTICATED ROUTES
================================ */

/* ================================
	AUTHENTICATED ROUTES
================================ */

Router.post('/committeeMember', checkJwt, checkRole(['Committee Head']), committeeHeadController.createCommitteeMember);

Router.post('/event', checkJwt, checkRole(['Committee Head']), committeeHeadController.createEvent);

module.exports = Router;