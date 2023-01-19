module.exports = function (app) {
    //include mongoose configuration
    const mongoose = require("../config/dbconfig.js"); // check if you can change directory 

    //create an instance of the client/support based on model
    const Message = require("../models/message");


    app.get('/addmessages', (req, res) => {
        res.send("Adding cards in terminal : ")

        Message.insertMany([{
            title: "Help",
            content: "  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione voluptates velit modi facilis vitae et quod voluptatibus, perspiciatis id minus sit nostrum sed quisquam repellendus nulla, natus amet harum maxime.",
            date: "2022-04-28",
            user: "62e1aeb8323e0ad502db757c"
        },
        {
            title: "Help 2",
            content: "Help help",
            date: "2022-04-29",
            user: "62e1aeb8323e0ad502db757c"
        },
        {
            title: "Help 3",
            content: "Help help help",
            date: "2022-04-30",
            user: "62e1aeb8323e0ad502db757c"
        },
        {
            title: "Help 4",
            content: " I need help 2",
            date: "2022-04-30",
            user: "62e1aeb8323e0ad502db757c"
        },
        {
            title: "Help 5",
            content: "I need help 3",
            date: "2022-04-30",
            user: "62e1aeb8323e0ad502db757d"
        },
        {
            title: "Help 6",
            content: "I need help 4",
            date: "2022-04-30",
            user: "62e1aeb8323e0ad502db757d"
        },
        {
            title: "Help 7",
            content: "I need help 5",
            date: "2022-04-30",
            user: "62e1aeb8323e0ad502db757d"
        },
        {
            title: "Help 8",
            content: "I need help 8",
            date: "2022-04-30",
            user: "62e1aeb8323e0ad502db757d"
        }
        ]);

        // const err = "Error";
        // newObservation.save(function (err) {
        //     if (err) throw (err);
        //     console.log("New observation saved")
        // });
    });

    app.get("/getmessages", (req, res) => {
        res.send("See all observations from the database: ");
        Message.find({}, function (err, findAllMessages) {
            if (err) throw err;
            console.log(findAllMessages);
        });
    });

};