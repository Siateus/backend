class IPontoDAO {
    createMany(pontos) {}

    findById(id) {}

    update(id, ponto) {}

    delete(id) {}

    findByUsuarioId(usuarioId) {}

    findByUsuarioIdAndPeriodo(usuarioId, dataInicio, dataFim) {}

    findAll(pagina, tamanhoPagina) {}
}

module.exports = IPontoDAO;