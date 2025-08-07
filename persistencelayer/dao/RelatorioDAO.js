const IRelatorioDAO = require('./IRelatorioDAO');
const Ponto = require('../models/Ponto');
const moment = require('moment');

class RelatorioDAO extends IRelatorioDAO {

    async gerarDadosRelatorio(funcionarioId, dataInicio, dataFim) {
        const query = {
            data: {
                $gte: moment(dataInicio).startOf('day').toDate(),
                $lte: moment(dataFim).endOf('day').toDate()
            }
        };
        if (funcionarioId) {
            query.usuario_id = funcionarioId;
        }

        const registrosPonto = await Ponto.find(query).sort({ data: 1 });

        // Lógica para calcular horas extras e ausências a partir dos registros
        let horasExtras = 0;
        let horasTrabalhadas = 0;
        let ausencias = 0;

        registrosPonto.forEach(ponto => {
            horasTrabalhadas += ponto.horasTrabalhadas || 0;
            if (ponto.horasTrabalhadas > 8) {
                horasExtras += ponto.horasTrabalhadas - 8;
            }
            if (ponto.status === 'Falta') {
                ausencias++;
            }
        });

        return {
            periodo: `${moment(dataInicio).format('DD/MM/YYYY')} - ${moment(dataFim).format('DD/MM/YYYY')}`,
            horasExtras,
            horasTrabalhadas,
            ausencias,
            registrosPonto
        };
    }
}
module.exports = RelatorioDAO;