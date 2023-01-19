const mongoose = require("mongoose");
const Review = require("./review");
const { Schema } = mongoose;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200,h_200")
})

const observationSchema = new Schema({
    uniqueIdentifier: Number, // check if it is needed here
    title: String,
    analyse: String,
    location: String,
    images: [ImageSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

//deleting reviews with observation using middlewear
observationSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

//instantiate an instance of the user model
const Observation = mongoose.model('Observation', observationSchema);

//Export function to create User model class
module.exports = mongoose.model('Observation', observationSchema);