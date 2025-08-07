const path = require('path');
const config = require('../config.js');
const INotificacaoController = require('./INotificacaoController');
const NotificacaoDAO = require(path.join(__dirname, '..', 'persistencelayer', 'dao', config.NotificacaoDAO));
const NotificacaoResponseDTO = require(path.join(__dirname, '..', 'servicelayer', 'dto', config.NotificacaoResponseDTO));
const { notificacaoCreateSchema } = require(path.join(__dirname, '..', 'servicelayer', 'dto', config.NotificacaoCreateReq));

const notificacaoDAO = new NotificacaoDAO();

class NotificacaoController extends INotificacaoController {

    async create(req, res) {
        try {
            const { user } = req;
            const { error, value } = notificacaoCreateSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            if (user.tipo !== 'Gestor' && user.id !== value.usuarioId) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para criar notificações para outros usuários.' });
            }

            const notificacaoDataForDAO = {
                usuario_id: value.usuarioId,
                tipo_evento: value.tipoEvento,
                detalhes: value.detalhes,
                status: 'pendente',
            };
            const novaNotificacao = await notificacaoDAO.create(notificacaoDataForDAO);

            if (!novaNotificacao) {
                return res.status(500).json({ message: 'Falha ao criar notificação.' });
            }

            const responseDto = new NotificacaoResponseDTO(novaNotificacao);

            return res.status(201).json({ msgcode: '009', notificacao: responseDto, message: 'Notificação criada com sucesso.' });
        } catch (e) {
            return res.status(500).json({ message: 'Erro interno ao processar a criação de notificação.' });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;
            const notificacao = await notificacaoDAO.findById(id);

            if (notificacao && user.tipo !== 'Gestor' && notificacao.usuario_id.toString() !== user.id) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar esta notificação.' });
            }

            if (!notificacao) {
                return res.status(404).json({ message: 'Notificação não encontrada.' });
            }

            const responseDto = new NotificacaoResponseDTO(notificacao);
            return res.status(200).json(responseDto);
        } catch (e) {
            return res.status(500).json({ message: 'Erro ao buscar notificação.' });
        }
    }

    async findAll(req, res) {
        try {
            const { user } = req;

            if (user.tipo !== 'Gestor') {
                return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem listar todas as notificações.' });
            }

            const notificacoes = await notificacaoDAO.findAll();
            const responseDtos = notificacoes.map(n => new NotificacaoResponseDTO(n));
            return res.status(200).json(responseDtos);
        } catch (e) {
            return res.status(500).json({ message: 'Erro ao buscar todas as notificações.' });
        }
    }

    async findByUsuarioId(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;

            if (user.tipo !== 'Gestor' && user.id !== id) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar estas notificações.' });
            }

            const notificacoes = await notificacaoDAO.findByUsuarioId(id);
            const responseDtos = notificacoes.map(n => new NotificacaoResponseDTO(n));
            return res.status(200).json(responseDtos);
        } catch (e) {
            return res.status(500).json({ message: 'Erro ao buscar notificações por usuário.' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;

            if (user.tipo !== 'Gestor') {
                return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem atualizar notificações.' });
            }

            const dadosAtualizacao = req.body;
            const notificacaoAtualizada = await notificacaoDAO.update(id, dadosAtualizacao);

            if (!notificacaoAtualizada) {
                return res.status(404).json({ message: 'Notificação não encontrada.' });
            }

            const responseDto = new NotificacaoResponseDTO(notificacaoAtualizada);
            return res.status(200).json(responseDto);
        } catch (e) {
            return res.status(500).json({ message: 'Erro ao atualizar notificação.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;

            if (user.tipo !== 'Gestor') {
                return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem deletar notificações.' });
            }

            const sucesso = await notificacaoDAO.delete(id);
            if (!sucesso) {
                return res.status(404).json({ message: 'Notificação não encontrada.' });
            }
            return res.status(200).json({ msgcode: '010', message: 'Notificação deletada com sucesso.' });
        } catch (e) {
            return res.status(500).json({ message: 'Erro ao deletar notificação.' });
        }
    }
}

module.exports = NotificacaoController;