const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Importar os Controllers (implementações concretas)
const UsuarioController = require('./controller/UsuarioController');
const PontoController = require('./controller/PontoController');
const RelatorioController = require('./controller/RelatorioController');
const MensagemController = require('./controller/MensagemController');
const NotificacaoController = require('./controller/NotificacaoController');

// Importar as classes de Rotas (implementações concretas)
const UsuarioRoutes = require('./servicelayer/routes/UsuarioRoutes');
const PontoRoutes = require('./servicelayer/routes/PontoRoutes');
const RelatorioRoutes = require('./servicelayer/routes/RelatorioRoutes');
const MensagemRoutes = require('./servicelayer/routes/MensagemRoutes');
const NotificacaoRoutes = require('./servicelayer/routes/NotificacaoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
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

        // Após a conexão bem-sucedida, inicie o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Acesse: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB:', err);
        // Encerre o processo se a conexão com o banco de dados falhar
        process.exit(1);
    });


// --- 3. Instanciar e Montar as Rotas ---
// Criar instâncias dos controller
const usuarioController = new UsuarioController();
const pontoController = new PontoController();
const relatorioController = new RelatorioController();
const mensagemController = new MensagemController();
const notificacaoController = new NotificacaoController();

const usuarioRoutes = new UsuarioRoutes(usuarioController);
const pontoRoutes = new PontoRoutes(pontoController);
const relatorioRoutes = new RelatorioRoutes(relatorioController);
const mensagemRoutes = new MensagemRoutes(mensagemController);
const notificacaoRoutes = new NotificacaoRoutes(notificacaoController);

// Montar os roteadores no Express
app.use('/api', usuarioRoutes.getRouter());
app.use('/api', pontoRoutes.getRouter());
app.use('/api', relatorioRoutes.getRouter());
app.use('/api', mensagemRoutes.getRouter());
app.use('/api', notificacaoRoutes.getRouter());

