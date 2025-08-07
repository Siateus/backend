const INotificacaoDAO = require('./INotificacaoDAO');
const NotificacaoModel = require('../models/Notificacao'); // Verifique este caminho

class NotificacaoDAO extends INotificacaoDAO {

    async create(dadosNotificacao) {
        try {
            const novaNotificacao = new NotificacaoModel(dadosNotificacao);
            await novaNotificacao.save();
            return novaNotificacao;
        } catch (error) {
            throw new Error('Erro ao criar notificação: ' + error.message);
        }
    }

    async findById(id) {
        return await NotificacaoModel.findById(id);
    }

    async update(id, dadosNotificacao) {
        try {
            const notificacaoAtualizada = await NotificacaoModel.findByIdAndUpdate(id, dadosNotificacao, { new: true });
            return notificacaoAtualizada;
        } catch (error) {
            throw new Error('Erro ao atualizar notificação: ' + error.message);
        }
    }

    async delete(id) {
        const result = await NotificacaoModel.findByIdAndDelete(id);
        return !!result;
    }

    async findByUsuarioId(usuarioId) {
        return NotificacaoModel.find({usuario_id: usuarioId}).sort({data_evento: -1});
    }

    async findAll() {
        return NotificacaoModel.find({}).sort({data_evento: -1});
    }
}

module.exports = NotificacaoDAO;