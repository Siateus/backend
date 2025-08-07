const IRelatorioController = require('./IRelatorioController');
const RelatorioDAO = require('../persistencelayer/dao/RelatorioDAO');
const { gerarRelatorioSchema } = require('../servicelayer/dto/GerarRelatorioReq');
const RelatorioRes = require('../servicelayer/dto/RelatorioRes');
const csv = require('csv-stringify');
const relatorioDAO = new RelatorioDAO();

class RelatorioController extends IRelatorioController {

    async gerarRelatorio(req, res) {
        try {
            const { error, value } = gerarRelatorioSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const { funcionarioId, dataInicio, dataFim, formato } = value;

            const dados = await relatorioDAO.gerarDadosRelatorio(funcionarioId, dataInicio, dataFim);

            // Lógica para exportar o relatório
            if (formato === 'csv') {
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename="relatorio.csv"');
                return csv.stringify(dados.registrosPonto, { header: true }).pipe(res);
            }

            // Retorno para visualização (formato JSON)
            const responseDto = new RelatorioRes(dados);
            return res.status(200).json(responseDto);

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Erro ao gerar relatório: ' + e.message });
        }
    }
}
module.exports = RelatorioController;