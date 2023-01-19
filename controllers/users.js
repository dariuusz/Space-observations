const User = require("../models/user");


module.exports.renderRegister = (req, res) => {
    res.render("users/register")
}

module.exports.register = async (req, res) => {

    try {
        const { email, username, password, category, surname, forename, userTitle, } = req.body;
        const user = new User({ email, username, category, surname, forename, userTitle });
        const registeredUser = await User.register(user, password);
        console.log(registeredUser); // delete later
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to CosmosTV");
            //res.redirect("/addcard")
            res.redirect(`/register/plan`)
            // res.redirect(`/register/plan`)
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/register")
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("index");
}

module.exports.login = (req, res) => {
    req.flash('success', "Welcome back");
    // redirect user to last session
    const redirectUrl = req.session.returnTo || "/cosmosTV";
    //delete route path from the session
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/")
}

module.exports.homepage = (req, res) => {
    res.render("landingpages/homepage");
}

module.exports.about = (req, res) => {
    res.render("./users/about");
}

module.exports.index = (req, res) => {
    res.redirect("index");
}