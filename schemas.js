const Joi = require("joi");
const observationSchema = require("./models/observation")
const reviewSchema = require("./models/review")
const userSchema = require("./models/user")

module.exports.observationSchema = Joi.object({
    title: Joi.string().required().min(8),
    location: Joi.string().required().min(6),
    analyse: Joi.string().required().min(10),
    deleteImages: Joi.array()
})

module.exports.reviewsSchema = Joi.object({
    review: Joi.string().required().min(5),
    rating: Joi.number().required(),
});


//does not working
module.exports.userSchema = Joi.object({
    username: Joi.string().alphanum().min(8).max(30).required(),
    surname: Joi.string().alphanum().min(8).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    street: Joi.string().alphanum().min(8).max(30).required(),
    houseNumber: Joi.string().alphanum().min(1).max(5).required(),
    postcode: Joi.string().alphanum().min(3).max(8).required(),
    city: Joi.string().alphanum().min(4).max(30).required(),
    country: Joi.string().alphanum().min(3).max(30).required(),
})

module.exports.messageSchema = Joi.object({
    title: Joi.string().alphanum().min(8).max(30).required(),
    content: Joi.string().alphanum().min(10).max(500).required(),
    date: Joi.string().length(10).required(),
})

module.exports.cardSchema = Joi.object({
    cardOwner: Joi.string().alphanum().min(3).max(30).required(),
    cardType: Joi.string().alphanum().min(4).max(30).required(),
    expireMonth: Joi.string().length(2).required(),
    expireYear: Joi.string().length(4).required(),
    securityNumber: Joi.string().length(3).regex(/^\d+$/).required(),
    cardNumber: Joi.string().length(16).regex(/^\d+$/).required(),
})
