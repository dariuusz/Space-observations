const Message = require("../models/message");

module.exports.allMessages = async (req, res) => {
    const messages = await Message.find({});
    res.render("message/messages", { messages });
}

module.exports.renderNewmessages = (req, res) => {
    res.render("message/new");
}

module.exports.createMessage = async (req, res, next) => {
    //prevent to send request from postman
    //if (!req.body.observation) throw new ExpressError("Invalid message data", 400);
    const message = new Message({
        title: req.body.title,
        date: req.body.date,
        content: req.body.content
    });
    message.user = req.user._id; // saving reference
    await message.save();
    req.flash("success", "Successfully created new message");
    res.redirect(`/allmessages/${message._id}`);

}

module.exports.displayMessages = async (req, res) => {
    const message = await Message.findById(req.params.id).populate("user");
    console.log(message);
    if (!message) {
        req.flash('error', 'Cannot find that message');
        return res.redirect("/allusers");
    }
    res.render("message/show", { message });
}