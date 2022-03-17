/**
 * Admin Controller
 */

// Dependencies
const User = require('../models/User');
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
    try {
        const password = nanoid()
        const user = new User({ ...req.body, password, role: 'Admin' });
        await user.save();

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
        const user = new User({ ...req.body, password: nanoid(), role: 'AICTE Admin' });
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