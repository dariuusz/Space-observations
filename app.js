// access to the cloudinary
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const internal = require('stream');
// adding layouts for whole html form
const ejsMate = require("ejs-mate");
//setting for cookies
const session = require("express-session");
// sending alerts to be more user friendly
const flash = require("connect-flash");
//schema validation
const Joi = require("joi");
const bodyParser = require('body-parser');
//lets override post method to update content of the page
const methodOverride = require("method-override");
// displaying status codes in command line 
const morgan = require("morgan");
// Express 404 error
const ExpressError = require("./catching_error/ExpressError");
//displaying requests in command line
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
// check if this work for passport
const newUser = require('./models/newUser'); // delete if this will not be needed
const { observationSchema } = require("./schemas.js");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// enables transfer of post data from html forms
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("seeds"));
// setting cookies to prevent users to be logged in forever. It sets time for one week

// enablet to override post request to update details
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("/views", [__dirname + "/views", __dirname + "/views/users", + __dirname + "/views/landingpages",
+  __dirname + "/ views / support", + __dirname + "/views/observations", + __dirname + "/views/card", + __dirname + "/views/message"]);



const sessionConfig = {
    secret: "thisshouldbeabettersecret ",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// setting up success and error information for each route when some action will be ended successfully or not
app.use((req, res, next) => {
    console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash('error');
    next();
})

//route related to add a user automatically into the database
//  SEEDING DATABASE
require("./seeds/users")(app);
require("./seeds/messages")(app);
require("./seeds/cards")(app);
require("./seeds/observations")(app);


require("./routes/userroutes")(app);
require("./routes/support")(app);
require("./routes/card")(app);
require("./routes/message")(app);
require("./routes/review")(app);
require("./routes/observation")(app);

// app.get('/fakeUser', async (req, res) => {
//     const user = new User({ email: "darek1234567@gmail.com", username: "dddarek" });
//     const registerUser = await User.register(user, 'hello');
//     res.send(registerUser);
// })

// render to /views/index.ejs page 
// app.get("/", (req, res) => {
//     res.render("index")
// })

app.get("/", (req, res) => {
    res.render("index")
})

// displaying error 404 message for all requests
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});
//error handling 
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.mesages) err.mesages = "Something went wrong!";
    res.status(statusCode).render("./error", { err });
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
});