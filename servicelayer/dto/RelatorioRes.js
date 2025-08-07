class RelatorioRes {
    constructor(dadosRelatorio) {
        this.periodo = dadosRelatorio.periodo;
        this.horasExtras = dadosRelatorio.horasExtras;
        this.horasTrabalhadas = dadosRelatorio.horasTrabalhadas;
        this.ausencias = dadosRelatorio.ausencias;
        this.registrosPonto = dadosRelatorio.registrosPonto;
    }
}

module.exports = RelatorioRes;