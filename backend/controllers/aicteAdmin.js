/**
 * AICTE Admin Controller
 */

// Dependencies
const User = require('../models/User');
const Log = require('../models/Log');
const { nanoid } = require('nanoid');

// AICTE Admin controller container
const aicteAdminController = {};

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */

aicteAdminController.createCommitteeHead = async (req, res, next) => {
    // Collecting required information from Middleware
    const { loggedInUser } = res.locals;
    try {
        const password = nanoid();
        const user = new User({ ...req.body, password, role: 'Committee Head', meta: {createdBy: loggedInUser._id} });
        await user.save();

        await Log.create({ type: 'Create Account', log: `${loggedInUser.fullName} created an account for ${user.fullName} with {id:${user._id}} at ${Date().toString()}`, user: loggedInUser._id });

        // TODO: Email created user about their account creation and send their unhashed password in it
        return res
            .status(201)
            .json({
                message: 'Committee Head created successfully',
                // TODO: Remove Password after email is created
                data: { user: { ...user.sanitizeAndReturnUser(), password } },
                success: true,
            });
    } catch (error) {
        next(error);
    }
}

module.exports = aicteAdminController;