// config.js
const config = {
    // Configuração dos Controllers
    "UsuarioController": "UsuarioController.js",
    "MensagemController": "MensagemController.js",
    "NotificacaoController": "NotificacaoController.js",
    "PontoController": "PontoController.js",
    "RelatorioController": "RelatorioController.js",

    // Configuração das Rotas
    "UsuarioRoutes": "UsuarioRoutes.js",
    "MensagemRoutes": "MensagemRoutes.js",
    "NotificacaoRoutes": "NotificacaoRoutes.js",
    "PontoRoutes": "PontoRoutes.js",
    "RelatorioRoutes": "RelatorioRoutes.js",

    // Configuração dos DAOs
    "UsuarioDAO": "UsuarioDAO.js",
    "MensagemDAO": "MensagemDAO.js",
    "NotificacaoDAO": "NotificacaoDAO.js",
    "PontoDAO": "PontoDAO.js",
    "RelatorioDAO": "RelatorioDAO.js",

    // Configuração de Middlewares
    "authMiddleware": "authMiddleware.js",
};

module.exports = config;