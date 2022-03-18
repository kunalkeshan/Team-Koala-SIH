/**
 * User Controller
 */

// Dependencies
const User = require('../models/User');
const Log = require('../models/Log');

// User controller container
const userController = {};

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

/**
 * @route POST /api/user/login
 */
userController.loginUser = async (req, res, next) => {
    const { email = '', username = '', password } = req.body;
    try {
        const user = await User.findOne({ '$or': [{ email }, { username }] });
        if (!user) throw new Error('No such user found');

        const isUserPassword = await user.authenticatePassword(password);
        console.log(isUserPassword)
        if (!isUserPassword) throw new Error('Wrong password');

        await Log.create({ type: 'Login', log: `${user.fullName} logged in at ${Date().toString()}`, user: user._id });
        await User.updateOne({ _id: user._id }, { meta: { lastLogin: Date.now() } });

        const ONE_DAY = 60 * 60 * 24 * 1000;
        res.cookie('authToken', user.authToken, {
            httpOnly: true,
            signed: true,
            maxAge: ONE_DAY,
        });

        return res.status(200).json({
            message: 'Login successful',
            data: { user: user.sanitizeAndReturnUser() },
            success: true,
        });
    } catch (error) {
        next(error);
    }
}

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */

userController.fetchMembers = async (req, res, next) => {
    try {
        const { committee } = req.query;
        let members = await User.find({ committee });
        members = members.map((member) => {
            return member.sanitizeAndReturnUser();
        });
        return res
            .send(200)
            .json({
                message: 'Members fetched',
                members,
                success: true,
            })
    } catch (error) {
        next(error);
    }
}

userController.updateUserDetails = async (req, res, next) => {
    const { _id } = res.locals.jwtPayload;
    const { name, email, username, phone } = req.body;
    try {
        const user = await User.findById(_id);
        const details = {
            name: {
                first: name.first || user.name.first,
                middle: name.middle || user.name?.middle,
                last: name.last || user.name.last,
            },
            email: email || user.email,
            username: username || user.username,
            phone: phone || user.phone,
        };

        await User.updateOne({ _id }, { ...details });
        return res
            .status(200)
            .json({
                message: 'Details updated',
                data: { details },
                success: true,
            });
    } catch (error) {
        next(error);
    }
};

userController.logout = async (req, res, next) => {
    try {
        return res
            .clearCookie('authToken')
            .status(200)
            .json({
                message: 'Logout successfull',
                data: {},
                success: true,
            })
    } catch (error) {
        next(error);
    }
}

module.exports = userController;