class Ponto{
  #id;
  #usuario_id;
  #data;
  #horaEntrada;
  #horaSaida;
  #horasTrabalhadas;
  #status;
  #localizacao;

  set id(id) {
    this.#id = id;
  }
  get id() {
    return this.#id;
  }
  set usuario_id(usuario_id) {
    this.#usuario_id = usuario_id;
  }
  get usuario_id() {
    return this.#usuario_id;
  }
  set data(data) {
    this.#data = data;
  }
  get data() {
    return this.#data;
  }
  set horaEntrada(horaEntrada) {
    this.#horaEntrada = horaEntrada;
  }
  get horaEntrada() {
    return this.#horaEntrada;
  }
  set horaSaida(horaSaida) {
    this.#horaSaida = horaSaida;
  }
  get horaSaida() {
    return this.#horaSaida;
  }
  set horasTrabalhadas(horasTrabalhadas) {
    this.#horasTrabalhadas = horasTrabalhadas;
  }
  get horasTrabalhadas() {
    return this.#horasTrabalhadas;
  }
  set status(status) {
    this.#status = status;
  }
  get status() {
    return this.#status;
  }
  set localizacao(localizacao) {
    this.#localizacao = localizacao;
  }
  get localizacao() {
    return this.#localizacao;
  }

  toJSON() {
    return {
      id: this.#id,
      usuario_id: this.#usuario_id,
      data: this.#data,
      horaEntrada: this.#horaEntrada,
      horaSaida: this.#horaSaida,
      horasTrabalhadas: this.#horasTrabalhadas,
      status: this.#status,
      localizacao: this.#localizacao
    };
  }
}

module.exports = Ponto;