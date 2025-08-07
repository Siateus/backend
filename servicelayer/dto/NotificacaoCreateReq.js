//servicelayer/dto/NotificacaoCreateReq.js
const Joi = require('joi');

const notificacaoCreateSchema = Joi.object({
    usuarioId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'O ID do usuário deve ser um valor hexadecimal válido.',
        'string.length': 'O ID do usuário deve ter 24 caracteres.',
        'any.required': 'O ID do usuário é obrigatório.'
    }),
    tipoEvento: Joi.string().required().messages({
        'any.required': 'O tipo de evento é obrigatório.'
    }),
    detalhes: Joi.string().required().messages({
        'any.required': 'Os detalhes da notificação são obrigatórios.'
    }),
});

module.exports = { notificacaoCreateSchema };