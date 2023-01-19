const User = require("../models/user");

module.exports.renderAllusers = async (req, res) => {
    const users = await User.find({});
    res.render("support/allusers", { users });
}

module.exports.renderAddUser = (req, res) => {
    res.render("support/adduser");
}

module.exports.addUser = async (req, res, next) => {
    //prevent to send request from postman
    // if (!req.body.observation) throw new ExpressError("Invalid user data", 400);
    try {
        const { email, username, password, category, surname, street, houseNumber, postcode, country, forename, userTitle, } = req.body;
        const user = new User({ email, username, password, category, surname, street, houseNumber, postcode, country, forename, userTitle, });
        const registeredUser = await User.register(user, password);
        console.log(registeredUser); // delete later
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to CosmosTV");

            res.redirect(`/allusers/${user._id}`);
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/register")
    }
}
module.exports.renderShowPage = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        req.flash('error', 'Cannot find that user');
        return res.redirect("/allusers");
    }
    res.render("support/show", { user });
}
module.exports.renderEditPage = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        req.flash('error', 'Cannot find that user');
        return res.redirect("/allusers");
    }
    res.render("support/edit", { user });
}

module.exports.updateUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, {
        "forename": req.body.forename, "surname": req.body.surname, "email": req.body.email,
        "password": req.body.password, "userTitle": req.body.userTitle, "number": req.body.number, "executive": req.body.executive, "street": req.body.street, "houseNumber": req.body.houseNumber, "postcode": req.body.postcode,
        "city": req.body.city, "country": req.body.country
    });
    req.flash("success", "Successfully updated user");
    res.redirect(`/allusers/${user._id}`)
}

module.exports.findCard = async (req, res) => {
    const user = await User.findById(req.params.id)
    console.log(user);
    if (!user) {
        req.flash('error', 'Cannot find your account');
        return res.redirect("/register");
    }
    res.render("card/new", { user });
}

module.exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted user");
    res.redirect("/allusers")
}