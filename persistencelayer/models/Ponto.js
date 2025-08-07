const mongoose = require('mongoose');

const PontoSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  data: Date,
  horaEntrada: Date,
  horaSaida: Date,
  horasTrabalhadas: Number,
  status: String,
  localizacao: String
});

const Ponto = mongoose.model('Ponto', PontoSchema);
module.exports = Ponto;
