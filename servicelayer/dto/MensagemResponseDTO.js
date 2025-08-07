class MensagemResponseDTO {
    constructor(mensagem) {
        this.id = mensagem.id || mensagem._id;
        this.remetenteId = mensagem.remetente;
        this.destinatarioId = mensagem.destinatario;
        this.conteudo = mensagem.conteudo;
        this.dataEnvio = mensagem.dataEnvio;
    }
}

module.exports = MensagemResponseDTO;