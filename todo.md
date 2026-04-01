# Video Automation SaaS - TODO

## Arquitetura e Setup

- [x] Estrutura de pastas Nuxt 3
- [x] Configuração nuxt.config.ts
- [x] Configuração TypeScript (strict mode)
- [x] Configuração Tailwind CSS
- [x] Configuração PostCSS
- [x] Plugin Supabase

## Tipos e Interfaces

- [x] Tipos User
- [x] Tipos Project
- [x] Tipos Auth
- [x] Tipos API Response

## Autenticação

- [x] Composable useAuth
- [x] Pinia store auth
- [x] Middleware auth (proteção de rotas)
- [x] Middleware guest (bloqueia usuários autenticados)
- [x] Página login
- [x] Página register
- [x] Integração real com Supabase Auth
- [x] Persistência de sessão
- [x] Recuperação automática de sessão

## Layouts

- [x] Layout default (com sidebar)
- [x] Layout auth (minimalista)

## Dashboard

- [x] Página dashboard com estatísticas
- [x] Cards de métricas
- [x] Tabela de projetos recentes
- [x] Gráficos de analytics
- [x] Filtros e busca

## Módulo de Projetos

- [x] Composable useProjects
- [x] Pinia store projects
- [x] API GET /api/projects
- [x] API POST /api/projects
- [x] API GET /api/projects/:id
- [x] API DELETE /api/projects/:id
- [x] Página projects (listagem)
- [x] Página projects/:id (detalhes)
- [x] Modal de criação de projeto
- [x] Modal de edição de projeto
- [x] Integração real com Supabase
- [x] Validações de formulário
- [x] Mensagens de sucesso/erro

## Componentes UI

- [x] Button component
- [x] Input component
- [x] Modal component
- [x] Card component
- [x] Loading skeleton
- [x] Toast notifications

## Páginas

- [x] Landing page (index)
- [x] Login
- [x] Register
- [x] Dashboard
- [x] Projects list
- [x] Project details
- [x] Settings
- [x] 404 page
- [x] Error page

## Funcionalidades Futuras

- [ ] Geração de vídeos com IA
- [ ] Integração TikTok API
- [ ] Integração YouTube Shorts API
- [x] Agendamento de postagens
- [x] Sistema de templates
- [ ] Editor de vídeos
- [ ] Analytics dashboard
- [ ] Gerenciamento de equipes
- [ ] Sistema de pagamento
- [x] Notificações em tempo real

## Testes

- [ ] Testes unitários (Vitest)
- [ ] Testes de integração
- [ ] Testes E2E (Playwright)

## Documentação

- [x] README.md completo
- [x] Guia de contribuição (CONTRIBUTING.md)
- [x] API documentation (API.md)
- [x] Deployment guide (DEPLOYMENT.md)

## Deploy

- [ ] Configurar CI/CD
- [ ] Deploy em produção
- [ ] Configurar domínio customizado
- [ ] SSL/TLS
- [ ] Monitoramento e logging
