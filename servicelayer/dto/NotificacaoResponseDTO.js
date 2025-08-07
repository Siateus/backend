class NotificacaoResponseDTO {
    constructor(notificacao) {
        if (!notificacao) {
            throw new Error('Objeto de notificação não pode ser nulo.');
        }
        this.id = notificacao.id || notificacao._id || ''; // Adicionado um valor padrão
        this.usuarioId = notificacao.usuario_id || '';
        this.tipoEvento = notificacao.tipo_evento || '';
        this.dataEvento = notificacao.data_evento || null; // Adicionado um valor padrão
        this.detalhes = notificacao.detalhes || '';
        this.status = notificacao.status || '';
    }
}
module.exports = NotificacaoResponseDTO;