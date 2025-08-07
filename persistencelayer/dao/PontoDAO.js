const IPontoDAO = require('./IPontoDAO');
const Ponto = require('../models/Ponto');
const moment = require('moment');

class PontoDAO extends IPontoDAO {


    async createMany(pontos) {
        try {
            const novosPontos = await Ponto.insertMany(pontos);
            return novosPontos;
        } catch (error) {
            throw new Error('Erro ao criar registros de ponto em lote: ' + error.message);
        }
    }

    async findById(id) {
        return await Ponto.findById(id);
    }

    async update(id, dadosPonto) {
        try {
            const pontoAtualizado = await Ponto.findByIdAndUpdate(id, dadosPonto, { new: true, runValidators: true });
            return pontoAtualizado;
        } catch (error) {
            throw new Error('Erro ao atualizar ponto: ' + error.message);
        }
    }

    async delete(id) {
        const result = await Ponto.findByIdAndDelete(id);
        return !!result;
    }

    async findByUsuarioId(usuarioId) {
        return await Ponto.find({ usuario_id: usuarioId }).sort({ data: -1 });
    }

    async findByUsuarioIdAndPeriodo(usuarioId, dataInicio, dataFim) {
        return await Ponto.find({
            usuario_id: usuarioId,
            data: {
                $gte: moment(dataInicio).startOf('day').toDate(),
                $lte: moment(dataFim).endOf('day').toDate()
            }
        }).sort({ data: -1 });
    }

    async findAll(pagina, tamanhoPagina) {
        const skip = (pagina - 1) * tamanhoPagina;
        return await Ponto.find({}).skip(skip).limit(tamanhoPagina).sort({ data: -1 });
    }

    async findByUsuarioIdWithPagination(usuarioId, pagina, tamanhoPagina) {
        const skip = (pagina - 1) * tamanhoPagina;
        return await Ponto.find({ usuario_id: usuarioId }).skip(skip).limit(tamanhoPagina).sort({ data: -1 });
    }
}

module.exports = PontoDAO;