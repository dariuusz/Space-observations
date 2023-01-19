const mongoose = require("mongoose");
const { Schema } = mongoose;
const Card = require("./card");
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
    category: String,
    username: {
        type: String,
        miniLength: 5,
        maxLength: 30
    },
    forename: {
        type: String,
        miniLength: 5,
        maxLength: 30
    },
    surname: {
        type: String,
        miniLength: 5,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        miniLength: 5,
        maxLength: 30
    },
    userTitle: String,
    executive: {
        type: Boolean,
        default: false
    },
    street: String,
    houseNumber: String,
    postcode: String,
    city: String,
    country: String,
    observation: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Observation'
        }
    ],
    card: [
        {
            type: Schema.Types.ObjectId,
            ref: "Card"
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    plan: {
        type: Schema.Types.ObjectId,
        ref: "Plan"
    },
});
userSchema.plugin(passportLocalMongoose);


//deleting reviews with observation using middlewear
userSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Card.deleteMany({
            _id: {
                $in: doc.card
            }
        })
    }
})
//instantiate an instance of the user model
const User = mongoose.model('User', userSchema);

//Export function to create User model class
module.exports = mongoose.model("User", userSchema); // mongoose.model('Users', userSchema);