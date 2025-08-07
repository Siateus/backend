class Relatorio {
  #id;
  #funcionario_id;
  #periodo;
  #horas_trabalhadas;
  #horas_extras;

  set id(id) {
    this.#id = id;
  }
  get id() {
    return this.#id;
  }
  set funcionario_id(funcionario_id) {
    this.#funcionario_id = funcionario_id;
  }
  get funcionario_id() {
    return this.#funcionario_id;
  }
  set periodo(periodo) {
    this.#periodo = periodo;
  }
  get periodo() {
    return this.#periodo;
  }
  set horas_trabalhadas(horas_trabalhadas) {
    this.#horas_trabalhadas = horas_trabalhadas;
  }
  get horas_trabalhadas() {
    return this.#horas_trabalhadas;
  }
  set horas_extras(horas_extras) {
    this.#horas_extras = horas_extras;
  }
  get horas_extras() {
    return this.#horas_extras;
  }

  toJSON() {
    return {
      id: this.#id,
      funcionario_id: this.#funcionario_id,
      periodo: this.#periodo,
      horas_trabalhadas: this.#horas_trabalhadas,
      horas_extras: this.#horas_extras
    };
  }
}

module.exports = Relatorio;