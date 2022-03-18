/**
 * Admin Controller
 */

// Dependencies
const User = require('../models/User');
const Log = require('../models/Log');
const { nanoid } = require('nanoid');

// Admin controller container
const adminController = {};

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */

adminController.createAdmin = async (req, res, next) => {
    // Collecting required information from Middleware
    const { loggedInUser } = res.locals;
    try {
        const password = nanoid()
        const user = new User({ ...req.body, password, role: 'Admin', meta: {createdBy: loggedInUser._id} });
        await user.save();

        await Log.create({ type: 'Create Account', log: `${loggedInUser.fullName} created an account for ${user.fullName} with {id:${user._id}} at ${Date().toString()}`, user: loggedInUser._id });

        // TODO: Email created admin about their account creation and send their unhashed password in it
        return res
            .status(201)
            .json({
                message: 'Admin created successfully',
                // TODO: Remove Password after email is created
                data: { user: { ...user.sanitizeAndReturnUser(), password } },
                success: true,
            });
    } catch (error) {
        next(error);
    }
}

adminController.createAICTEAdmin = async (req, res, next) => {
    try {
        const password = nanoid();
        const user = new User({ ...req.body, password, role: 'AICTE Admin' });
        await user.save();

        // TODO: Email created admin about their account creation and send their unhashed password in it
        return res
            .status(201)
            .json({
                message: 'AICTE Admin created successfully',
                // TODO: Remove Password after email is created
                data: { user: { ...user.sanitizeAndReturnUser(), password } },
                success: true,
            });
    } catch (error) {
        next(error);
    }
}

module.exports = adminController;