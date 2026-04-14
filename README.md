# 🌐 Orkut API — Documentação

API RESTful que simula a rede social Orkut. Desenvolvida com **Node.js** e **Express.js**, utilizando **bcrypt** para criptografia de senhas e **JWT** para autenticação.

Link da documentação no Postman: https://documenter.getpostman.com/view/52849267/2sBXqCNP3s

---

## 📋 Informações Gerais

| Item         | Detalhe                 |
| ------------ | ----------------------- |
| Base URL     | `http://localhost:3000` |
| Autenticação | Bearer Token (JWT)      |
| Formato      | JSON                    |

---

## 🔐 Autenticação

As rotas protegidas exigem um token JWT no cabeçalho da requisição:

```
Authorization: Bearer <token>
```

O token é obtido ao realizar o login com sucesso e expira em **1 hora**.

---

## 👤 Usuários

### Criar Usuário

Cadastra um novo usuário na plataforma. A senha é armazenada com criptografia **bcrypt**.

```
POST /usuarios
```

**Body (JSON):**

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "minhasenha123"
}
```

**Resposta de Sucesso — `201 Created`:**

```json
{
  "mensagem": "Usuário criado com sucesso.",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

**Erros possíveis:**

| Código | Motivo                                    |
| ------ | ----------------------------------------- |
| `400`  | Campos obrigatórios ausentes ou inválidos |
| `500`  | Erro interno ao criar usuário             |

---

### Login do Usuário

Autentica o usuário e retorna um token JWT.

```
POST /login
```

**Body (JSON):**

```json
{
  "email": "joao@email.com",
  "senha": "minhasenha123"
}
```

**Resposta de Sucesso — `200 OK`:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros possíveis:**

| Código | Motivo                   |
| ------ | ------------------------ |
| `400`  | Usuário não encontrado   |
| `400`  | Senha incorreta          |
| `500`  | Erro interno do servidor |

---

### Listar Usuários

Retorna todos os usuários cadastrados na plataforma.

```
GET /usuarios
```

**Resposta de Sucesso — `200 OK`:**

```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  },
  {
    "id": 2,
    "nome": "Maria Souza",
    "email": "maria@email.com"
  }
]
```

**Erros possíveis:**

| Código | Motivo                          |
| ------ | ------------------------------- |
| `500`  | Erro interno ao buscar usuários |

---

## 📝 Posts

### Listar Posts

Retorna todos os posts em ordem do mais recente para o mais antigo, com as informações do autor. As datas são formatadas no padrão **brasileiro (dd/mm/aaaa)**.

```
GET /posts
```

**Resposta de Sucesso — `200 OK`:**

```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "titulo": "Saudades do Orkut",
    "conteudo": "Quem lembra dos scraps?",
    "criado_em": "15/01/2024",
    "post_numero": 1
  }
]
```

**Erros possíveis:**

| Código | Motivo                           |
| ------ | -------------------------------- |
| `500`  | Erro interno ao buscar postagens |

---

### Criar Post

Cria um novo post associado ao usuário autenticado.

```
POST /posts
```

> 🔒 **Rota protegida** — requer token JWT.

**Body (JSON):**

```json
{
  "titulo": "Meu primeiro post",
  "conteudo": "Saudades do Orkut! 🌟"
}
```

**Resposta de Sucesso — `201 Created`:**

```json
{
  "mensagem": "Post criado com sucesso!",
  "post": {
    "id": 1,
    "titulo": "Meu primeiro post",
    "conteudo": "Saudades do Orkut! 🌟",
    "usuario_id": 1,
    "criado_em": "2024-01-15T10:30:00.000Z"
  }
}
```

**Erros possíveis:**

| Código | Motivo                                    |
| ------ | ----------------------------------------- |
| `400`  | Campos obrigatórios ausentes ou inválidos |
| `401`  | Token ausente ou inválido                 |
| `500`  | Erro interno ao criar postagem            |

---

### Editar Post

Atualiza o título e o conteúdo de um post. Somente o autor do post pode editá-lo.

```
PUT /posts/:id
```

> 🔒 **Rota protegida** — requer token JWT.

**Parâmetros de rota:**

| Parâmetro | Tipo     | Descrição  |
| --------- | -------- | ---------- |
| `id`      | `number` | ID do post |

**Body (JSON):**

```json
{
  "titulo": "Título atualizado",
  "conteudo": "Conteúdo atualizado ✏️"
}
```

**Resposta de Sucesso — `200 OK`:**

```json
{
  "mensagem": "Post atualizado com sucesso!",
  "post": {
    "id": 1,
    "titulo": "Título atualizado",
    "conteudo": "Conteúdo atualizado ✏️",
    "usuario_id": 1,
    "criado_em": "2024-01-15T10:30:00.000Z"
  }
}
```

**Erros possíveis:**

| Código | Motivo                                    |
| ------ | ----------------------------------------- |
| `400`  | Campos obrigatórios ausentes ou inválidos |
| `401`  | Token ausente ou inválido                 |
| `403`  | Usuário não é o autor do post             |
| `404`  | Post não encontrado                       |
| `500`  | Falha ao atualizar o post                 |

---

### Deletar Post

Remove um post permanentemente. Somente o autor do post pode deletá-lo.

```
DELETE /posts/:id
```

> 🔒 **Rota protegida** — requer token JWT.

**Parâmetros de rota:**

| Parâmetro | Tipo     | Descrição  |
| --------- | -------- | ---------- |
| `id`      | `number` | ID do post |

**Resposta de Sucesso — `202 Accepted`:**

```json
{
  "mensagem": "Post deletado com sucesso!",
  "post": {
    "id": 1,
    "titulo": "Meu primeiro post",
    "conteudo": "Saudades do Orkut! 🌟",
    "usuario_id": 1,
    "criado_em": "2024-01-15T10:30:00.000Z"
  }
}
```

**Erros possíveis:**

| Código | Motivo                        |
| ------ | ----------------------------- |
| `401`  | Token ausente ou inválido     |
| `403`  | Usuário não é o autor do post |
| `404`  | Post não encontrado           |
| `500`  | Erro interno ao deletar post  |

---

## 📌 Resumo das Rotas

| Método   | Rota         | Descrição        | Autenticação |
| -------- | ------------ | ---------------- | ------------ |
| `POST`   | `/usuarios`  | Criar usuário    | ❌           |
| `POST`   | `/login`     | Login do usuário | ❌           |
| `GET`    | `/usuarios`  | Listar usuários  | ❌           |
| `GET`    | `/posts`     | Listar posts     | ❌           |
| `POST`   | `/posts`     | Criar post       | ✅           |
| `PUT`    | `/posts/:id` | Editar post      | ✅           |
| `DELETE` | `/posts/:id` | Deletar post     | ✅           |

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** — Runtime JavaScript
- **Express.js** — Framework web
- **PostgreSQL** — Banco de dados (via `pg` pool)
- **bcrypt** — Criptografia de senhas
- **JWT (JSON Web Token)** — Autenticação stateless
- **dotenv** — Gerenciamento de variáveis de ambiente
- **cors** — Habilitação de requisições cross-origin
