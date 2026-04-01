# CI/CD Setup Guide

Este projeto usa GitHub Actions para CI/CD automático.

## 🚀 Funcionalidades

- ✅ **Testes automáticos** em múltiplas versões do Node.js
- ✅ **Linting** e correção automática de código
- ✅ **Type checking** com TypeScript
- ✅ **Build** da aplicação
- ✅ **Deploy automático** no Vercel (branch main)

## 📋 Pré-requisitos

### 1. Configurar Secrets no GitHub

Vá para: **GitHub Repository** → **Settings** → **Secrets and variables** → **Actions**

Adicione estes secrets:

```
VERCEL_TOKEN        # Token de API do Vercel
VERCEL_ORG_ID       # ID da organização no Vercel
VERCEL_PROJECT_ID   # ID do projeto no Vercel
```

### 2. Como obter os tokens do Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá para **Account Settings** → **Tokens**
3. Crie um novo token com nome "GitHub Actions"
4. Copie o token

### 3. Como obter Org ID e Project ID

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Ver informações do projeto
vercel project ls

# Ou ver detalhes específicos
vercel project --help
```

## 🔄 Fluxo de CI/CD

### Push na branch `main`:

1. **Test** - Roda testes em Node 18.x e 20.x
2. **Lint** - Verifica qualidade do código
3. **Type Check** - Valida TypeScript
4. **Build** - Compila a aplicação
5. **Deploy** - Publica automaticamente no Vercel

### Pull Request:

1. **Test** - Mesmas validações
2. **Aprovação** - Só faz merge se passar

## 🛠️ Comandos Locais

```bash
# Instalar dependências
npm install

# Rodar linting
npm run lint

# Corrigir linting automaticamente
npm run lint:fix

# Type checking
npm run typecheck

# Rodar testes
npm run test

# Testes com UI
npm run test:ui

# Cobertura de testes
npm run test:coverage

# Build
npm run build
```

## 📊 Status dos Checks

Os checks aparecem na aba **Actions** do GitHub:

- 🟢 **Passou** - Tudo OK, pode fazer merge/deploy
- 🔴 **Falhou** - Ver logs para corrigir

## 🔧 Troubleshooting

### Erro de deploy no Vercel

- Verifique se os secrets estão corretos
- Confirme se o projeto existe no Vercel
- Verifique logs detalhados na action

### Erro de linting

```bash
npm run lint:fix  # Corrige automaticamente
```

### Erro de type checking

```bash
npm run typecheck  # Ver detalhes do erro
```
