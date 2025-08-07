class Gestor extends Funcionario {
  #nivelAcesso;
  #podeGerenciarUsuarios;
  #podeConfigurarSistema;

  set nivelAcesso(nivelAcesso) {
    this.#nivelAcesso = nivelAcesso;
  }
  get nivelAcesso() {
    return this.#nivelAcesso;
  }
  set podeGerenciarUsuarios(podeGerenciarUsuarios) {
    this.#podeGerenciarUsuarios = podeGerenciarUsuarios;
  }
  get podeGerenciarUsuarios() {
    return this.#podeGerenciarUsuarios;
  }
  set podeConfigurarSistema(podeConfigurarSistema) {
    this.#podeConfigurarSistema = podeConfigurarSistema;
  }
  get podeConfigurarSistema() {
    return this.#podeConfigurarSistema;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      nivelAcesso: this.#nivelAcesso,
      podeGerenciarUsuarios: this.#podeGerenciarUsuarios,
      podeConfigurarSistema: this.#podeConfigurarSistema
    };
  }
}

module.exports = Gestor;