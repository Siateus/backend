const Joi = require('joi');

const gerarRelatorioSchema = Joi.object({
    dataInicio: Joi.date().iso().required().messages({
        'date.iso': 'A data de início deve ser uma data ISO 8601 válida.',
        'any.required': 'A data de início é obrigatória.'
    }),
    dataFim: Joi.date().iso().required().messages({
        'date.iso': 'A data de fim deve ser uma data ISO 8601 válida.',
        'any.required': 'A data de fim é obrigatória.'
    }),
    funcionarioId: Joi.string().hex().length(24).allow(null), 
    formato: Joi.string().valid('json', 'csv', 'pdf').default('json'),
});

module.exports = { gerarRelatorioSchema };