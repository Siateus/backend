class PontoResponseDTO {
    constructor(ponto) {
        this.id = ponto._id;
        this.usuarioId = ponto.usuario_id;
        this.data = ponto.data;
        this.horaEntrada = ponto.horaEntrada;
        this.horaSaida = ponto.horaSaida;
        this.horasTrabalhadas = ponto.horasTrabalhadas;
        this.status = ponto.status;
        this.localizacao = ponto.localizacao;
    }
}

module.exports = PontoResponseDTO;