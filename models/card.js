const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new mongoose.Schema({
    cardNumber: Number,
    cardOwner: String,
    securityNumber: Number,
    cardType: String,
    expireMonth: String,
    expireYear: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

//instantiate an instance of the user model
const Card = mongoose.model('Card', cardSchema);

//Export function to create User model class
module.exports = mongoose.model("Card", cardSchema);//mongoose.model('Users', userSchema);