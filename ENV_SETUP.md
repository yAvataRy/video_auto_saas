# 🔧 Configuração de Variáveis de Ambiente

Para executar o projeto localmente, você precisa configurar as variáveis de ambiente do Supabase.

## 📋 Passo a Passo

### 1. Criar arquivo `.env.local`

Na raiz do projeto, crie um arquivo chamado `.env.local`:

```bash
touch .env.local
```

### 2. Obter Credenciais Supabase

1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Crie um novo projeto ou selecione um existente
3. Vá para **Settings > API**
4. Copie:
   - **Project URL** (ex: `https://seu-projeto.supabase.co`)
   - **anon public** key (chave pública)

### 3. Adicionar ao `.env.local`

Abra o arquivo `.env.local` e adicione:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-anon-publica
NODE_ENV=development
```

**Exemplo completo:**

```env
SUPABASE_URL=https://xyzabc123.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV=development
```

## ⚠️ Importante

- **Nunca** commite o arquivo `.env.local` no Git
- O arquivo `.gitignore` já está configurado para ignorar arquivos `.env*`
- Cada desenvolvedor precisa ter seu próprio `.env.local`

## 🚀 Executar o Projeto

Após configurar as variáveis de ambiente:

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview do build
pnpm preview
```

## ✅ Verificar Conexão

Se as variáveis estiverem configuradas corretamente, você verá no console:

```
✓ Supabase conectado com sucesso
```

Se não ver essa mensagem, verifique:
1. Se o arquivo `.env.local` existe
2. Se as credenciais estão corretas
3. Se o Supabase URL e Key não têm espaços em branco

## 📚 Referências

- [Documentação Supabase](https://supabase.com/docs)
- [Nuxt Runtime Config](https://nuxt.com/docs/guide/going-further/runtime-config)
- [Variáveis de Ambiente em Nuxt](https://nuxt.com/docs/guide/directory-structure/env)
