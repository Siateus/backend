const path = require('path');
const config = require('../config.js');
const IUsuarioController = require('./IUsuarioController');
const UsuarioDAO = require(path.join(__dirname, '..', 'persistencelayer', 'dao', config.UsuarioDAO));
const NotificacaoDAO = require(path.join(__dirname, '..', 'persistencelayer', 'dao', config.NotificacaoDAO));
const UsuarioResponseDTO = require(path.join(__dirname, '..', 'servicelayer', 'dto', config.UsuarioResponseDTO));
const { usuarioCreateSchema } = require(path.join(__dirname, '..', 'servicelayer', 'dto', config.UsuarioCreate));
const { usuarioLoginSchema } = require(path.join(__dirname, '..', 'servicelayer', 'dto', config.UsuarioLogin));
const { usuarioUpdateSchema } = require(path.join(__dirname, '..', 'servicelayer', 'dto', config.UsuarioUpdateReq));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const notificacaoDAO = new NotificacaoDAO();
const usuarioDAO = new UsuarioDAO();

const JWT_SECRET = 'seu-segredo-super-secreto';

class UsuarioController extends IUsuarioController {

    async createUsuario(req, res) {
        try {
            const { error, value } = usuarioCreateSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            // Lógica de criptografia da senha movida para o Controller
            const senhaInicial = value.cpf;
            const hashedPassword = await bcrypt.hash(senhaInicial, 10);

            // Passa a senha já criptografada para o DAO
            const dadosParaDAO = { ...value, password: hashedPassword };

            const novoUsuario = await usuarioDAO.create(dadosParaDAO);
            const notificacaoData = {
                usuario_id: novoUsuario._id,
                tipo_evento: 'boas_vindas',
                detalhes: `Sua conta foi criada com sucesso! Sua senha inicial é o seu CPF.`,
                status: 'pendente'
            };
            await notificacaoDAO.create(notificacaoData);

            const responseDto = new UsuarioResponseDTO(novoUsuario);
            return res.status(201).json({ msgcode: '002', usuario: responseDto, message: 'Usuário criado com sucesso.' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        }
    }


    async loginUsuario(req, res) {
        try {
            const { error, value } = usuarioLoginSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const { email, password } = value;
            const usuarioAutenticado = await usuarioDAO.autenticar(email, password);
            if (!usuarioAutenticado) {
                return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
            }
            const payload = {
                id: usuarioAutenticado.id,
                email: usuarioAutenticado.email,
                tipo: usuarioAutenticado.tipo
            };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            const responseDto = new UsuarioResponseDTO(usuarioAutenticado);
            return res.status(200).json({ msgcode: '001', usuario: responseDto, token, message: 'Login realizado com sucesso.' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Erro ao fazer login: ' + e.message });
        }
    }

    async getUsuarioById(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;

            // Autorização: Permite que um gestor ou o próprio usuário acesse o perfil
            if (user.tipo !== 'Gestor' && user.id !== id) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar este perfil.' });
            }

            const usuario = await usuarioDAO.findById(id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            const responseDto = new UsuarioResponseDTO(usuario);
            return res.status(200).json(responseDto);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Erro ao buscar usuário.' });
        }
    }

    async getAllUsuarios(req, res) {
        try {
            const { user } = req;

            // Autorização: Apenas gestores podem listar todos os usuários
            if (user.tipo !== 'Gestor') {
                return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem listar todos os usuários.' });
            }

            const usuarios = await usuarioDAO.findAll();
            const responseDTOs = usuarios.map(u => new UsuarioResponseDTO(u));
            return res.status(200).json(responseDTOs);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Erro ao buscar usuários.' });
        }
    }

    async updateUsuario(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;

            // Autorização: Apenas gestores podem editar outros usuários. Usuários normais só editam o próprio perfil.
            if (user.tipo !== 'Gestor' && user.id !== id) {
                return res.status(403).json({ message: 'Acesso negado. Você não pode atualizar o perfil de outro usuário.' });
            }

            const { error, value } = usuarioUpdateSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            // Lógica de criptografia de senha e remoção de confpassword...
            const usuarioAtualizado = await usuarioDAO.update(id, value);
            if (!usuarioAtualizado) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            const notificacaoData = {
                usuario_id: usuarioAtualizado._id,
                tipo_evento: 'perfil_atualizado',
                detalhes: 'Seu perfil foi atualizado.',
                status: 'pendente'
            };
            await notificacaoDAO.create(notificacaoData);

            const responseDto = new UsuarioResponseDTO(usuarioAtualizado);
            return res.status(200).json(responseDto);

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Erro ao atualizar usuário: ' + e.message });
        }
    }

    async deleteUsuario(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;

            // Autorização: Apenas gestores podem deletar usuários
            if (user.tipo !== 'Gestor') {
                return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem deletar usuários.' });
            }

            const sucesso = await usuarioDAO.delete(id);
            if (!sucesso) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            return res.status(200).json({ msgcode: '006', message: 'Usuário deletado com sucesso.' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Erro ao deletar usuário.' });
        }
    }
}

module.exports = UsuarioController;