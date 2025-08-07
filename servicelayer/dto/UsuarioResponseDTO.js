class UsuarioResponseDTO {
    constructor(usuario) {
        if (!usuario) {
            throw new Error('Objeto de usuário não pode ser nulo.');
        }
        this.id = usuario.id || usuario._id;
        this.nome = usuario.nome;
        this.email = usuario.email;
        this.cpf = usuario.cpf;
        this.cargo = usuario.cargo;
        this.status = usuario.status;
        this.tipo = usuario.tipo;
        // Adiciona propriedades de subclasses se existirem
        if (usuario.salario) this.salario = usuario.salario;
        if (usuario.departamento) this.departamento = usuario.departamento;
        if (usuario.nivelAcesso) this.nivelAcesso = usuario.nivelAcesso;
    }
}
module.exports = UsuarioResponseDTO;