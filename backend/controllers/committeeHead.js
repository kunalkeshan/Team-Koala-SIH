/**
 * Committee Head Controller
 */

// Dependencies
const User = require('../models/User');
const Event = require('../models/Events');
const { nanoid } = require('nanoid');

// Committee head controller container
const committeeHeadController = {};

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */

committeeHeadController.createCommitteeMember = async (req, res, next) => {
    try {
        const password = nanoid();
        const user = new User({ ...req.body, password, role: 'Committee Member' });
        await user.save();

        // TODO: Email created user about their account creation and send their unhashed password in it
        return res
            .status(201)
            .json({
                message: 'Committee Member created successfully',
                // TODO: Remove Password after email is created
                data: { user: { ...user.sanitizeAndReturnUser(), password } },
                success: true,
            });
    } catch (error) {
        next(error);
    }
}

committeeHeadController.createEvent = async (req, res, next) => {
    let {committees} = req.body;
    const {title, description, date, location} = req.body;
    try {
        committees = committees.map((committee) => {
            return {committee}
        })
        let members = await User.find({'$or': [...committees]}).select({_id: 1});
        members = members.map((member) => member._id);
        const event = new Event({
            title, 
            description, 
            host: res.locals.jwtPaload._id,
            attendees: members,
            date,
            location,
         });
         await event.save();
         return res
            .status(201)
            .json({
                message: 'Event cretaed',
                data: {event: {...event.toObject()}},
                success: true,
            });
    } catch (error) {
        next(error);
    }
}
module.exports = committeeHeadController;