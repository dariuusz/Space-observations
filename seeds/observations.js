

module.exports = function (app) {
    //include mongoose configuration
    const mongoose = require("../config/dbconfig.js"); // check if you can change directory 

    //create an instance of the client/support based on model
    const Observation = require("../models/observation");
    const User = require("../models/user.js");
    const multer = require('multer');
    const { storage } = require('../cloudinary/index');
    const upload = multer({ storage });

    app.get('/addobservation', (req, res) => {
        res.send("Adding user in terminal : ")

        Observation.insertMany([{
            uniqueIdentifier: 1, // check if it is needed here
            title: "First Observation",
            analyse: "This is the first analyse",
            location: "Nebula",
            images: [
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105426/Project/ptjr42qb8ksscdrjfdkn.jpg',
                    filename: 'Project/rpbj8ybdi4e2rvsd1u0i'
                },
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105431/Project/w0yaciifhmskexmnzoyb.jpg',
                    filename: 'Project/krfetjgibvwjadjzrprj'
                }
            ],
            user: '62e1aeb8323e0ad502db757c'
        },
        {
            uniqueIdentifier: 2,
            title: "Second Observation",
            analyse: "The second one",
            location: "London",
            images: [
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105426/Project/ptjr42qb8ksscdrjfdkn.jpg',
                    filename: 'Project/rpbj8ybdi4e2rvsd1u0i'
                },
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105431/Project/w0yaciifhmskexmnzoyb.jpg',
                    filename: 'Project/krfetjgibvwjadjzrprj'
                }
            ],
            user: '62e1aeb8323e0ad502db757d'
        },
        {
            uniqueIdentifier: 3,
            title: "Second Observation",
            analyse: "The third one",
            location: "Liverpool",
            images: [
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105426/Project/ptjr42qb8ksscdrjfdkn.jpg',
                    filename: 'Project/rpbj8ybdi4e2rvsd1u0i'
                },
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105431/Project/w0yaciifhmskexmnzoyb.jpg',
                    filename: 'Project/krfetjgibvwjadjzrprj'
                }
            ],
            user: '62e1aeb8323e0ad502db757e'
        },
        {
            uniqueIdentifier: 4,
            title: "Fourth Observation",
            analyse: "the fourth",
            location: "Manchester",
            images: [
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105426/Project/ptjr42qb8ksscdrjfdkn.jpg',
                    filename: 'Project/rpbj8ybdi4e2rvsd1u0i'
                },
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105431/Project/w0yaciifhmskexmnzoyb.jpg',
                    filename: 'Project/krfetjgibvwjadjzrprj'
                }
            ],
            user: '62e1aeb8323e0ad502db757f'
        },
        {
            uniqueIdentifier: 5,
            title: "Fifth Observation",
            analyse: "the fifth one",
            location: "Manchester",
            images: [
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105426/Project/ptjr42qb8ksscdrjfdkn.jpg',
                    filename: 'Project/rpbj8ybdi4e2rvsd1u0i'
                },
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105431/Project/w0yaciifhmskexmnzoyb.jpg',
                    filename: 'Project/krfetjgibvwjadjzrprj'
                }
            ],
            user: '62e1aeb8323e0ad502db7580'
        },
        {
            uniqueIdentifier: 6,
            title: "Sixth Observation",
            description: "lolllolo",
            analyse: "the sixth one",
            location: "Manchester",
            images: [
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105426/Project/ptjr42qb8ksscdrjfdkn.jpg',
                    filename: 'Project/rpbj8ybdi4e2rvsd1u0i'
                },
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105431/Project/w0yaciifhmskexmnzoyb.jpg',
                    filename: 'Project/krfetjgibvwjadjzrprj'
                }
            ],
            user: '62e1aeb8323e0ad502db7582'
        },
        {
            uniqueIdentifier: 7,
            title: "Seventh Observation",
            analyse: "aaaaaaa",
            location: "Manchester",
            images: [
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105426/Project/ptjr42qb8ksscdrjfdkn.jpg',
                    filename: 'Project/rpbj8ybdi4e2rvsd1u0i'
                },
                {
                    url: 'https://res.cloudinary.com/dnxvz1skd/image/upload/v1657105431/Project/w0yaciifhmskexmnzoyb.jpg',
                    filename: 'Project/krfetjgibvwjadjzrprj'
                }
            ],
            user: '62e1aeb8323e0ad502db7582'
        }
        ]);

        upload.image("array");
    });

    app.get("/getobservations", (req, res) => {
        res.send("See all observations from the database: ");
        Observation.find({}, function (err, findAllObservation) {
            if (err) throw err;
            console.log(findAllObservation);
        });
    });

};