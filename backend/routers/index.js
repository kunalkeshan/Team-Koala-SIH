/**
 * Application Router Hub
 */

// Dependencies
const Router = require('express').Router();
const userRouter = require('./user');
const adminRouter = require('./admin');
const aicteAdminRouter = require('./aicteAdmin');
const committeeHeadRouter = require('./committeeHead');
const committeeMemberRouter = require('./committeeMember');

Router.use('/api/user', userRouter);
Router.use('/api/admin', adminRouter);
Router.use('/api/aicte', aicteAdminRouter);
Router.use('/api/committee/head', committeeHeadRouter);
Router.use('/api/committee/member', committeeMemberRouter);

/* ================================
	UNAUTHENTICATED ROUTES
================================ */

/* ================================
	AUTHENTICATED ROUTES
================================ */

// Exporting Router
module.exports = Router;