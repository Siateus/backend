const express = require('express');
const router = express.Router();
const IPontoController = require('../../controller/IPontoController');
const authMiddleware = require('./authMiddleware');
const IRoutes = require("./IRoutes");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


class PontoRoutes extends IRoutes {
    constructor(pontoController) {
        super();
        if (!(pontoController instanceof IPontoController)) {
            throw new Error('O controller de ponto deve implementar IPontoController.');
        }
        this.pontoController = pontoController;
        this.createRoutes();
    }

    createRoutes() {
        this.router.post('/pontos/upload-csv', authMiddleware, upload.single('file'),
            (req, res) => this.pontoController.receberRegistroPontoCSV(req, res)
        );
        this.router.get('/pontos',authMiddleware, (req, res) => this.pontoController.findAll(req, res));
        this.router.get('/pontos/:id', authMiddleware, (req, res) => this.pontoController.findById(req, res));
        this.router.get('/pontos/usuario/:id', authMiddleware, (req, res) => this.pontoController.findByUsuarioId(req, res));
        this.router.put('/pontos/:id', authMiddleware, (req, res) => this.pontoController.update(req, res));
        this.router.delete('/pontos/:id', authMiddleware, (req, res) => this.pontoController.delete(req, res));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = PontoRoutes;