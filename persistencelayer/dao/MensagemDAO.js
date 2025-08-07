const IMensagemDAO = require('./IMensagemDAO');
const Mensagem = require('../models/Mensagem');

class MensagemDAO extends IMensagemDAO {

    async create(dadosMensagem) {
        try {
            const novaMensagem = new Mensagem(dadosMensagem);
            await novaMensagem.save();
            return novaMensagem;
        } catch (error) {
            throw new Error('Erro ao criar mensagem: ' + error.message);
        }
    }

    async findById(id) {
        return await Mensagem.findById(id);
    }

    async update(id, dadosMensagem) {
        try {
            const mensagemAtualizada = await Mensagem.findByIdAndUpdate(id, dadosMensagem, { new: true });
            return mensagemAtualizada;
        } catch (error) {
            throw new Error('Erro ao atualizar mensagem: ' + error.message);
        }
    }

    async delete(id) {
        const result = await Mensagem.findByIdAndDelete(id);
        return !!result;
    }

    async findByRemetenteId(remetenteId) {
        return await Mensagem.find({ remetente: remetenteId }).sort({ dataEnvio: -1 });
    }

    async findByDestinatarioId(destinatarioId) {
        return await Mensagem.find({ destinatario: destinatarioId }).sort({ dataEnvio: -1 });
    }
}

module.exports = MensagemDAO;