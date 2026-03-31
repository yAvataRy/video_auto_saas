# Documentação da API

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Autenticação](#autenticação)
- [Endpoints de Projetos](#endpoints-de-projetos)
- [Tratamento de Erros](#tratamento-de-erros)
- [Exemplos](#exemplos)

## Visão Geral

VideoAI fornece uma API RESTful para gerenciamento de projetos de vídeo. Todos os endpoints requerem autenticação via Supabase.

### Base URL

```
http://localhost:3000/api
# ou em produção
https://sua-domain.com/api
```

### Headers Necessários

```
Content-Type: application/json
Authorization: Bearer {seu-token-supabase}
```

## Autenticação

A API usa autenticação via Supabase Auth. Todos os endpoints requerem um token JWT válido.

### Obter Token

Após login bem-sucedido via Supabase Auth, você receberá um token JWT que deve ser incluído em todas as requisições.

```typescript
const { data } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password",
});

const token = data.session?.access_token;
```

### Incluir em Requisições

```bash
curl -H "Authorization: Bearer {token}" \
  http://localhost:3000/api/projects
```

## Endpoints de Projetos

### GET /api/projects

Retorna lista de projetos do usuário autenticado.

**Autenticação**: Requerida  
**Método**: GET  
**Status Sucesso**: 200

**Response:**

```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "name": "Meu Projeto",
    "niche": "technology",
    "description": "Descrição do projeto",
    "status": "active",
    "created_at": "2024-03-31T10:00:00Z",
    "updated_at": "2024-03-31T10:00:00Z"
  }
]
```

**Exemplo:**

```bash
curl -H "Authorization: Bearer {token}" \
  http://localhost:3000/api/projects
```

---

### POST /api/projects

Cria um novo projeto.

**Autenticação**: Requerida  
**Método**: POST  
**Status Sucesso**: 201

**Body:**

```json
{
  "name": "Novo Projeto",
  "niche": "technology",
  "description": "Descrição opcional",
  "status": "draft"
}
```

**Response:**

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "name": "Novo Projeto",
  "niche": "technology",
  "description": "Descrição opcional",
  "status": "draft",
  "created_at": "2024-03-31T10:00:00Z",
  "updated_at": "2024-03-31T10:00:00Z"
}
```

**Validações:**

- `name`: string, obrigatório, mín 3 caracteres
- `niche`: string, obrigatório
- `description`: string, opcional
- `status`: enum ['active', 'draft', 'archived']

**Exemplo:**

```bash
curl -X POST \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"name":"Novo Projeto","niche":"tech","status":"draft"}' \
  http://localhost:3000/api/projects
```

---

### GET /api/projects/:id

Retorna um projeto específico.

**Autenticação**: Requerida  
**Método**: GET  
**Status Sucesso**: 200  
**Status Erro**: 404 (não encontrado), 403 (não autorizado)

**Response:**

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "name": "Meu Projeto",
  "niche": "technology",
  "description": "Descrição do projeto",
  "status": "active",
  "created_at": "2024-03-31T10:00:00Z",
  "updated_at": "2024-03-31T10:00:00Z"
}
```

**Exemplo:**

```bash
curl -H "Authorization: Bearer {token}" \
  http://localhost:3000/api/projects/123e4567-e89b-12d3-a456-426614174000
```

---

### PUT /api/projects/:id

Atualiza um projeto existente.

**Autenticação**: Requerida  
**Método**: PUT  
**Status Sucesso**: 200  
**Status Erro**: 404 (não encontrado), 403 (não autorizado)

**Body:**

```json
{
  "name": "Nome Atualizado",
  "niche": "finance",
  "description": "Nova descrição",
  "status": "active"
}
```

**Response:**

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "name": "Nome Atualizado",
  "niche": "finance",
  "description": "Nova descrição",
  "status": "active",
  "created_at": "2024-03-31T10:00:00Z",
  "updated_at": "2024-03-31T11:30:00Z"
}
```

**Validações:**

- Mínimo 1 campo deve ser fornecido
- Mesmas validações do POST se campo for incluído

**Exemplo:**

```bash
curl -X PUT \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"status":"active","niche":"finance"}' \
  http://localhost:3000/api/projects/123e4567-e89b-12d3-a456-426614174000
```

---

### DELETE /api/projects/:id

Deleta um projeto.

**Autenticação**: Requerida  
**Método**: DELETE  
**Status Sucesso**: 204 (No Content)  
**Status Erro**: 404 (não encontrado), 403 (não autorizado)

**Response:**

```
204 No Content
```

**Exemplo:**

```bash
curl -X DELETE \
  -H "Authorization: Bearer {token}" \
  http://localhost:3000/api/projects/123e4567-e89b-12d3-a456-426614174000
```

## Tratamento de Erros

### Formato de Erro Padrão

```json
{
  "statusCode": 400,
  "message": "Descrição do erro",
  "error": "ERROR_CODE"
}
```

### Códigos de Status HTTP

| Status | Significado                                                                |
| ------ | -------------------------------------------------------------------------- |
| 200    | OK - Requisição bem-sucedida                                               |
| 201    | Created - Recurso criado com sucesso                                       |
| 204    | No Content - Sucesso sem conteúdo de resposta                              |
| 400    | Bad Request - Dados inválidos                                              |
| 401    | Unauthorized - Não autenticado                                             |
| 403    | Forbidden - Não autorizado (ex: tentando acessar projeto de outro usuário) |
| 404    | Not Found - Recurso não encontrado                                         |
| 500    | Internal Server Error - Erro no servidor                                   |

### Exemplos de Erros

**Não Autenticado:**

```json
{
  "statusCode": 401,
  "message": "Usuário não autenticado",
  "error": "UNAUTHORIZED"
}
```

**Validação Falhou:**

```json
{
  "statusCode": 400,
  "message": "Nome deve ter no mínimo 3 caracteres",
  "error": "VALIDATION_ERROR"
}
```

**Não Encontrado:**

```json
{
  "statusCode": 404,
  "message": "Projeto não encontrado",
  "error": "NOT_FOUND"
}
```

**Não Autorizado:**

```json
{
  "statusCode": 403,
  "message": "Você não tem permissão para acessar este projeto",
  "error": "FORBIDDEN"
}
```

## Exemplos

### Exemplo Completo: Criar e Listar Projetos

```typescript
import { useAuth } from "~/composables/useAuth";
import { useProjects } from "~/composables/useProjects";

export default defineComponent({
  setup() {
    const { session } = useAuth();
    const { projects, createProject, fetchProjects } = useProjects();

    const handleCreateProject = async () => {
      const newProject = await createProject({
        name: "Novo Projeto",
        niche: "technology",
        description: "Um projeto incrível",
        status: "draft",
      });

      console.log("Projeto criado:", newProject);
    };

    onMounted(async () => {
      await fetchProjects();
      console.log("Projetos:", projects.value);
    });

    return {
      handleCreateProject,
      projects,
    };
  },
});
```

### Exemplo com Fetch API

```javascript
// Criar projeto
const response = await fetch("/api/projects", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: "Novo Projeto",
    niche: "technology",
    status: "draft",
  }),
});

if (!response.ok) {
  const error = await response.json();
  console.error("Erro:", error.message);
  return;
}

const project = await response.json();
console.log("Criado:", project);
```

### Exemplo com Axios

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Listar
const { data: projects } = await api.get("/projects");

// Criar
const { data: newProject } = await api.post("/projects", {
  name: "Novo Projeto",
  niche: "technology",
  status: "draft",
});

// Atualizar
const { data: updated } = await api.put(`/projects/${id}`, {
  status: "active",
});

// Deletar
await api.delete(`/projects/${id}`);
```

## Rate Limiting

Atualmente a API não possui rate limiting implementado. Limitar requisições apropriadamente em seu cliente.

## Changelog

### v1.0.0 (2024-03-31)

- Endpoints iniciais de projetos
- Autenticação com Supabase
- Validação de dados
- Row Level Security

## Suporte

Para questões ou problemas com a API, abra uma issue no repositório.
