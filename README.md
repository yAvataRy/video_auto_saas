# VideoAI - Video Automation SaaS Platform

Uma plataforma SaaS completa para automação de criação de vídeos curtos (TikTok/Shorts) construída com **Nuxt 3**, **Vue 3**, **TypeScript**, **Pinia**, **Supabase** e **Tailwind CSS**.

## 🎯 Visão Geral

VideoAI é uma plataforma de automação de vídeos que permite aos usuários:

- ✅ Autenticação segura com Supabase
- ✅ Dashboard protegido com layout responsivo
- ✅ Gerenciamento completo de projetos (CRUD)
- ✅ Sistema de tipos TypeScript em strict mode
- ✅ Arquitetura escalável e modular
- ✅ Composables para separação de responsabilidades
- ✅ Pinia stores para gerenciamento de estado
- ✅ API routes com Nuxt server

## 📋 Requisitos

- Node.js 18+
- pnpm 8+ (ou npm/yarn)
- Conta Supabase

## 🚀 Quick Start

### 1. Clonar o Repositório

```bash
git clone <repository-url>
cd video-automation-saas
```

### 2. Instalar Dependências

```bash
pnpm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-anon
```

Obtenha essas credenciais no [Supabase Dashboard](https://app.supabase.com).

### 4. Executar o Servidor de Desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura de Pastas

```
video-automation-saas/
├── app.vue                    # Componente raiz
├── nuxt.config.ts            # Configuração Nuxt
├── tsconfig.json             # Configuração TypeScript
├── tailwind.config.ts        # Configuração Tailwind
├── postcss.config.ts         # Configuração PostCSS
│
├── assets/
│   └── main.css              # Estilos globais
│
├── components/               # Componentes reutilizáveis
│
├── composables/
│   ├── useAuth.ts            # Lógica de autenticação
│   └── useProjects.ts        # Lógica de projetos
│
├── layouts/
│   ├── default.vue           # Layout principal (com sidebar)
│   └── auth.vue              # Layout de autenticação
│
├── middleware/
│   ├── auth.ts               # Proteção de rotas privadas
│   └── guest.ts              # Bloqueia usuários autenticados
│
├── pages/
│   ├── index.vue             # Landing page
│   ├── login.vue             # Página de login
│   ├── register.vue          # Página de registro
│   ├── dashboard/
│   │   └── index.vue         # Dashboard
│   ├── projects/
│   │   ├── index.vue         # Lista de projetos
│   │   └── [id].vue          # Detalhes do projeto
│   └── settings/
│       └── index.vue         # Configurações
│
├── plugins/
│   └── supabase.client.ts    # Plugin Supabase
│
├── server/
│   └── api/
│       └── projects/
│           ├── index.get.ts  # GET /api/projects
│           ├── index.post.ts # POST /api/projects
│           ├── [id].get.ts   # GET /api/projects/:id
│           └── [id].delete.ts # DELETE /api/projects/:id
│
├── stores/
│   ├── auth.ts               # Pinia store de autenticação
│   └── project.ts            # Pinia store de projetos
│
├── types/
│   └── index.ts              # Interfaces TypeScript
│
└── utils/                    # Funções utilitárias
```

## 🔐 Sistema de Autenticação

### Fluxo de Autenticação

1. **Login/Registro**: Usuário se autentica via Supabase
2. **Sessão**: Sessão é persistida no localStorage
3. **Middleware**: Rotas privadas são protegidas por middleware
4. **Composable**: `useAuth()` fornece métodos de login/logout
5. **Store**: Estado de autenticação é gerenciado por Pinia

### Middlewares

- **auth.ts**: Protege rotas privadas, redireciona para login se não autenticado
- **guest.ts**: Bloqueia usuários autenticados de acessar login/registro

## 📦 Módulo de Projetos

### CRUD Completo

| Operação | Rota | Método |
|----------|------|--------|
| Listar | `/api/projects` | GET |
| Criar | `/api/projects` | POST |
| Detalhes | `/api/projects/:id` | GET |
| Deletar | `/api/projects/:id` | DELETE |

### Campos do Projeto

```typescript
interface Project {
  id: string;
  user_id: string;
  name: string;
  niche: string;
  description?: string;
  status: 'active' | 'archived' | 'draft';
  created_at: string;
  updated_at: string;
}
```

## 🎨 Componentes e Pages

### Páginas Principais

- **`/`**: Landing page com CTA
- **`/login`**: Página de login
- **`/register`**: Página de registro
- **`/dashboard`**: Dashboard com estatísticas
- **`/projects`**: Listagem de projetos
- **`/projects/:id`**: Detalhes do projeto
- **`/settings`**: Configurações de usuário

### Layouts

- **default.vue**: Layout com sidebar + header (rotas protegidas)
- **auth.vue**: Layout minimalista (login/register)

## 🛠️ Composables

### useAuth()

```typescript
const { login, register, logout, restoreSession, user, isAuthenticated } = useAuth();

// Login
await login({ email: 'user@example.com', password: 'password' });

// Logout
await logout();
```

### useProjects()

```typescript
const { projects, loading, fetchProjects, createProject, deleteProject } = useProjects();

// Buscar projetos
await fetchProjects();

// Criar projeto
await createProject({ name: 'My Project', niche: 'Finance' });

// Deletar projeto
await deleteProject(projectId);
```

## 📊 Pinia Stores

### useAuthStore()

```typescript
const authStore = useAuthStore();

// Getters
authStore.isLoggedIn;
authStore.userId;
authStore.userEmail;

// Actions
authStore.setUser(user);
authStore.clearSession();
authStore.updateUser({ name: 'New Name' });
```

### useProjectStore()

```typescript
const projectStore = useProjectStore();

// Getters
projectStore.projectCount;
projectStore.activeProjects;
projectStore.getProjectById(id);

// Actions
projectStore.setProjects(projects);
projectStore.addProject(project);
projectStore.updateProject(id, updates);
projectStore.removeProject(id);
```

## 🔌 API Routes

### GET /api/projects

Retorna lista de projetos do usuário.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Finance Channel",
      "niche": "Finance",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### POST /api/projects

Cria um novo projeto.

**Request:**
```json
{
  "name": "My Project",
  "niche": "Technology",
  "description": "Optional description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new-id",
    "name": "My Project",
    "niche": "Technology",
    "status": "draft",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### GET /api/projects/:id

Retorna detalhes de um projeto específico.

### DELETE /api/projects/:id

Deleta um projeto.

## 🎓 TypeScript

A aplicação utiliza **TypeScript em strict mode** com interfaces bem definidas para todas as entidades:

```typescript
// types/index.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  niche: string;
  status: 'active' | 'archived' | 'draft';
  created_at: string;
  updated_at: string;
}
```

## 🎨 Tailwind CSS

A aplicação utiliza **Tailwind CSS v3** para styling responsivo e limpo.

### Configuração

- **Tema customizado** em `tailwind.config.ts`
- **Cores principais**: blue, purple, pink
- **Estilos globais** em `assets/main.css`

## 📝 Próximos Passos

### Integração com Supabase

1. **Criar tabelas** no Supabase:
   - `users` (gerenciada automaticamente pelo Auth)
   - `projects` (com foreign key para users)
   - `videos` (para armazenar vídeos gerados)

2. **Atualizar API routes** para usar Supabase em vez de mock data

3. **Implementar autenticação real** no composable `useAuth()`

### Funcionalidades Futuras

- [ ] Geração de vídeos com IA
- [ ] Integração com TikTok/YouTube Shorts API
- [ ] Dashboard de analytics
- [ ] Sistema de templates
- [ ] Agendamento de postagens
- [ ] Gerenciamento de equipes

## 🚀 Build para Produção

```bash
# Build
pnpm build

# Preview
pnpm preview

# Start (produção)
pnpm start
```

## 📚 Referências

- [Nuxt 3 Documentation](https://nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
- [Pinia Documentation](https://pinia.vuejs.org)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## 📄 Licença

MIT

## 👨‍💻 Autor

Desenvolvido como MVP de plataforma SaaS de automação de vídeos.

---

**Última atualização**: 29 de Março de 2024
