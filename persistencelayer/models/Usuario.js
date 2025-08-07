const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    dataNascimento: { type: Date, required: true },
    idade: { type: Number },
    cargo: { type: String, required: true },
    status: { type: Boolean, default: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fotoPerfil: { type: String },
}, {
    discriminatorKey: 'tipo',
    timestamps: true
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

const Funcionario = Usuario.discriminator('Funcionario', new mongoose.Schema({
    salario: { type: Number, required: true },
    departamento: { type: String, required: true },
}));

const Gestor = Usuario.discriminator('Gestor', new mongoose.Schema({
    salario: { type: Number, required: true },
    departamento: { type: String, required: true },
    nivelAcesso: { type: Number, required: true, default: 1 },
    podeGerenciarUsuarios: { type: Boolean, default: false },
    podeConfigurarSistema: { type: Boolean, default: false },
}));

module.exports = { Usuario, Funcionario, Gestor };