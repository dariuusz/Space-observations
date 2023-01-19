module.exports = function (app) {
    //include mongoose configuration
    const mongoose = require("../config/dbconfig");
    //catching errors and sending message from line 55
    const catchAsync = require("../catching_error/catchAsync");
    // Express 404 error
    const ExpressError = require("../catching_error/ExpressError");
    const Joi = require("joi");
    //create an instance of the message based on model
    const Message = require("../models/message");
    const { isLoggedIn } = require("../middleware");
    const { messageSchema } = require("./../schemas.js")
    const messages = require("../controllers/messages")

    const validateMessage = (req, res, next) => {
        const { error } = messageSchema.validate(req.body);
        if (error) {
            const msg = error.details.map(el => el.message).join(',')
            throw new ExpressError(msg, 400)
        } else {
            next()
        }
    }
    app.get("/allmessages", isLoggedIn, catchAsync(messages.allMessages));

    app.get("/newmessage", isLoggedIn, messages.renderNewmessages);
    //taking request from adduser/support
    app.post("/newmessage", isLoggedIn, validateMessage, catchAsync(messages.createMessage));
    // redirect to reading page
    app.get("/allmessages/:id", isLoggedIn, catchAsync(messages.displayMessages));

};