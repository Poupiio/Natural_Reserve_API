const Joi = require('joi');

const schema = Joi.object().keys({
    content: Joi.string().required(),
    user_pseudo: Joi.string().required(),
    safari_title: Joi.string().required()
});

module.exports = schema;