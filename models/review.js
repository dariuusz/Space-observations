const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
// reconsider if use here a reference to the observation class
const reviewsSchema = new Schema({
    review: String,
    rating: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});


//instantiate an instance of the user model
const Review = mongoose.model('Review', reviewsSchema);

//Export function to create User model class
module.exports = mongoose.model('Review', reviewsSchema);