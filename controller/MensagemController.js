const path = require('path');
const config = require('../config.js');
const IMensagemController = require('./IMensagemController');
const MensagemDAO = require(path.join(__dirname, '..', 'persistencelayer', 'dao', config.MensagemDAO));
const { mensagemCreateSchema } = require(path.join(__dirname, '..', 'servicelayer', 'dto', config.MensagemCreateReq));
const MensagemResponseDTO = require(path.join(__dirname, '..', 'servicelayer', 'dto', config.MensagemResponseDTO));
const NotificacaoDAO = require(path.join(__dirname, '..', 'persistencelayer', 'dao', config.NotificacaoDAO));

const mensagemDAO = new MensagemDAO();
const notificacaoDAO = new NotificacaoDAO();



class MensagemController extends IMensagemController {

    async create(req, res) {
        try {
            const { user } = req;
            const { error, value } = mensagemCreateSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            if (user.id !== value.remetenteId) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para enviar mensagens em nome de outro usuário.' });
            }

            // CORREÇÃO: Mapeia os dados do DTO para o formato do DAO
            const dadosParaDAO = {
                remetente: value.remetenteId,
                destinatario: value.destinatarioId,
                conteudo: value.conteudo
            };

            const novaMensagem = await mensagemDAO.create(dadosParaDAO); // Passa o objeto mapeado

            const notificacaoData = {
                usuario_id: novaMensagem.destinatario,
                tipo_evento: 'nova_mensagem',
                detalhes: `Você recebeu uma nova mensagem de ${user.email}.`,
                status: 'pendente'
            };
            await notificacaoDAO.create(notificacaoData);

            const responseDto = new MensagemResponseDTO(novaMensagem);

            return res.status(201).json({
                msgcode: '007',
                mensagem: responseDto,
                message: 'Mensagem enviada com sucesso.'
            });

        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;
            const mensagem = await mensagemDAO.findById(id);

            if (mensagem && user.tipo !== 'Gestor' && mensagem.remetente.toString() !== user.id && mensagem.destinatario.toString() !== user.id) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar esta mensagem.' });
            }

            if (!mensagem) {
                return res.status(404).json({ message: 'Mensagem não encontrada.' });
            }

            const responseDto = new MensagemResponseDTO(mensagem);
            return res.status(200).json(responseDto);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async findByRemetenteId(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;

            if (user.tipo !== 'Gestor' && user.id !== id) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar estas mensagens.' });
            }

            const mensagens = await mensagemDAO.findByRemetenteId(id);
            const responseDtos = mensagens.map(m => new MensagemResponseDTO(m));
            return res.status(200).json(responseDtos);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async findByDestinatarioId(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;

            if (user.tipo !== 'Gestor' && user.id !== id) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar estas mensagens.' });
            }

            const mensagens = await mensagemDAO.findByDestinatarioId(id);
            const responseDtos = mensagens.map(m => new MensagemResponseDTO(m));
            return res.status(200).json(responseDtos);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;
            const mensagem = await mensagemDAO.findById(id);

            if (mensagem && user.tipo !== 'Gestor' && mensagem.remetente.toString() !== user.id) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para atualizar esta mensagem.' });
            }

            const dadosAtualizacao = req.body;
            const mensagemAtualizada = await mensagemDAO.update(id, dadosAtualizacao);

            if (!mensagemAtualizada) {
                return res.status(404).json({ message: 'Mensagem não encontrada.' });
            }

            const responseDto = new MensagemResponseDTO(mensagemAtualizada);
            return res.status(200).json(responseDto);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;
            const mensagem = await mensagemDAO.findById(id);

            if (mensagem && user.tipo !== 'Gestor' && mensagem.remetente.toString() !== user.id && mensagem.destinatario.toString() !== user.id) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para deletar esta mensagem.' });
            }

            const sucesso = await mensagemDAO.delete(id);
            if (!sucesso) {
                return res.status(404).json({ message: 'Mensagem não encontrada.' });
            }
            return res.status(200).json({ msgcode: '008', message: 'Mensagem deletada com sucesso.' });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
}

module.exports = MensagemController;