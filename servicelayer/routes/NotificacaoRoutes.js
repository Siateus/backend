const express = require('express');
const router = express.Router();
const INotificacaoController = require('../../controller/INotificacaoController');
const authMiddleware = require('./authMiddleware');
const IRoutes = require("./IRoutes");

class NotificacaoRoutes extends IRoutes {
    constructor(notificacaoController) {
        super();
        if (!(notificacaoController instanceof INotificacaoController)) {
            throw new Error('O controller de notificação deve implementar INotificacaoController.');
        }
        this.notificacaoController = notificacaoController;
        this.createRoutes();
    }

    createRoutes() {
        this.router.get('/notificacoes/usuario/:id', authMiddleware, (req, res) => this.notificacaoController.findByUsuarioId(req, res));
        this.router.get('/notificacoes', authMiddleware, (req, res) => this.notificacaoController.findAll(req, res));
        this.router.put('/notificacoes/:id', authMiddleware, (req, res) => this.notificacaoController.update(req, res));
        this.router.delete('/notificacoes/:id', authMiddleware, (req, res) => this.notificacaoController.delete(req, res));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = NotificacaoRoutes;