const { render } = require("ejs");

module.exports = function (app) {

    //include mongoose configuration
    const mongoose = require("../config/dbconfig");
    //catching errors and sending message from line 55
    const catchAsync = require("../catching_error/catchAsync");
    // Express 404 error
    const ExpressError = require("../catching_error/ExpressError");
    //create an instance of the client/support based on model
    const User = require("../models/user");
    const Card = require("../models/card");
    // to serve static files from current location, determine parent directoy
    const { isLoggedIn, isAuthor } = require("../middleware");
    const support = require("../controllers/support")

    app.get("/allusers", isLoggedIn, catchAsync(support.renderAllusers));

    app.get("/adduser", isLoggedIn, support.renderAddUser);
    //              POST REQUEST
    //taking request from adduser/support
    app.post("/allusers", isLoggedIn, catchAsync(support.addUser));
    // redirect to the user editing website
    app.get("/allusers/:id", isLoggedIn, catchAsync(support.renderShowPage));
    //redirect to editing page
    app.get("/allusers/:id/edit", isLoggedIn, catchAsync(support.renderEditPage));
    // updating user details in the database
    app.put("/allusers/:id", isLoggedIn, catchAsync(support.updateUser))

    // // check if this will work related with post request in new for card and card rout
    app.get("/allusers/:id/card", isLoggedIn, catchAsync(support.findCard));

    app.delete("/allusers/:id", isLoggedIn, catchAsync(support.deleteUser));
};