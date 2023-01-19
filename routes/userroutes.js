module.exports = function (app) {

    //include mongoose configuration
    const mongoose = require("../config/dbconfig");
    //catching errors 
    const catchAsync = require("../catching_error/catchAsync");
    const ExpressError = require("../catching_error/ExpressError");
    const Joi = require("joi");
    const passport = require("passport");
    //create an instance of the client/support based on model
    const User = require("../models/user");
    // const newUser = require("../models/newUser");
    const Card = require("../models/card");
    const Plan = require("../models/plan");
    const { userSchema, planSchema } = require("./../schemas.js")
    const users = require("../controllers/users")


    const validateUser = (req, res, next) => {
        const { error1 } = userSchema.validate(req.body);
        if (error1) {
            const msg = error1.details.map(el => el.message).join(',')
            throw new ExpressError(msg, 400)
        } else {
            next()
        }
    }

    // change for userSchema
    app.get("/register", users.renderRegister);
    //register new user with error catching
    app.post("/register", validateUser, catchAsync(users.register));

    app.get("/login", users.renderLogin);

    //  accept users login and password and redirect to the index.ejs page
    app.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login);

    app.get("/logout", users.logout);

    app.get("/homepage", users.homepage);
    // redirect to cosmosTV page
    app.get("/about", users.about);

    app.get("/index", users.index);

    app.get("/register/plan", (req, res) => {

        res.render("./users/plan")
    });
    // app.get("/register/plan", (req, res) => {
    //     const user = User.findById(req.params.id);
    //     res.render("./users/plan", { user })
    // });

    app.post("/register/plan", (req, res) => {
        const user = User.findById(req.params.id);
        const plan = new Plan({
            name: req.body.name,
            price: req.body.price
        })
        console.log(plan)
        plan.user = req.user._id;
        plan.save();
        req.flash("success", "Successfully chose a plan.");
        res.render("./card/newCard")
        // res.redirect(`/plan/${user._id}/card`, { user })
    });

    app.get("/plan/card", (req, res) => {
        res.render("./card/newCard")
    })

    app.post("/plan/card", async (req, res) => {

        const user = await User.findById(req.params.id);
        const card = new Card({
            cardNumber: req.body.cardNumber,
            cardOwner: req.body.cardOwner,
            securityNumber: req.body.securityNumber,
            expireMonth: req.body.expireMonth,
            expireYear: req.body.expireYear
        })
        card.user = req.user._id;
        await card.save();
        res.render("./users/about")
    })

}