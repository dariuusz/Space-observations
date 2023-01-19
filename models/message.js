const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    title: String,
    content: String,
    date: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

//instantiate an instance of the user model
const Message = mongoose.model('Message', messageSchema);

//Export function to create User model class
module.exports = mongoose.model('Message', messageSchema);