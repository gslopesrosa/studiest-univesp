# Studiest — Backend API

App de consistência acadêmica com prova visual de estudo. Registre sessões, organize por disciplina, comprove com foto e acompanhe seu streak diário.

---

## Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express
- **ORM:** Prisma + PostgreSQL
- **Autenticação:** JWT + bcrypt
- **Validação:** Zod
- **Upload:** Multer + Cloudinary
- **Testes:** Jest + Supertest
- **Docs:** Swagger UI

---

## Pré-requisitos

- [Node.js](https://nodejs.org) >= 18
- [Docker](https://www.docker.com) e Docker Compose
- Conta no [Cloudinary](https://cloudinary.com) (gratuita)

---

## Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/jplimam/studiest-univesp.git
cd studiest-univesp
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

Edite o `.env`:

```env
# Banco de dados
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/studiest?schema=public"

# Servidor
PORT=3333

# JWT — use uma string longa e aleatória em produção
JWT_SECRET=troque_por_um_secret_seguro_aqui

# Cloudinary — encontre em cloudinary.com > Settings > API Keys
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

### 4. Suba o banco de dados com Docker

```bash
docker compose up -d
```

Isso sobe um container PostgreSQL na porta `5433`. Aguarde alguns segundos até o container estar saudável antes de continuar.

Para verificar se está rodando:

```bash
docker compose ps
```

### 5. Rode as migrations

```bash
npx prisma migrate dev
```

### 6. Inicie o servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

---

## Docker Compose

O arquivo `docker-compose.yml` na raiz do projeto:

```yaml
services:
  db:
    image: postgres:16
    container_name: studiest-postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: studiest
    ports:
      - "5433:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Para parar o banco:

```bash
docker compose down
```

Para parar e remover os dados:

```bash
docker compose down -v
```

---

## Documentação da API

Com o servidor rodando, acesse:

```
http://localhost:3333/docs
```

Para autenticar no Swagger UI:

1. Use `POST /auth/register` ou `POST /auth/login` para obter um token JWT
2. Clique em **Authorize** (canto superior direito)
3. Cole o token no campo `bearerAuth` e confirme
4. Todos os endpoints protegidos passam a enviar o header automaticamente

A spec em JSON (para importar no Postman ou Insomnia) está em:

```
http://localhost:3333/docs.json
```

---

## Endpoints

| Módulo      | Método   | Rota                                  |
| ----------- | -------- | ------------------------------------- |
| Auth        | `POST`   | `/auth/register`                      |
| Auth        | `POST`   | `/auth/login`                         |
| Auth        | `GET`    | `/auth/me`                            |
| Disciplinas | `POST`   | `/subjects`                           |
| Disciplinas | `GET`    | `/subjects`                           |
| Disciplinas | `PUT`    | `/subjects/:id`                       |
| Disciplinas | `DELETE` | `/subjects/:id`                       |
| Sessões     | `POST`   | `/study-sessions`                     |
| Sessões     | `GET`    | `/study-sessions`                     |
| Sessões     | `GET`    | `/study-sessions/:id`                 |
| Sessões     | `PUT`    | `/study-sessions/:id`                 |
| Sessões     | `DELETE` | `/study-sessions/:id`                 |
| Fotos       | `POST`   | `/study-sessions/:id/photos`          |
| Fotos       | `DELETE` | `/study-sessions/:id/photos/:photoId` |
| Dashboard   | `GET`    | `/dashboard/summary`                  |
| Dashboard   | `GET`    | `/dashboard/streak`                   |
| Dashboard   | `GET`    | `/dashboard/calendar`                 |
| Dashboard   | `GET`    | `/dashboard/subjects-ranking`         |

---

## Testes

### Configurar banco de teste

Crie um `.env.test` na raiz:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/studyrats_test"
JWT_SECRET=secret_para_testes
CLOUDINARY_CLOUD_NAME=fake
CLOUDINARY_API_KEY=fake
CLOUDINARY_API_SECRET=fake
PORT=3334
```

## Scripts disponíveis

| Script          | Descrição                                                |
| --------------- | -------------------------------------------------------- |
| `npm run dev`   | Inicia o servidor em modo desenvolvimento com hot-reload |
| `npm run build` | Compila TypeScript para JavaScript em `/dist`            |
| `npm start`     | Inicia o servidor compilado (produção)                   |

---

## Estrutura de pastas

```
src/
├── app.ts
├── server.ts
├── config/
│   ├── env.ts
│   └── swagger.ts
├── database/
│   └── prisma.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── upload.middleware.ts
├── modules/
│   ├── auth/
│   ├── subjects/
│   ├── study-sessions/
│   └── dashboard/
├── utils/
│   ├── appError.ts
│   ├── jwt.ts
│   └── password.ts

```

---

## Variáveis de ambiente

| Variável                | Descrição                        | Obrigatória |
| ----------------------- | -------------------------------- | ----------- |
| `DATABASE_URL`          | URL de conexão PostgreSQL        | Sim         |
| `JWT_SECRET`            | Secret para assinar tokens JWT   | Sim         |
| `PORT`                  | Porta do servidor (padrão: 3333) | Não         |
| `CLOUDINARY_CLOUD_NAME` | Cloud name do Cloudinary         | Sim         |
| `CLOUDINARY_API_KEY`    | API key do Cloudinary            | Sim         |
| `CLOUDINARY_API_SECRET` | API secret do Cloudinary         | Sim         |

---
# Frontend

Interface web da aplicação responsável pela visualização e registro das sessões de estudo.

---

### Stack

* React + TypeScript
* Vite
* React Router DOM
* Context API (Auth)
* Fetch API
* CSS customizado (dark theme)

---

### Funcionalidades

* Autenticação (login e registro)
* Dashboard com:

  *  Streak de estudos
  *  Resumo semanal/mensal
  *  Ranking de disciplinas
  *  Calendário
* Gerenciamento de disciplinas
* Registro de sessões de estudo
* Layout com menu lateral

---

###  Instalação e execução

1. Clone o repositório:

```bash
git clone https://github.com/jplimam/studiest-univesp.git
```
```bash
cd studiest-univesp/frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:3333
```

4. Execute o projeto:

```bash
npm run dev
```

---

### Acesso

A aplicação estará disponível em:

```
http://localhost:5173
```

---

### Estrutura do projeto

```
src/
  features/      # Funcionalidades organizadas por domínio
  main/          # Layout, rotas e estrutura principal
  shared/        # Componentes e utilitários reutilizáveis
  main.tsx       # Entry point da aplicação
```

---

### Observações

* O frontend depende do backend rodando em:

```
http://localhost:3333
```

* Certifique-se de iniciar o backend antes de rodar o frontend

