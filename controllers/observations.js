const Observation = require("../models/observation");
const Review = require("../models/review");
const User = require("../models/user");
const { cloudinary } = require("../cloudinary")


module.exports.cosmosTV = async (req, res) => {
    const observations = await Observation.find({});
    res.render("observations/cosmosTV", { observations });
}

module.exports.new = (req, res) => {
    res.render("observations/new");
}

module.exports.createObservations = async (req, res, next) => {
    const observation = new Observation({
        title: req.body.title,
        location: req.body.location,
        analyse: req.body.analyse,
    });
    observation.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    observation.user = req.user._id;// saving as relation - user to observation
    await observation.save();
    console.log(observation);
    req.flash("success", "Successfully made a new observation");
    res.redirect(`/cosmosTV/${observation._id}`);
}

module.exports.showObservation = async (req, res) => {
    // populating to receive creator of a review and an observation
    const observation = await Observation.findById(req.params.id).populate({
        path: "reviews",
        populate: {
            path: "user"
        }
    }).populate("user");
    console.log(observation);
    if (!observation) {
        req.flash('error', 'Cannot find that observation');
        return res.redirect("/cosmosTV");
    }
    res.render("observations/show", { observation });
}

module.exports.editObservation = async (req, res) => {
    const observation = await Observation.findById(req.params.id)
    if (!observation) {
        req.flash('error', 'Cannot find that observation');
        return res.redirect("/cosmosTV");
    }
    res.render("observations/edit", { observation });
}

module.exports.updateObservation = async (req, res, next) => {
    //prevent to send request from postman
    // if (!req.body.observation) throw new ExpressError("Invalid observation data", 400);
    const id = req.params.id;
    console.log(req.body);
    const observation = await Observation.findByIdAndUpdate(id, {
        "title": req.body.title,
        "analyse": req.body.analyse,
        "location": req.body.location
    });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    observation.images.push(...imgs);
    await observation.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await observation.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        console.log(observation);
    }
    req.flash("success", "Successfully updated observation");
    res.redirect(`/cosmosTV/${observation._id}`)
}

module.exports.deleteObservation = async (req, res) => {
    const id = req.params.id;
    await Observation.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted observation");
    res.redirect("/cosmosTV")
}