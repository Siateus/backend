// servicelayer/DTO/PontoUpdateReq.js
const Joi = require('joi');

const pontoUpdateSchema = Joi.object({
    data: Joi.date().iso(),
    horaEntrada: Joi.date().iso(),
    horaSaida: Joi.date().iso(),
    status: Joi.string().valid('Normal', 'Atraso', 'Extra'),
    localizacao: Joi.string(),
}).min(1);

module.exports = { pontoUpdateSchema };