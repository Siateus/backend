const path = require('path');
const config = require('../config.js');
const IPontoController = require('./IPontoController');
const PontoDAO = require(path.join(__dirname, '..', 'persistencelayer', 'dao', config.PontoDAO));
const NotificacaoDAO = require(path.join(__dirname, '..', 'persistencelayer', 'dao', config.NotificacaoDAO));
const PontoResponseDTO = require(path.join(__dirname, '..', 'servicelayer', 'dto', config.PontoResponseDTO));
const { pontoUpdateSchema } = require(path.join(__dirname, '..', 'servicelayer', 'dto', config.PontoUpdateReq));
const csv = require('csv-parser');
const fs = require('fs');

const notificacaoDAO = new NotificacaoDAO();
const pontoDAO = new PontoDAO();

class PontoController extends IPontoController {

    async receberRegistroPontoCSV(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Nenhum arquivo CSV foi enviado.' });
            }
            if (req.user.tipo !== 'Gestor') {
                fs.unlinkSync(req.file.path);
                return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem fazer upload de pontos.' });
            }

            const pontos = [];
            fs.createReadStream(req.file.path)
                .pipe(csv())
                .on('data', (row) => {
                    const { data, horaEntrada, horaSaida, ...rest } = row;
                    const dataCompletaEntrada = `${data}T${horaEntrada}:00Z`;
                    const dataCompletaSaida = `${data}T${horaSaida}:00Z`;

                    pontos.push({
                        ...rest,
                        data: new Date(data),
                        horaEntrada: new Date(dataCompletaEntrada),
                        horaSaida: new Date(dataCompletaSaida),
                    });
                })
                .on('end', async () => {
                    try {
                        const novosPontos = await pontoDAO.createMany(pontos);

                        // AÇÃO: Gerar notificação para cada funcionário com pontos registrados
                        const usuariosNotificados = new Set();
                        for (const ponto of novosPontos) {
                            if (!usuariosNotificados.has(ponto.usuario_id.toString())) {
                                const notificacaoData = {
                                    usuario_id: ponto.usuario_id,
                                    tipo_evento: 'pontos_registrados',
                                    detalhes: `Um gestor fez o upload dos seus registros de ponto via CSV.`,
                                    status: 'pendente'
                                };
                                await notificacaoDAO.create(notificacaoData);
                                usuariosNotificados.add(ponto.usuario_id.toString());
                            }
                        }

                        const responseDtos = novosPontos.map(p => new PontoResponseDTO(p));
                        return res.status(201).json({
                            msgcode: '001',
                            pontos: responseDtos,
                            message: `${novosPontos.length} pontos registrados com sucesso.`
                        });
                    } catch (e) {
                        return res.status(500).json({ message: 'Erro ao processar o arquivo CSV: ' + e.message });
                    } finally {
                        // CORREÇÃO: Delete o arquivo temporário no bloco 'finally'
                        // Isso garante que o arquivo seja deletado após o try ou catch
                        fs.unlink(req.file.path, (err) => {
                            if (err) console.error('Erro ao deletar arquivo temporário:', err);
                            console.log('Arquivo temporário deletado:', req.file.path);
                        });
                    }
                });
        } catch (e) {
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;
            const ponto = await pontoDAO.findById(id);

            // Autorização: Gestor pode ver qualquer ponto, funcionário só pode ver os seus
            if (ponto && user.tipo !== 'Gestor' && ponto.usuario_id.toString() !== user.id) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar este ponto.' });
            }
            if (!ponto) {
                return res.status(404).json({ message: 'Ponto não encontrado.' });
            }
            const responseDto = new PontoResponseDTO(ponto);
            return res.status(200).json(responseDto);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;
            const { error, value } = pontoUpdateSchema.validate(req.body);

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const ponto = await pontoDAO.findById(id);
            if (ponto && user.tipo !== 'Gestor') {
                return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem atualizar pontos.' });
            }
            const pontoAtualizado = await pontoDAO.update(id, value);

            if (!pontoAtualizado) {
                return res.status(404).json({ message: 'Ponto não encontrado.' });
            }
            // AÇÃO: Gerar notificação para o funcionário sobre a atualização do ponto
            const notificacaoData = {
                usuario_id: pontoAtualizado.usuario_id,
                tipo_evento: 'ponto_atualizado',
                detalhes: `Um gestor atualizou seu registro de ponto.`,
                status: 'pendente'
            };
            await notificacaoDAO.create(notificacaoData);

            const responseDto = new PontoResponseDTO(pontoAtualizado);
            return res.status(200).json(responseDto);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;
            const ponto = await pontoDAO.findById(id);
            if (ponto && user.tipo !== 'Gestor') {
                return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem deletar pontos.' });
            }
            const sucesso = await pontoDAO.delete(id);

            if (!sucesso) {
                return res.status(404).json({ message: 'Ponto não encontrado.' });
            }
            const notificacaoData = {
                usuario_id: ponto.usuario_id,
                tipo_evento: 'ponto_deletado',
                detalhes: `Um gestor deletou seu registro de ponto.`,
                status: 'pendente'
            };
            await notificacaoDAO.create(notificacaoData);

            return res.status(200).json({ msgcode: '003', message: 'Ponto deletado com sucesso.' });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async findByUsuarioId(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;
            // Autorização: Gestor pode ver qualquer usuário, funcionário só pode ver os seus
            if (user.tipo !== 'Gestor' && user.id !== id) {
                return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar estes pontos.' });
            }
            const pontos = await pontoDAO.findByUsuarioId(id);
            const responseDtos = pontos.map(p => new PontoResponseDTO(p));
            return res.status(200).json(responseDtos);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async findByUsuarioIdAndPeriodo(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;
            const { dataInicio, dataFim } = req.query;
            // Autorização: Gestor pode ver qualquer usuário, funcionário só pode ver os seus
            if (user.tipo !== 'Gestor' && user.id !== id) {
                return res.status(403).json({ message: 'Acesso negado.' });
            }
            if (!dataInicio || !dataFim) {
                return res.status(400).json({ message: 'Os parâmetros dataInicio e dataFim são obrigatórios.' });
            }
            const pontos = await pontoDAO.findByUsuarioIdAndPeriodo(id, dataInicio, dataFim);
            const responseDtos = pontos.map(p => new PontoResponseDTO(p));
            return res.status(200).json(responseDtos);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async findAll(req, res) {
        try {
            const { user } = req;
            // Autorização: Apenas gestores podem listar todos os pontos
            if (user.tipo !== 'Gestor') {
                return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem visualizar todos os pontos.' });
            }
            const pagina = parseInt(req.query.pagina) || 1;
            const tamanhoPagina = parseInt(req.query.tamanhoPagina) || 10;
            const pontos = await pontoDAO.findAll(pagina, tamanhoPagina);
            const responseDtos = pontos.map(p => new PontoResponseDTO(p));
            return res.status(200).json({
                pontos: responseDtos,
                paginaAtual: pagina,
                tamanhoPagina: tamanhoPagina,
            });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async findByUsuarioIdWithPagination(req, res) {
        try {
            const { id } = req.params;
            const { user } = req;
            // Autorização: Gestor pode ver qualquer usuário, funcionário só pode ver os seus
            if (user.tipo !== 'Gestor' && user.id !== id) {
                return res.status(403).json({ message: 'Acesso negado.' });
            }
            const pagina = parseInt(req.query.pagina) || 1;
            const tamanhoPagina = parseInt(req.query.tamanhoPagina) || 10;
            const pontos = await pontoDAO.findByUsuarioIdWithPagination(id, pagina, tamanhoPagina);
            const responseDtos = pontos.map(p => new PontoResponseDTO(p));
            return res.status(200).json({
                pontos: responseDtos,
                paginaAtual: pagina,
                tamanhoPagina: tamanhoPagina,
            });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
}

module.exports = PontoController;