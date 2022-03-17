/**
 * AICTE Admin Routes
 */

// Dependencies
const Router = require('express').Router();
const aicteAdminController = require('../controllers/aicteAdmin');
const { checkJwt, checkRole } = require('../middlewares/auth');

/* ================================
    UNAUTHENTICATED ROUTES
================================ */

/* ================================
    AUTHENTICATED ROUTES
================================ */

Router.post('/committeeHead', checkJwt, checkRole(['AICTE Admin']), aicteAdminController.createCommitteeHead)

module.exports = Router;