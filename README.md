# 📦 Sistema de Gestão de Pontos (SGP)

**Autor:** Matheus Silva Pinheiro  


---

## 1️⃣ Visão Geral da Arquitetura da Aplicação

O BackEnd do SGP foi desenvolvido com uma arquitetura **modular e escalável**, baseada no padrão **Controller-DAO-DTO-Routes**, garantindo:

- Separação de responsabilidades
- Facilidade de manutenção
- Segurança aprimorada
- Testabilidade eficiente

### 🔹 Camadas da Arquitetura

- **Rotas (ServicesLayer):** Mapeiam requisições HTTP para os métodos dos controladores.
- **Controllers (PersistenceLayer):** Contêm a lógica de negócio e regras de autorização.
- **DAOs (Data Access Object):** Isolam a lógica de interação com o banco de dados (MongoDB via Mongoose).
- **Modelos (Mongoose):** Schemas que definem estrutura e comportamento dos dados.

---

## 2️⃣ Implementação das Rotas REST

As rotas estão organizadas por módulo para facilitar a visualização do projeto.

### 👤 Módulo de Usuários

| Método | Rota | Função | Segurança |
|--------|------|--------|-----------|
| POST   | `/api/usuarios` | Criação de usuário (Funcionário ou Gestor) | Pública |
| POST   | `/api/usuarios/login` | Autenticação e retorno de token JWT | Pública |
| GET    | `/api/usuarios` | Listar todos os usuários | Protegida (Gestores) |
| GET    | `/api/usuarios/:id` | Buscar perfil por ID | Protegida (Próprio usuário ou Gestor) |
| PUT    | `/api/usuarios/:id` | Atualizar perfil | Protegida (Próprio usuário ou Gestor) |
| DELETE | `/api/usuarios/:id` | Deletar usuário | Protegida (Gestores) |

---

### ⏱️ Módulo de Pontos

| Método | Rota | Função | Segurança |
|--------|------|--------|-----------|
| POST   | `/api/pontos/upload-csv` | Upload de registros via CSV | Protegida (Gestores) |
| GET    | `/api/pontos/usuario/:id` | Buscar pontos por usuário | Protegida (Próprio usuário ou Gestor) |
| GET    | `/api/pontos` | Listar todos os pontos | Protegida (Gestores) |

---

### 💬 Módulo de Mensagens

| Método | Rota | Função | Segurança |
|--------|------|--------|-----------|
| POST   | `/api/mensagens` | Enviar mensagem | Protegida (Remetente) |
| GET    | `/api/mensagens/enviadas/:id` | Ver mensagens enviadas | Protegida (Próprio usuário ou Gestor) |
| GET    | `/api/mensagens/caixa-entrada/:id` | Ver mensagens recebidas | Protegida (Próprio usuário ou Gestor) |
| PUT    | `/api/mensagens/:id` | Atualizar mensagem | Protegida (Remetente) |
| DELETE | `/api/mensagens/:id` | Deletar mensagem | Protegida (Remetente) |

---

### 🔔 Módulo de Notificações

| Método | Rota | Função | Segurança |
|--------|------|--------|-----------|
| GET    | `/api/notificacoes/usuario/:id` | Ver notificações do usuário | Protegida (Próprio usuário ou Gestor) |
| GET    | `/api/notificacoes` | Listar todas as notificações | Protegida (Gestores) |
| PUT    | `/api/notificacoes/:id` | Atualizar status da notificação | Protegida (Gestores) |
| DELETE | `/api/notificacoes/:id` | Deletar notificação | Protegida (Gestores) |

---

## 3️⃣ Segurança e Autenticação com JWT

A segurança do sistema é implementada em dois níveis:

- **Autenticação:** Middleware `authMiddleware` verifica a validade do token JWT.
- **Autorização:** Controladores usam `req.user` para aplicar regras de acesso:
    - Gestores têm acesso administrativo.
    - Funcionários têm acesso restrito aos próprios dados.

---

## 4️⃣ Estrutura dos Artefatos de Código

- `index.js`: Ponto de entrada e configuração do servidor.
- `authMiddleware.js`: Middleware de autenticação JWT.
- `[Module]Routes.js`: Define os endpoints da API.
- `[Module]Controller.js`: Lógica de negócio e autorização.
- `[Module]DAO.js`: Interface de acesso ao MongoDB.
- **Modelos (Usuario, Ponto, etc.):** Schemas definidos com Mongoose.

---

