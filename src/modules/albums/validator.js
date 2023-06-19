const joi = require("joi");

const albumSchema = joi.object({
    title: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    genre: joi.string().required(),

    picture: joi.string().required(),

    artist: joi.string().required()
});

module.exports = albumSchema;