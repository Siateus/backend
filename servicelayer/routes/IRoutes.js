const express = require('express');

class IRoutes {
    constructor() {
        this.router = express.Router();
    }

    createRoutes() {
        throw new Error("O método 'createRoutes' deve ser implementado.");
    }

    getRouter() {
        return this.router;
    }
}

module.exports = IRoutes;