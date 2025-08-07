const express = require('express');
const router = express.Router();
const IMensagemController = require('../../controller/IMensagemController');
const authMiddleware = require('./authMiddleware');
const IRoutes = require("./IRoutes");

class MensagemRoutes extends IRoutes {
    constructor(mensagemController) {
        super();
        if (!(mensagemController instanceof IMensagemController)) {
            throw new Error('O controller de mensagem deve implementar IMensagemController.');
        }
        this.mensagemController = mensagemController;
        this.createRoutes();
    }

    createRoutes() {
        this.router.post('/mensagens', authMiddleware, (req, res) => this.mensagemController.create(req, res));
        this.router.get('/mensagens/caixa-entrada/:id', authMiddleware, (req, res) => this.mensagemController.findByDestinatarioId(req, res));
        this.router.get('/mensagens/enviadas/:id', authMiddleware, (req, res) => this.mensagemController.findByRemetenteId(req, res));
        this.router.put('/mensagens/:id', authMiddleware, (req, res) => this.mensagemController.update(req, res));
        this.router.delete('/mensagens/:id', authMiddleware, (req, res) => this.mensagemController.delete(req, res));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = MensagemRoutes;