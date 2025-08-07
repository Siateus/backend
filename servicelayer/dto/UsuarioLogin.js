const Joi = require('joi');

const usuarioLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = { usuarioLoginSchema };