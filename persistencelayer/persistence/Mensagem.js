class Mensagem {
  #id;
  #remetente;
  #destinatario;
  #conteudo;
  #dataEnvio;

  set id(id) {
    this.#id = id;
  }
  get id() {
    return this.#id;
  }
  set remetente(remetente) {
    this.#remetente = remetente;
  }
  get remetente() {
    return this.#remetente;
  }
  set destinatario(destinatario) {
    this.#destinatario = destinatario;
  }
  get destinatario() {
    return this.#destinatario;
  }
  set conteudo(conteudo) {
    this.#conteudo = conteudo;
  }
  get conteudo() {
    return this.#conteudo;
  }
  set dataEnvio(dataEnvio) {
    this.#dataEnvio = dataEnvio;
  }
  get dataEnvio() {
    return this.#dataEnvio;
  }

  toJSON() {
    return {
      id: this.#id,
      remetente: this.#remetente,
      destinatario: this.#destinatario,
      conteudo: this.#conteudo,
      dataEnvio: this.#dataEnvio
    };
  }
}

module.exports = Mensagem;