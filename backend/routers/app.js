/**
 * App Routes
 */

// Dependencies
const Router = require('express').Router();
const appController = require('../controllers/app');
const { checkJwt, checkRole } = require('../middlewares/auth');

/* ================================
    UNAUTHENTICATED ROUTES
================================ */

/* ================================
    AUTHENTICATED ROUTES
================================ */

Router.get('/logs', checkJwt, checkRole(["Admin", "AICTE Admin", "Committee Head"]), appController.fetchLogs);

module.exports = Router;