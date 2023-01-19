
const Observation = require("./models/observation");
const User = require("./models/user");
const Card = require("./models/card");
const Review = require("./models/review");
const Joi = require("joi");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash("error", "You must be signed in!");
        return res.redirect("/login");
    };
    next();
};

//prevent users to make any changes by adding url , not just going there from website
module.exports.isAuthorObservation = async (req, res, next) => {
    const id = req.params.id;
    const observation = await Observation.findById(id);
    if (!observation.user.equals(req.user._id) && req.user.executive === false) {
        req.flash("error", "You do not have permission to do that.");
        return res.redirect(`/cosmosTV/${id}`)
    }
    next();
}

module.exports.isAuthorReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.user.equals(req.user._id) && req.user.executive === false) {
        req.flash("error", "You do not have permission to do that.");
        return res.redirect(`/cosmosTV/${id}`)
    }
    next();
}



