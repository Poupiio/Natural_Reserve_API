const Joi = require('joi');

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    pseudo: Joi.string().required(),
    password: Joi.string().min(8).required(),
    repassword: Joi.string().min(8).required()
});


module.exports = schema;