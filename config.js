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

    // CORREÇÃO: Nomes dos DTOs ajustados para a sua estrutura
    "GerarRelatorioReq": "GerarRelatorioReq.js",
    "MensagemCreateReq": "MensagemCreateReq.js",
    "MensagemResponseDTO": "MensagemResponseDTO.js",
    "NotificacaoCreateReq": "NotificacaoCreateReq.js",
    "NotificacaoResponseDTO": "NotificacaoResponseDTO.js",
    "PontoResponseDTO": "PontoResponseDTO.js",
    "PontoUpdateReq": "PontoUpdateReq.js",
    "RelatorioRes": "RelatorioRes.js",
    "UsuarioCreate": "UsuarioCreate.js",
    "UsuarioLogin": "UsuarioLogin.js",
    "UsuarioResponseDTO": "UsuarioResponseDTO.js",
    "UsuarioUpdateReq": "UsuarioUpdateReq.js",

    // Configuração de Middlewares
    "authMiddleware": "authMiddleware.js",
};

module.exports = config;