class Funcionario extends Usuario {
  #salario;
  #departamento;

  set salario(salario) {
    this.#salario = salario;
  }
  get salario() {
    return this.#salario;
  }
  set departamento(departamento) {
    this.#departamento = departamento;
  }
  get departamento() {
    return this.#departamento;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      salario: this.#salario,
      departamento: this.#departamento
    };
  }
}

module.exports = Funcionario;