const mongoose = require("mongoose");
//connection to the database
const mongoDB = "mongodb+srv://projectuser:10lTm18l!@cluster0.17jqh.mongodb.net/Observation?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
    useNewUrlPArser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to MongoDB")
});
module.exports = mongoose;