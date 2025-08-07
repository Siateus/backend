// persistencelayer/DAO/IUsuarioDAO.js

class IUsuarioDAO {
    create(usuario) {}

    findById(id) {}

    findByEmail(email) {}

    findAll() {}

    update(usuario) {}

    delete(id) {}

    autenticar(email, password) {}
}

module.exports = IUsuarioDAO;