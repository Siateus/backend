const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Carrega o arquivo de configuração de dependências
const config = require('./config.js');

const app = express();
const PORT = 3000;
const DB_URI = 'mongodb+srv://matheus62053:pc3123@cluster0.ry71u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// --- Middlewares Globais ---
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// --- Conexão com o MongoDB ---
mongoose.connect(DB_URI)
    .then(() => {
        console.log('Conectado ao MongoDB com sucesso!');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1);
    });

// --- Configuração dos caminhos base ---
const controllerPath = './controller/';
const routesPath = './servicelayer/routes/';

// --- Carregar Controllers e Rotas dinamicamente ---
const UsuarioController = require(path.join(__dirname, controllerPath, config.UsuarioController));
const MensagemController = require(path.join(__dirname, controllerPath, config.MensagemController));
const NotificacaoController = require(path.join(__dirname, controllerPath, config.NotificacaoController));
const PontoController = require(path.join(__dirname, controllerPath, config.PontoController));
const RelatorioController = require(path.join(__dirname, controllerPath, config.RelatorioController));

const UsuarioRoutes = require(path.join(__dirname, routesPath, config.UsuarioRoutes));
const MensagemRoutes = require(path.join(__dirname, routesPath, config.MensagemRoutes));
const NotificacaoRoutes = require(path.join(__dirname, routesPath, config.NotificacaoRoutes));
const PontoRoutes = require(path.join(__dirname, routesPath, config.PontoRoutes));
const RelatorioRoutes = require(path.join(__dirname, routesPath, config.RelatorioRoutes));

// --- Instanciar e Montar as Rotas ---
const usuarioController = new UsuarioController();
const mensagemController = new MensagemController();
const notificacaoController = new NotificacaoController();
const pontoController = new PontoController();
const relatorioController = new RelatorioController();

const usuarioRoutes = new UsuarioRoutes(usuarioController);
const mensagemRoutes = new MensagemRoutes(mensagemController);
const notificacaoRoutes = new NotificacaoRoutes(notificacaoController);
const pontoRoutes = new PontoRoutes(pontoController);
const relatorioRoutes = new RelatorioRoutes(relatorioController);

app.use('/api', usuarioRoutes.getRouter());
app.use('/api', mensagemRoutes.getRouter());
app.use('/api', notificacaoRoutes.getRouter());
app.use('/api', pontoRoutes.getRouter());
app.use('/api', relatorioRoutes.getRouter());