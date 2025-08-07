const mongoose = require('mongoose');

const RelatorioSchema = new mongoose.Schema({
  funcionario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Funcionario'
  },
  periodo: String,
  horas_trabalhadas: Number,
  horas_extras: Number
});

const Relatorio = mongoose.model('Relatorio', RelatorioSchema);
module.exports = Relatorio;