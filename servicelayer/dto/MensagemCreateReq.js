const Joi = require('joi');

const mensagemCreateSchema = Joi.object({
    remetenteId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'O ID do remetente deve ser um valor hexadecimal válido.',
        'string.length': 'O ID do remetente deve ter 24 caracteres.',
        'any.required': 'O ID do remetente é obrigatório.'
    }),
    destinatarioId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'O ID do destinatário deve ser um valor hexadecimal válido.',
        'string.length': 'O ID do destinatário deve ter 24 caracteres.',
        'any.required': 'O ID do destinatário é obrigatório.'
    }),
    conteudo: Joi.string().min(1).required().messages({
        'string.min': 'O conteúdo da mensagem não pode ser vazio.',
        'any.required': 'O conteúdo da mensagem é obrigatório.'
    }),
});

module.exports = { mensagemCreateSchema };