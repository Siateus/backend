class Usuario {
    #id;
    #nome;
    #cpf;
    #dataNascimento;
    #idade;
    #cargo;
    #status;
    #tipo;
    #email;
    #password;
    #fotoPerfil;

    constructor(dados) {
        if (dados) Object.assign(this, dados);
    }

    set id(id) { this.#id = id; }
    get id() { return this.#id; }
    set nome(nome) { this.#nome = nome; }
    get nome() { return this.#nome; }
    set cpf(cpf) { this.#cpf = cpf; }
    get cpf() { return this.#cpf; }
    set dataNascimento(dataNascimento) { this.#dataNascimento = dataNascimento; }
    get dataNascimento() { return this.#dataNascimento; }
    set idade(idade) { this.#idade = idade; }
    get idade() { return this.#idade; }
    set cargo(cargo) { this.#cargo = cargo; }
    get cargo() { return this.#cargo; }
    set status(status) { this.#status = status; }
    get status() { return this.#status; }
    set tipo(tipo) { this.#tipo = tipo; }
    get tipo() { return this.#tipo; }
    set email(email) { this.#email = email; }
    get email() { return this.#email; }
    set password(password) { this.#password = password; }
    get password() { return this.#password; }
    set fotoPerfil(fotoPerfil) { this.#fotoPerfil = fotoPerfil; }
    get fotoPerfil() { return this.#fotoPerfil; }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            cpf: this.#cpf,
            dataNascimento: this.#dataNascimento,
            idade: this.#idade,
            cargo: this.#cargo,
            status: this.#status,
            tipo: this.#tipo,
            email: this.#email,
            password: this.#password,
            fotoPerfil: this.#fotoPerfil
        };
    }
}

class Funcionario extends Usuario {
    #salario;
    #departamento;

    set salario(salario) { this.#salario = salario; }
    get salario() { return this.#salario; }
    set departamento(departamento) { this.#departamento = departamento; }
    get departamento() { return this.#departamento; }

    toJSON() {
        return {
            ...super.toJSON(),
            salario: this.#salario,
            departamento: this.#departamento
        };
    }
}

class Gestor extends Funcionario {
    #nivelAcesso;
    #podeGerenciarUsuarios;
    #podeConfigurarSistema;

    set nivelAcesso(nivelAcesso) { this.#nivelAcesso = nivelAcesso; }
    get nivelAcesso() { return this.#nivelAcesso; }
    set podeGerenciarUsuarios(podeGerenciarUsuarios) { this.#podeGerenciarUsuarios = podeGerenciarUsuarios; }
    get podeGerenciarUsuarios() { return this.#podeGerenciarUsuarios; }
    set podeConfigurarSistema(podeConfigurarSistema) { this.#podeConfigurarSistema = podeConfigurarSistema; }
    get podeConfigurarSistema() { return this.#podeConfigurarSistema; }

    toJSON() {
        return {
            ...super.toJSON(),
            nivelAcesso: this.#nivelAcesso,
            podeGerenciarUsuarios: this.#podeGerenciarUsuarios,
            podeConfigurarSistema: this.#podeConfigurarSistema
        };
    }
}

module.exports = { Usuario, Funcionario, Gestor };