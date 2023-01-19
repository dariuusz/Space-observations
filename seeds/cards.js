module.exports = function (app) {
    //include mongoose configuration
    const mongoose = require("../config/dbconfig.js"); // check if you can change directory 

    //create an instance of the client/support based on model
    const Card = require("../models/card");


    app.get('/addcards', (req, res) => {
        res.send("Adding cards in terminal : ")

        Card.insertMany([{
            cardNumber: 11111,
            cardOwner: "Darek",
            securityNumber: 111,
            cardType: "Mastercard",
            expireMonth: 3,
            expireYear: 2025,

        },
        {
            cardNumber: 22222,
            cardOwner: "Julian",
            securityNumber: 222,
            cardType: "visa",
            expireMonth: 5,
            expireYear: 2026,

        },
        {
            cardNumber: 33333,
            cardOwner: "Antoni",
            securityNumber: 333,
            cardType: "Mastercard",
            expireMonth: 1,
            expireYear: 2027,

        },
        {
            cardNumber: 44444,
            cardOwner: "Emma",
            securityNumber: 444,
            cardType: "Mastercard",
            expireMonth: 2,
            expireYear: 2025,

        },
        {
            cardNumber: 55555,
            cardOwner: "Emily",
            securityNumber: 555,
            cardType: "Visa",
            expireMonth: 12,
            expireYear: 2024,

        },
        {
            cardNumber: 66666,
            cardOwner: "Daniel",
            securityNumber: 666,
            cardType: "Mastercard",
            expireMonth: 9,
            expireYear: 2026,

        },
        {
            cardNumber: 777777,
            cardOwner: "Antoni",
            securityNumber: 777,
            cardType: "Visa",
            expireMonth: 3,
            expireYear: 2024,

        }
        ]);

        // const err = "Error";
        // newObservation.save(function (err) {
        //     if (err) throw (err);
        //     console.log("New observation saved")
        // });
    });

    app.get("/getcards", (req, res) => {
        res.send("See all observations from the database: ");
        Card.find({}, function (err, findAllCards) {
            if (err) throw err;
            console.log(findAllCards);
        });
    });

};