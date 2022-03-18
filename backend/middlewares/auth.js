/**
 * Authentication Middleware
 */

// Dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secrets: { jwtSecret } } = require('../config');

// Authentication container
const authenticate = {};

// Check if a Valid Jwt Exists
authenticate.checkJwt = async (req, res, next) => {
    const { authToken } = req.signedCookies;
    try {
        if (!authToken) throw new Error();
        const jwtPayload = jwt.verify(authToken, jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res
            .status(401)
            .json({
                message: 'Not Authorized',
                data: {},
                success: false
            });
    }
    return next();
};

// Check allowed role
authenticate.checkRole = (ROLES = []) => async (req, res, next) => {
    const { _id } = res.locals.jwtPayload;
    let user;
    try {
        user = await User.findById(_id);
        if (ROLES.includes(user.role)) {
            res.locals.user = user;
            return next();
        };
        throw new Error();
    } catch (error) {
        return res
            .status(401)
            .json({
                message: 'Not Authorized',
                data: {},
                success: false
            });
    }
};

// Exporting authentication middleware
module.exports = authenticate;