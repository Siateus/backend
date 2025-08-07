const express = require('express');
const router = express.Router();
const IRelatorioController = require('../../controller/IRelatorioController');
const authMiddleware = require('./authMiddleware');
const IRoutes = require("./IRoutes");

class RelatorioRoutes extends IRoutes {
    constructor(relatorioController) {
        super();
        if (!(relatorioController instanceof IRelatorioController)) {
            throw new Error('O controller de relatório deve implementar IRelatorioController.');
        }
        this.relatorioController = relatorioController;
        this.createRoutes();
    }

    createRoutes() {
        this.router.post('/relatorios/gerar', authMiddleware, (req, res) => this.relatorioController.gerarRelatorio(req, res));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = RelatorioRoutes;