
# Sistema de Gerenciamento de Chamados

Aplicação **Full Stack** completa (Back-end com Node.js + MongoDB + JWT, Front-end com React + Tailwind) para gestão de chamados entre **clientes** e **atendentes**, com recursos de autenticação, filtros dinâmicos, painel de estatísticas e controle de permissões.

## Funcionalidades

### **Back-end**
- Autenticação com **JWT**
- Controle de acesso por **roles**: `cliente` e `atendente`
- CRUD completo para:
  - **Usuários**
  - **Chamados**
- **Relacionamento entre usuários e chamados**
- **Paginação**, **busca por título** e **filtros por status**
- Painel de **estatísticas** com agrupamento por:
  - Status (aberto, em andamento, resolvido)
  - Cliente e Atendente
  - Data (por mês e ano)
- Exclusão de usuários com lógica inteligente (mantém chamados resolvidos e reseta os em andamento)
- Validações com **express-validator**
- Tratamento global de erros

### **Front-end**
- Login com persistência de token via localStorage
- Telas diferentes para **clientes** e **atendentes**
- Sistema de **cadastro de usuários** (por atendentes)
- Tela de **listar chamados** com:
  - Busca com **debounce**
  - Filtros por status
  - Filtro "Meus chamados"
  - Paginação
- Clientes podem:
  - Criar chamados
  - Listar seus próprios chamados separados por status
  - Excluir chamados abertos
- Atendentes podem:
  - Assumir chamados abertos
  - Resolver chamados
  - Ver todos os chamados com filtros
  - Cadastrar e excluir usuários
- **Painel de estatísticas** completo e dinâmico
- Interface moderna com **Tailwind CSS**
- UX otimizada para desktop

---

## Tecnologias Utilizadas

### Back-end
- Node.js
- Express.js
- MongoDB (Atlas) + Mongoose
- JWT (jsonwebtoken)
- Bcrypt.js
- Express-validator
- Dotenv

### Front-end
- React.js (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- Lucide Icons
- SweetAlert2 (modificado)
- Context API para autenticação

---

## Requisitos

- Node.js >= 18
- MongoDB Atlas com cluster e banco criados

---

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo-chamados.git
cd seu-repo-chamados
```

### 2. Back-end

```bash
cd backend
npm install
```

Crie um `.env` com:

```env
JWT_SECRET=sua_chave_secreta_aqui
MONGODB_URI=seu_link_mongodb
```

Depois rode:

```bash
cd backend
npm run dev
```

### 3. Front-end

```bash
cd frontend
npm install
npm run dev
```

---

## Scripts

### Back-end

```bash
npm run dev        # Inicia servidor com nodemon
```

### Front-end

```bash
npm run dev        # Inicia app React com Vite
```

---

## Estrutura de Pastas

```
backend/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── seeds/
│
frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   ├── api/
```

---


## Contribuição

Esse projeto foi desenvolvido para fins de estudo e demonstração de habilidades em aplicações full stack.

Contribuições são bem-vindas!

---

## Autor

Desenvolvido por **Otávio Soares Felicio**  
Contato: [otvio2018@outlook.com] | [LinkedIn](https://www.linkedin.com/in/otavio-soares-felicio/) | [GitHub](https://github.com/Otaviosoaresf)

---