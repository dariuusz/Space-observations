module.exports = function (app) {

    //include mongoose configuration
    const mongoose = require("../config/dbconfig.js");
    //validation tool
    const Joi = require("joi");
    //catching errors and sending message from line 55
    const catchAsync = require("../catching_error/catchAsync")
    // Express 404 error
    const ExpressError = require("../catching_error/ExpressError");
    //create an instance of the client/support based on model
    const Observation = require("../models/observation");
    const Review = require("../models/review");
    const { isLoggedIn, isAuthorReview } = require("../middleware");
    const reviews = require("../controllers/reviews")


    //ading review
    app.post("/cosmosTV/:id/reviews", isLoggedIn, catchAsync(reviews.createReview));
    // deleting reviews
    app.delete("/cosmosTV/:id/reviews/:reviewId", isLoggedIn, isAuthorReview, catchAsync(reviews.deleteReview));


};