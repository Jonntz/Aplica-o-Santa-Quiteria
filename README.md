# ⛪ Plataforma Paróquia Santa Quitéria

Sistema completo de gestão e portal público para a Paróquia Santa Quitéria, desenvolvido em arquitetura Monorepo. O projeto inclui uma API REST segura, um painel administrativo com controle de acesso (RBAC) e um site público dinâmico.

## 🚀 Tecnologias Utilizadas

**Backend:**
* Node.js com Express
* TypeScript
* Prisma ORM
* PostgreSQL (via Docker)
* Autenticação JWT (com Refresh Tokens)
* Bcryptjs para criptografia

**Frontend (Admin & Site Público):**
* React 18 + Vite
* TypeScript
* Tailwind CSS (Estilização e Design System)
* React Query (Gerenciamento de estado e cache de API)
* React Router DOM (Roteamento)
* Lucide React (Ícones)

## 📁 Estrutura do Projeto

O projeto está dividido em três partes principais:

* `/backend`: API RESTful responsável pela regra de negócio e banco de dados.
* `/frontend-admin`: Painel de controle privado (Dashboard, Gestão de Eventos e Usuários).
* `/frontend-site`: Portal público acessado pelos fiéis (Liturgia diária, Horários, Comunidades).
