/**
 * Application Router Hub
 */

// Dependencies
const Router = require('express').Router();
const appRouter = require('./app');
const userRouter = require('./user');
const adminRouter = require('./admin');
const aicteAdminRouter = require('./aicteAdmin');
const committeeHeadRouter = require('./committeeHead');
const committeeMemberRouter = require('./committeeMember');

Router.use('/api/app', appRouter);
Router.use('/api/user', userRouter);
Router.use('/api/admin', adminRouter);
Router.use('/api/aicte', aicteAdminRouter);
Router.use('/api/committee/head', committeeHeadRouter);
Router.use('/api/committee/member', committeeMemberRouter);

/* ================================
	UNAUTHENTICATED ROUTES
================================ */

Router.get('/', (req, res, next) => {
	try {
		return res
			.status(200)
			.json({
				message: 'Prototype application for P-32 AICTE event management dashboard of Smart India Hackathon created by Team Koala.',
				data: {
					team: {
						name: 'Team Koala',
						members: [],
						repository: {
							url: 'https://github.com/kunalkeshan/Team-Koala-SIH/',
						},
						project: 'https://team-koala-sih.vercel.app',

					}
				},
				success: true,
			})
	} catch (error) {
		return next(error);
	}
})

/* ================================
	AUTHENTICATED ROUTES
================================ */

// Exporting Router
module.exports = Router;