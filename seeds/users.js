module.exports = function (app) {
    //include mongoose configuration
    const mongoose = require("../config/dbconfig.js"); // check if you can change directory 

    //create an instance of the client/support based on model
    const User = require("../models/user");


    app.get('/addusers', (req, res) => {
        res.send("Adding cards in terminal : ");



        User.insertMany([{
            category: "Individual",
            forename: "Dariusz",
            surname: "Jedrzejek",
            email: "dariusz12@gmail.com",
            password: "password",
            userTitle: "Mr",
            number: 79877887567,
            executive: true,
            street: "King Street",
            houseNumber: "34",
            postcode: "DH16HG",
            city: "Liverpool",
            country: "United Kingdoom",

        },
        {
            category: "Individual",
            forename: "Emma",
            surname: "Watson",
            email: "emma11@gmail.com",
            password: "emma123!",
            userTitle: "Ms",
            number: 789877546,
            executive: true,
            street: "Liverpool Road",
            houseNumber: "35",
            postcode: "RG56GA",
            city: "Liverpool",
            country: "United Kingdoom",

        },
        {
            category: "Individual",
            forename: "Julian",
            surname: "Blaszcak",
            email: "julian@gmail.com",
            password: "julian123!",
            userTitle: "Mr",
            number: 77778888,
            executive: false,
            street: "Manchester Road",
            houseNumber: "23",
            postcode: "HFGH12",
            city: "London",
            country: "United Kingdoom",

        },
        {
            category: "Individual",
            forename: "Emily",
            surname: "Rosevelet",
            email: "emily13@gmail.com",
            password: "emily123!",
            userTitle: "Ms",
            number: 779907857,
            executive: false,
            street: "London Road",
            houseNumber: "34",
            postcode: "GFH112G",
            city: "London",
            country: "United Kingdoom",

        },
        {
            category: "Individual",
            forename: "Daniel",
            surname: "Book",
            email: "daniel67@gmail.com",
            password: "danie123!",
            userTitle: "Mr",
            number: 789789789,
            executive: false,
            street: "Liverpool Road",
            houseNumber: "34",
            postcode: "HJ34HJ",
            city: "Liverpool",
            country: "United Kingdoom",

        },
        {
            category: "Individual",
            forename: "Antoni",
            surname: "Edison",
            email: "antoni1234@gmail.com",
            password: "antoni123!",
            userTitle: "Mr",
            number: 789897854,
            executive: false,
            street: "Samuel Street",
            houseNumber: "56",
            postcode: "WF65HG",
            city: "Manchester",
            country: "United Kingdoom",

        },
        {
            category: "Individual",
            forename: "Antoni",
            surname: "Banderas",
            email: "antoni123@gmail.com",
            password: "Password123!",
            userTitle: "Mr",
            number: 0777777777,
            executive: false,
            street: "Causeway",
            houseNumber: "12A",
            postcode: "WAG56H",
            city: "Manchester",
            country: "United Kingdoom",

        }
        ]);

        //  const err = "Error";
        //     new Observation.save(function (err) {
        //         if (err) throw (err);
        //         console.log("New observation saved")
        //     });
    });

    app.get("/getallusers", (req, res) => {
        res.send("See all observations from the database: ");
        User.find({}, function (err, findAllUsers) {
            if (err) throw err;
            console.log(findAllUsers);
        });
    });

};