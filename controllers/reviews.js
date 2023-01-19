const Observation = require("../models/observation");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    const observation = await Observation.findById(req.params.id);
    const review = new Review({
        review: req.body.review,
        rating: req.body.rating,
    });
    review.user = req.user._id;
    observation.reviews.push(review);
    await review.save();
    await observation.save();
    req.flash("success", "Created new review");
    res.redirect(`/cosmosTV/${observation._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Observation.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);  //(req.params.reviewId);
    req.flash("success", "Successfully deleted review");
    res.redirect(`/cosmosTV/${id}`);
}