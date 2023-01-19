const mongoose = require("mongoose");
const { Schema } = mongoose;
// reconsider if use here a reference to the observation class
const planSchema = new Schema({
    name: String,
    price: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});


//instantiate an instance of the user model
const Plan = mongoose.model('Plan', planSchema);

//Export function to create User model class
module.exports = mongoose.model('Plan', planSchema);