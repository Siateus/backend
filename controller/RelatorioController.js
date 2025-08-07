const path = require('path');
const config = require('../config.js');
const IRelatorioController = require('./IRelatorioController');
const RelatorioDAO = require(path.join(__dirname, '..', 'persistencelayer', 'dao', config.RelatorioDAO));
const { gerarRelatorioSchema } = require(path.join(__dirname, '..', 'servicelayer', 'dto', config.GerarRelatorioReq));
const RelatorioRes = require(path.join(__dirname, '..', 'servicelayer', 'dto', config.RelatorioRes));
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