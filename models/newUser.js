const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }

});
UserSchema.plugin(passportLocalMongoose);

//instantiate an instance of the user model
const newUser = mongoose.model('newUser', UserSchema);

//Export function to create User model class
module.exports = mongoose.model("newUser", UserSchema); // mongoose.model('Users', userSchema);