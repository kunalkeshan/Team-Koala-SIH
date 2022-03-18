/**
 * App Controller
 */

// Dependencies
const Log = require('../models/Log');

// App controller container
const appController = {};

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */

/**
 * @route GET /api/app/logs 
 */
appController.fetchLogs = async (req, res, next) => {
    // Collecting required information for Middleware and Request Query
    const { user } = res.locals;
    let { offset = 0 } = req.query;
    try {
        let logs = [];
        logs = await Log.find().skip(offset).limit(20).populate({ path: 'user', select: 'name _id email username avatar' }).lean();
        if (user.role === 'Committee Head') {
            logs = logs.filter((log) => user.role === log.user.role);
        }
        await Log.create({ type: 'Log Access', log: `${user.fullName} accessed activity log at ${Date().toString()}`, user: user._id });
        return res
            .status(200)
            .json({
                message: 'Activity Logs fetched',
                data: { logs },
                success: true,
            })
    } catch (error) {
        next(error);
    }
}

// Exporting App controller
module.exports = appController;
