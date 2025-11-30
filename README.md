# AV3 - Projeto Aerocode

Aplicação web full-stack desenvolvida para a avaliação AV3 da FATEC. O projeto unifica trabalhos anteriores com integração real de banco de dados usando Prisma ORM e MySQL, apresentando um **Dashboard Completo** para Gestão de Aeronaves e **Monitoramento de Performance**.

## 🚀 Guia Rápido (Quick Start)

### 1\. Clonar o Repositório

```bash
git clone https://github.com/JoaooMoura/AV3.git
cd AV3/aerocode-av3
```

### 2\. Configurar o Banco de Dados (MySQL)

Antes de rodar o código, você precisa preparar o seu banco de dados:

1.  **Inicie o MySQL:** Certifique-se de que o serviço do MySQL está rodando (via XAMPP, Workbench, Docker ou Serviço do Windows).
2.  **Crie o Banco:** Abra seu gerenciador (ex: MySQL Workbench) e crie um schema vazio chamado `aerocode`:
    ```sql
    CREATE DATABASE aerocode;
    ```
3.  **Configure a Conexão:**
      * Vá até a pasta `backend/`.
      * Crie um arquivo `.env` (baseado no `.env.example`).
      * Edite a `DATABASE_URL` com seu usuário e senha do MySQL:
    <!-- end list -->
    ```env
    DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/aerocode"
    ```

### 3\. Iniciar o Backend (Porta 3000)

No terminal, dentro da pasta `backend/`:

```bash
npm install

# Cria as tabelas no banco que você acabou de criar
npx prisma migrate dev --name init

# Popula o banco com usuários e dados iniciais
npx prisma db seed

# Inicia o servidor
npm run dev
```

### 4\. Iniciar o Frontend (Porta 5173)

Em outro terminal, dentro da pasta `frontend/`:

```bash
npm install
npm run dev
```

Acesse a aplicação em **http://localhost:5173**

-----

## 👤 Credenciais de Acesso

Utilize estes usuários já cadastrados pelo sistema:

| Função | Usuário | Senha | Permissões |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin` | `admin123` | Acesso Total (Criar, Editar, Excluir) |
| **Engenheiro** | `engenheiro` | `eng123` | Gerenciar (Sem Excluir) |
| **Operador** | `operador` | `op123` | Visualizar e Executar Tarefas |

-----

## 📁 Estrutura do Projeto

```text
aerocode-av3/
├── backend/           # Node.js + TypeScript + Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/ (Métricas de Performance)
│   │   └── routes/
│   ├── prisma/        # Schema do Banco & Seeds
│   └── tests/         # Scripts de Teste de Carga
└── frontend/          # React + JavaScript (.jsx) + Vite
    ├── src/
    │   ├── components/ (Modals, Gráficos)
    │   ├── pages/
    │   ├── services/   (Configuração Axios)
    │   └── styles/     (CSS Customizado - Dark Theme)
```

## 🌟 Funcionalidades Principais

  * **Gestão de Aeronaves:** CRUD completo para aeronaves, peças e etapas de manutenção.
  * **Relatórios em PDF:** Geração automática de relatórios técnicos com download direto.
  * **Monitoramento de Performance:** Middleware que mede Latência, Tempo de Processamento e Resposta em tempo real.
  * **Testes de Carga:** Script automatizado (`tests/loadTest.js`) para simular 1, 5 e 10 usuários simultâneos.
  * **Dashboard:** Gráficos interativos utilizando a biblioteca `Recharts`.

-----

## 🔧 Comandos Úteis

**Backend (`/backend`):**

  * `npm run dev`: Roda o servidor em modo de desenvolvimento.
  * `npx prisma studio`: Abre uma interface visual para ver o banco de dados.
  * `node tests/loadTest.js`: Executa o teste de estresse/performance.

**Frontend (`/frontend`):**

  * `npm run dev`: Roda o front.

-----

## 🔍 Tecnologias Utilizadas

  * **Frontend:** React, Vite, Axios, Recharts, CSS Modules.
  * **Backend:** Node.js, Express, TypeScript, Prisma ORM.
  * **Banco de Dados:** MySQL.
  * **Outros:** PDFKit (Relatórios), BCrypt (Segurança), JWT (Autenticação).

-----

## 📞 Suporte

**Repositório:** JoaooMoura/AV3
**Autor:** João Vitor de Moura (Estudante FATEC)
