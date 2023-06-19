const joi = require("joi");

const trackSchema = joi.object({
    title: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    youtube_url: joi.string().required(),

    id_album: joi.number().required()
});

module.exports = trackSchema;