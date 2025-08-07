const jwt = require('jsonwebtoken');

// A chave secreta deve ser a mesma usada para assinar o token no login
// IMPORTANTE: Em um ambiente de produção, esta chave deve vir de uma variável de ambiente!
const JWT_SECRET = 'seu-segredo-super-secreto';

const authMiddleware = (req, res, next) => {
    // 1. Obter o token do cabeçalho da requisição
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Se o token estiver ausente ou mal formatado, nega o acesso
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido ou inválido.' });
    }

    const token = authHeader.split(' ')[1]; // Extrai o token após "Bearer "

    try {
        // 2. Verificar o token com a chave secreta
        const decoded = jwt.verify(token, JWT_SECRET);

        // 3. Adicionar as informações do usuário (payload) ao objeto de requisição
        // Isso permite que o controller acesse 'req.user'
        req.user = decoded;

        // 4. Se o token for válido, a requisição continua para a próxima função (o controller)
        next();
    } catch (error) {
        // Se a verificação falhar (token expirado, assinatura inválida), nega o acesso
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

module.exports = authMiddleware;