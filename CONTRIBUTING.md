# Guia de Contribuição

Obrigado por querer contribuir com o VideoAI! Este documento fornece diretrizes para contribuição ao projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Começar](#como-começar)
- [Processo de Contribuição](#processo-de-contribuição)
- [Padrões de Código](#padrões-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Melhorias](#sugerir-melhorias)

## Código de Conduta

Este projeto adhere ao Contributor Covenant Code of Conduct. Ao participar, você deve seguir este código.

### Nossa Promessa

Nos comprometemos a fazer deste projeto um ambiente acolhedor e inclusivo para todos.

## Como Começar

### 1. Fork o Repositório

```bash
git clone https://github.com/seu-username/video-automation-saas.git
cd video-automation-saas
```

### 2. Instale as Dependências

```bash
pnpm install
```

### 3. Configure as Variáveis de Ambiente

```bash
cp .env.example .env.local
```

### 4. Crie uma Branch

```bash
git checkout -b feature/sua-feature
```

## Processo de Contribuição

### 1. Faça suas Alterações

- Mantenha o código limpo e bem documentado
- Siga os padrões do projeto
- Execute testes localmente

### 2. Teste suas Alterações

```bash
# Testes unitários
pnpm run test

# Type checking
pnpm run type-check

# Lint
pnpm run lint
```

### 3. Commit suas Alterações

```bash
git add .
git commit -m "feat: descrição clara da alteração"
```

### 4. Push para sua Branch

```bash
git push origin feature/sua-feature
```

### 5. Abra um Pull Request

Forneça uma descrição clara do que a PR faz e por quê.

## Padrões de Código

### TypeScript

- Use `strict mode` obrigatoriamente
- Defina tipos explícitos para funções
- Evite `any` - use tipos genéricos quando apropriado

```typescript
// ✅ Bom
const getUserById = async (id: string): Promise<User> => {
  return supabase.from("users").select("*").eq("id", id).single();
};

// ❌ Ruim
const getUserById = async (id: any): any => {
  return supabase.from("users").select("*").eq("id", id).single();
};
```

### Vue.js / Nuxt

- Use `<script setup>` por padrão
- Use composables para lógica reutilizável
- Mantenha componentes pequenos e focados
- Use TypeScript em templates quando possível

```vue
<!-- ✅ Bom -->
<script setup lang="ts">
interface Props {
  title: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), { disabled: false });
</script>

<template>
  <button :disabled="disabled">{{ title }}</button>
</template>
```

### CSS / Tailwind

- Use classes do Tailwind em vez de CSS puro
- Organize classes de forma consistente
- Use componentes UI para reutilização

```vue
<!-- ✅ Bom -->
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 class="text-lg font-semibold text-gray-900">Título</h2>
</div>

<!-- ❌ Ruim -->
<div style="display: flex; justify-content: space-between; padding: 16px;">
  <h2 style="font-size: 18px; font-weight: 600;">Título</h2>
</div>
```

### Nomes de Arquivos

- Components: `PascalCase` (ex: `UserCard.vue`)
- Composables: `camelCase` com prefixo `use` (ex: `useAuth.ts`)
- Utilities: `camelCase` (ex: `validations.ts`)
- Stores: `camelCase` (ex: `auth.ts`)

### Estrutura de Pastas

```
src/
├── components/
│   ├── ui/              # Componentes reutilizáveis
│   └── features/        # Componentes específicos de features
├── composables/         # Lógica reutilizável
├── pages/              # Rotas do app
├── server/
│   └── api/            # API routes
├── stores/             # Pinia stores
├── types/              # TypeScript types
└── utils/              # Funções utilitárias
```

## Commits

Siga o padrão Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos

- `feat`: Nova feature
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (sem mudança de lógica)
- `refactor`: Refatoração de código
- `perf`: Melhorias de performance
- `test`: Testes
- `chore`: Tarefas de build, deps, etc.

### Exemplos

```bash
git commit -m "feat(auth): adicionar autenticação com GitHub"
git commit -m "fix(projects): corrigir filtro de status"
git commit -m "docs: atualizar guia de instalação"
git commit -m "refactor(api): melhorar tratamento de erros"
```

## Pull Requests

### Checklist antes de submeter

- [ ] Código segue os padrões do projeto
- [ ] Testes unitários foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] `npm run type-check` passa sem erros
- [ ] `npm run lint` passa sem avisos
- [ ] Branch está atualizada com `main`

### Descrição da PR

```markdown
## Descrição

Breve descrição do que a PR faz.

## Tipo de Alteração

- [ ] Bug fix (correção sem breaking change)
- [ ] Nova feature (novo funcionamento)
- [ ] Breaking change (alteração que quebra compatibilidade)

## Como Foi Testado

Descreva como você testou as mudanças.

## Checklist

- [ ] Meu código segue o estilo do projeto
- [ ] Executei type-check e lint localmente
- [ ] Adicionei testes apropriados
- [ ] Adicionei/atualizei documentação
```

## Reportar Bugs

### Antes de Reportar

- Verifique a lista de issues existentes
- Tente reproduzir o problema em uma versão recente

### Como Reportar

1. Use um título descritivo e claro
2. Descreva os passos exatos para reproduzir
3. Forneça exemplos específicos para demonstrar
4. Descreva o comportamento atual
5. Descreva o comportamento esperado
6. Inclua screenshots se possível
7. Nota a sua versão do Node.js, npm/pnpm, navegador, etc.

Exemplo:

```
Título: Modal de criação de projeto não fecha após salvar

Passos para reproduzir:
1. Ir para /projects
2. Clicar em "New Project"
3. Preencher o formulário
4. Clicar em "Save"

Comportamento esperado:
Modal deve fechar e projeto deve aparecer na lista

Comportamento atual:
Modal permanece aberto mesmo após salvamento
```

## Sugerir Melhorias

As sugestões de melhorias são bem-vindas! Abra uma issue com:

1. Título claro e descritivo
2. Descrição detalhada da melhoria
3. Exemplos de como funcionaria
4. Possíveis benefícios

## Recursos

- [Documentação Nuxt 3](https://nuxt.com)
- [TypeScript](https://www.typescriptlang.org)
- [Vue.js](https://vuejs.org)
- [Pinia](https://pinia.vuejs.org)
- [Supabase](https://supabase.com)
- [Tailwind CSS](https://tailwindcss.com)

## Perguntas?

Abra uma discussion ou entre em contato com a equipe de desenvolvimento.

Obrigado por contribuir! 🚀
