module.exports = function (app) {

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
    const User = require("../models/user");
    const { isLoggedIn, isAuthorObservation } = require("../middleware");
    const { observationSchema } = require("./../schemas.js")
    //importing controllers
    const observations = require("../controllers/observations")
    const multer = require('multer');
    const { storage } = require('../cloudinary/index');
    const upload = multer({ storage });


    const validateObservation = (req, res, next) => {
        const { error } = observationSchema.validate(req.body);
        if (error) {
            const msg = error.details.map(el => el.message).join(',')
            throw new ExpressError(msg, 400)
        } else {
            next()
        }
    }

    // display all observations in cosmosTV
    app.get("/cosmosTV", catchAsync(observations.cosmosTV));
    // go to new form
    app.get("/cosmosTV/new", isLoggedIn, observations.new);
    // save aan observation and redirect to its own page
    app.post("/cosmosTV", isLoggedIn, upload.array('image'), validateObservation, catchAsync(observations.createObservations));
    // show page for observation with appropriate id and reviews
    app.get("/cosmosTV/:id", catchAsync(observations.showObservation));
    //redirect to editing page
    app.get("/cosmosTV/:id/edit", isLoggedIn, isAuthorObservation, catchAsync(observations.editObservation));
    // updating observation details in the database
    app.put("/cosmosTV/:id", isLoggedIn, isAuthorObservation, upload.array('image'), validateObservation, catchAsync(observations.updateObservation));
    // deleting observations
    app.delete("/cosmosTV/:id", isLoggedIn, isAuthorObservation, catchAsync(observations.deleteObservation));

};