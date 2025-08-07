const IUsuarioDAO = require('./IUsuarioDAO');
const { Usuario, Funcionario, Gestor } = require('../models/Usuario');
const bcrypt = require('bcryptjs');

class UsuarioDAO extends IUsuarioDAO {

    async create(dadosUsuario) {
        try {
            const { tipo, password, ...rest } = dadosUsuario;

            let novoUsuario;
            if (tipo === 'Funcionario') {
                novoUsuario = new Funcionario({ ...rest, password });
            } else if (tipo === 'Gestor') {
                novoUsuario = new Gestor({ ...rest, password });
            } else {
                novoUsuario = new Usuario({ ...rest, password });
            }

            await novoUsuario.save();
            return novoUsuario;
        } catch (error) {
            if (error.code === 11000) {
                throw new Error('E-mail ou CPF já cadastrado.');
            }
            throw new Error('Erro ao criar usuário: ' + error.message);
        }
    }

    async findById(id) {
        return await Usuario.findById(id);
    }

    async findByEmail(email) {
        return await Usuario.findOne({ email });
    }

    async findAll() {
        return await Usuario.find({});
    }

    async update(id, dadosUsuario) {
        try {
            const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, dadosUsuario, { new: true, runValidators: true });
            return usuarioAtualizado;
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new Error(error.message);
            }
            throw new Error('Erro na atualização do usuário: ' + error.message);
        }
    }

    async delete(id) {
        const result = await Usuario.findByIdAndDelete(id);
        return !!result;
    }

    async autenticar(email, password) {
        const usuario = await this.findByEmail(email);
        if (!usuario) {
            return null;
        }

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return null;
        }

        return usuario;
    }
}

module.exports = UsuarioDAO;