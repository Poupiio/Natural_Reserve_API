const Joi = require('joi');

const schema = Joi.object().keys({
    nb_places: Joi.number().min(1).max(6).required(),
    safari_title: Joi.string().required(),
    user_name: Joi.string().required(),
    user_email: Joi.string().email().required()
});


module.exports = schema;