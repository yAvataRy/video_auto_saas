# 🔧 Troubleshooting - Nuxt 4 Fixes Aplicados

## Problemas Resolvidos

### 1. **Import de dotenv no nuxt.config.ts**
**Problema**: `import dotenv from "dotenv"` não é necessário no Nuxt 4, pois as variáveis de ambiente são carregadas automaticamente.

**Solução**: Removido o import e a chamada `dotenv.config()` do arquivo de configuração.

```diff
- import { defineNuxtConfig } from "nuxt/config";
- import dotenv from "dotenv";
- 
- dotenv.config();
- 
export default defineNuxtConfig({
```

### 2. **Módulo @nuxt/icon não encontrado**
**Problema**: O módulo `@nuxt/icon` não existe com as versões especificadas.

**Solução**: Removido da configuração. Use `<Icon>` do `@nuxt/ui` ou substitua por `<i>` tags com classes de ícones (ex: Font Awesome, Heroicons).

```diff
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/supabase',
-   '@nuxt/icon',
  ],
```

### 3. **Configuração SSR e Vite**
**Problema**: Configurações SSR desnecessárias para um app SPA.

**Solução**: Simplificado o Vite config e mantido `ssr: false` para SPA.

```diff
  vite: {
    define: {
      __DEV__: true,
    },
-   ssr: {
-     noExternal: ['@supabase/supabase-js'],
-   },
  },
```

### 4. **Runtime Config**
**Problema**: Variáveis de ambiente não eram carregadas corretamente.

**Solução**: Adicionados valores padrão vazios para evitar erros quando variáveis não estão definidas.

```diff
  runtimeConfig: {
    public: {
-     supabaseUrl: process.env.SUPABASE_URL,
-     supabaseKey: process.env.SUPABASE_KEY,
+     supabaseUrl: process.env.SUPABASE_URL || '',
+     supabaseKey: process.env.SUPABASE_KEY || '',
    },
  },
```

## Como Usar

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-anon-publica
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Rodar Localmente

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000` (ou porta alternativa se 3000 estiver em uso).

### 4. Build para Produção

```bash
npm run build
npm start
```

## Problemas Conhecidos

### Icon Component

O projeto usa `<Icon name="mdi:*" />` em várias páginas, mas o módulo não está instalado. **Soluções**:

1. **Usar @nuxt/ui Button com ícone**:
```vue
<UButton icon="i-heroicons-arrow-left" />
```

2. **Usar Font Awesome**:
```vue
<i class="fas fa-arrow-left"></i>
```

3. **Usar Heroicons via CDN**:
```html
<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <!-- SVG content -->
</svg>
```

### Supabase Não Configurado

Se você vir `Supabase URL or Key not configured` no console:

1. Verifique se o arquivo `.env.local` existe
2. Confirme que `SUPABASE_URL` e `SUPABASE_KEY` estão preenchidos
3. Reinicie o servidor: `npm run dev`

## Próximos Passos

1. **Substituir Icons**: Escolha uma solução de ícones e atualize todos os componentes
2. **Integrar Supabase Real**: Configure credenciais e crie tabelas no Supabase
3. **Testar Autenticação**: Teste login/register com dados reais
4. **Implementar API Routes**: Atualize `/server/api/projects` para usar Supabase

## Versões Utilizadas

- **Nuxt**: 4.4.2
- **Vue**: 3.4.21
- **Pinia**: 2.1.7
- **Supabase JS**: 2.45.0
- **Tailwind CSS**: 3.4.1

## Referências

- [Nuxt 4 Documentation](https://nuxt.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Pinia Documentation](https://pinia.vuejs.org)
