const mongoose = require('mongoose');

const NotificacaoSchema = new mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    tipo_evento: String,
    data_evento: {
        type: Date,
        default: Date.now
    },
    detalhes: String,
    status: {
        type: String,
        enum: ['pendente', 'lida'],
        default: 'pendente'
    }
});

const Notificacao = mongoose.model('Notificacao', NotificacaoSchema);
module.exports = Notificacao;