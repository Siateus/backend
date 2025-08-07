const mongoose = require('mongoose');

const MensagemSchema = new mongoose.Schema({
  remetente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  destinatario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  conteudo: String,
  dataEnvio: Date
});

const Mensagem = mongoose.model('Mensagem', MensagemSchema);
module.exports = Mensagem;