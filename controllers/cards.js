const Card = require("../models/card");
const User = require("../models/user");


module.exports.addCards = async (req, res) => {
    const user = await User.findById(req.params.id);
    //const cryptedNumber = req.params.cardNumber;

    const card = new Card({
        "cardNumber": req.body.cardNumber,
        "cardOwner": req.body.cardOwner,
        "securityNumber": req.body.securityNumber,
        "cardType": req.body.cardType,
        "expireMonth": req.body.expireMonth,
        "expireYear": req.body.expireYear
    });

    card.user = req.user._id;
    user.card.push(card);
    await card.save();
    await user.save();
    req.flash("success", "Successfully created new review");
    res.redirect(`/allusers/${user._id}`);
}

module.exports.showCards = async (req, res) => {
    const user = await User.findById(req.params.id).populate("card");
    console.log(user);
    if (!user) {
        req.flash('error', 'Cannot find that user');
        return res.redirect("/allusers");
    }
    res.render("card/show2", { user });
}


module.exports.editCard = async (req, res, next) => {
    const id = req.params.id;
    const card = await Card.findByIdAndUpdate(id, {
        "cardNumber": req.body.cardNumber,
        "cardOwner": req.body.cardOwner,
        "securityNumber": req.body.securityNumber,
        "cardType": req.body.cardType,
        "expireMonth": req.body.expireMonth,
        "expireYear": req.body.expireYear
    });
    req.flash("success", "Successfully updated card");
    res.redirect(`/card/${card._id}`)
}

module.exports.deleteCards = async (req, res) => {
    const { id, cardId } = req.params;
    await User.findByIdAndUpdate(id, { $pull: { reviews: cardId } });
    await Card.findByIdAndDelete(cardId);  //(req.params.reviewId);
    req.flash("success", "Successfully deleted card");
    res.redirect(`/allusers/${id}`);
}