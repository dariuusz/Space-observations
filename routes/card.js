module.exports = function (app) {

    //include mongoose configuration
    const mongoose = require("../config/dbconfig");
    const catchAsync = require("../catching_error/catchAsync");
    // Express 404 error
    const ExpressError = require("../catching_error/ExpressError");
    const Joi = require("joi");

    //create an instance of the client/support based on model
    const Card = require("../models/card");
    const User = require("../models/user");
    const { isLoggedIn, hashCard } = require("../middleware");
    const { cardSchema } = require("./../schemas.js");
    const cards = require("../controllers/cards");


    const validateCard = (req, res, next) => {
        const { error } = cardSchema.validate(req.body);
        if (error) {
            const msg = error.details.map(el => el.message).join(',')
            throw new ExpressError(msg, 400)
        } else {
            next()
        }
    }

    app.post("/allusers/:id/card", isLoggedIn, validateCard, catchAsync(cards.addCards));
    // see all user cards
    app.get("/allusers/:id/allcards", isLoggedIn, catchAsync(cards.showCards));
    // deleting cards
    app.delete("/allusers/:id/allcards/:cardId", isLoggedIn, catchAsync(cards.deleteCards));
    // updating ocards details
    app.put("/card/:id", isLoggedIn, validateCard, catchAsync(cards.editCard));


};