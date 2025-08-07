class Notificacao {
  #id;
  #usuario_id;
  #tipo_evento;
  #data_evento;
  #detalhes;

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
  set tipo_evento(tipo_evento) {
    this.#tipo_evento = tipo_evento;
  }
  get tipo_evento() {
    return this.#tipo_evento;
  }
  set data_evento(data_evento) {
    this.#data_evento = data_evento;
  }
  get data_evento() {
    return this.#data_evento;
  }
  set detalhes(detalhes) {
    this.#detalhes = detalhes;
  }
  get detalhes() {
    return this.#detalhes;
  }

  toJSON() {
    return {
      id: this.#id,
      usuario_id: this.#usuario_id,
      tipo_evento: this.#tipo_evento,
      data_evento: this.#data_evento,
      detalhes: this.#detalhes
    };
  }
}

module.exports = Notificacao;