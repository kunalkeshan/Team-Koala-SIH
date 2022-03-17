/**
 * AICTE Admin Controller
 */

// Dependencies
const User = require('../models/User');
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
    try {
        const user = new User({ ...req.body, password: nanoid(), role: 'Committee Head' });
        await user.save();

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