const Joi = require('joi');

const usuarioUpdateSchema = Joi.object({
    nome: Joi.string().min(3),
    email: Joi.string().email(),
    cargo: Joi.string(),
    status: Joi.boolean(),
    password: Joi.string().min(8), // Mantemos para o caso de atualização de senha
    confpassword: Joi.string().valid(Joi.ref('password')), // Referencia o campo password
    fotoPerfil: Joi.string().uri()
}).or('nome', 'email', 'password', 'confpassword', 'fotoPerfil').messages({
    'object.missing': 'Pelo menos um campo deve ser fornecido para a atualização.'
});

module.exports = { usuarioUpdateSchema };