const express = require('express');
const router = express.Router();
const IUsuarioController = require('../../controller/IUsuarioController');
const IRoutes = require("./IRoutes");
const authMiddleware = require('./authMiddleware');

class UsuarioRoutes extends IRoutes {
    constructor(usuarioController) {
        super();
        if (!(usuarioController instanceof IUsuarioController)) {
            throw new Error('O controller de usuário deve implementar IUsuarioController.');
        }
        this.usuarioController = usuarioController;
        this.createRoutes();
    }

    createRoutes() {
        this.router.get('/api', (req, res) => {
            res.status(200).json({ message: 'SGP API' });
        });
        this.router.post('/usuarios', (req, res) => this.usuarioController.createUsuario(req, res));
        this.router.post('/usuarios/login', (req, res) => this.usuarioController.loginUsuario(req, res));

        this.router.get('/usuarios', authMiddleware, (req, res) => this.usuarioController.getAllUsuarios(req, res));
        this.router.get('/usuarios/:id', authMiddleware, (req, res) => this.usuarioController.getUsuarioById(req, res));
        this.router.put('/usuarios/:id', authMiddleware, (req, res) => this.usuarioController.updateUsuario(req, res));
        this.router.delete('/usuarios/:id', authMiddleware, (req, res) => this.usuarioController.deleteUsuario(req, res));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = UsuarioRoutes;