const Joi = require('joi');

const usuarioCreateSchema = Joi.object({
    nome: Joi.string().min(3).required().messages({
        'string.min': 'O nome deve ter no mínimo 3 caracteres.',
        'any.required': 'O nome é obrigatório.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'O e-mail deve ser um endereço de e-mail válido.',
        'any.required': 'O e-mail é obrigatório.'
    }),
    cpf: Joi.string().length(11).pattern(/^[0-9]+$/).required().messages({
        'string.length': 'O CPF deve ter 11 dígitos.',
        'string.pattern.base': 'O CPF deve conter apenas números.',
        'any.required': 'O CPF é obrigatório.'
    }),
    dataNascimento: Joi.date().iso().required().messages({
        'date.iso': 'A data de nascimento deve ser uma data válida.',
        'any.required': 'A data de nascimento é obrigatória.'
    }),
    cargo: Joi.string().required().messages({
        'any.required': 'O cargo é obrigatório.'
    }),
    tipo: Joi.string().valid('Funcionario', 'Gestor').required().messages({
        'any.only': 'O tipo de usuário deve ser "Funcionario" ou "Gestor".',
        'any.required': 'O tipo de usuário é obrigatório.'
    }),

    salario: Joi.number().when('tipo', {
        is: 'Gestor',
        then: Joi.required(),
        otherwise: Joi.number().when('tipo', {
            is: 'Funcionario',
            then: Joi.required(),
            otherwise: Joi.forbidden()
        })
    }),
    departamento: Joi.string().when('tipo', {
        is: 'Gestor',
        then: Joi.required(),
        otherwise: Joi.string().when('tipo', {
            is: 'Funcionario',
            then: Joi.required(),
            otherwise: Joi.forbidden()
        })
    }),

}).options({
    abortEarly: false
});

module.exports = { usuarioCreateSchema };