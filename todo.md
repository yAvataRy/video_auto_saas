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
- [ ] Integração real com Supabase Auth
- [ ] Persistência de sessão
- [ ] Recuperação automática de sessão

## Layouts
- [x] Layout default (com sidebar)
- [x] Layout auth (minimalista)

## Dashboard
- [x] Página dashboard com estatísticas
- [x] Cards de métricas
- [x] Tabela de projetos recentes
- [ ] Gráficos de analytics
- [ ] Filtros e busca

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
- [ ] Modal de edição de projeto
- [ ] Integração real com Supabase
- [ ] Validações de formulário
- [ ] Mensagens de sucesso/erro

## Componentes UI
- [ ] Button component
- [ ] Input component
- [ ] Modal component
- [ ] Card component
- [ ] Loading skeleton
- [ ] Toast notifications

## Páginas
- [x] Landing page (index)
- [x] Login
- [x] Register
- [x] Dashboard
- [x] Projects list
- [x] Project details
- [x] Settings
- [ ] 404 page
- [ ] Error page

## Funcionalidades Futuras
- [ ] Geração de vídeos com IA
- [ ] Integração TikTok API
- [ ] Integração YouTube Shorts API
- [ ] Sistema de templates
- [ ] Editor de vídeos
- [ ] Agendamento de postagens
- [ ] Analytics dashboard
- [ ] Gerenciamento de equipes
- [ ] Sistema de pagamento
- [ ] Notificações em tempo real

## Testes
- [ ] Testes unitários (Vitest)
- [ ] Testes de integração
- [ ] Testes E2E (Playwright)

## Documentação
- [x] README.md completo
- [ ] Guia de contribuição
- [ ] API documentation
- [ ] Deployment guide

## Deploy
- [ ] Configurar CI/CD
- [ ] Deploy em produção
- [ ] Configurar domínio customizado
- [ ] SSL/TLS
- [ ] Monitoramento e logging
