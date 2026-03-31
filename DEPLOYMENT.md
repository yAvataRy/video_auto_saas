# Guia de Deployment

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Deployment em Produção](#deployment-em-produção)
- [Otimizações de Performance](#otimizações-de-performance)
- [Monitoramento](#monitoramento)
- [Troubleshooting](#troubleshooting)

## Visão Geral

Este guia descreve como fazer o deploy do VideoAI em produção. Estamos usando:

- **Frontend**: Nuxt 3 (hospedagem em Vercel/Netlify/servidor próprio)
- **Backend**: Nuxt Server Routes (ou API separada)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (ou S3)
- **Auth**: Supabase Auth

## Pré-requisitos

### 1. Conta Supabase Produção

- Crie um novo projeto em [app.supabase.com](https://app.supabase.com)
- Copie `SUPABASE_URL` e `SUPABASE_ANON_KEY`
- Crie tabelas (veja [`todo.md`](todo.md) para script SQL)

### 2. Domínio Customizado

- Registre um domínio (ex: videoai.com)
- Aponte para seu host (Vercel, Netlify, etc)

### 3. Variáveis de Ambiente

Prepare as variáveis para produção:

```env
NUXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
```

### 4. CI/CD Pipeline

Recomendado GitHub Actions, GitLab CI ou similar.

## Deployment em Produção

### Opção 1: Vercel (Recomendado para Nuxt 3)

#### 1. Conectar Repositório

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione seu repositório GitHub
4. Vercel detectará Nuxt 3 automaticamente

#### 2. Configurar Variáveis de Ambiente

No painel Vercel:

1. Settings → Environment Variables
2. Adicione:
   - `NUXT_PUBLIC_SUPABASE_URL`
   - `NUXT_PUBLIC_SUPABASE_ANON_KEY`

#### 3. Deploy

```bash
git push origin main
```

Vercel fará deploy automaticamente.

---

### Opção 2: Netlify

#### 1. Conectar Repositório

1. Acesse [netlify.com](https://netlify.com)
2. Clique em "New site from Git"
3. Selecione seu repositório

#### 2. Configurar Build

- Build command: `npm run build`
- Publish directory: `.output/public`

#### 3. Variáveis de Ambiente

1. Site settings → Environment
2. Adicione suas variáveis

---

### Opção 3: Deploy Próprio (VPS/Servidor)

#### 1. Preparar Servidor

```bash
# SSH no seu servidor
ssh user@seu-servidor.com

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar pnpm
npm install -g pnpm

# Instalar PM2 (gerenciador de processos)
npm install -g pm2
```

#### 2. Clonar Repositório

```bash
cd /var/www
git clone https://github.com/seu-usuario/video-automation-saas.git
cd video-automation-saas
```

#### 3. Instalar Dependências

```bash
pnpm install --prod
```

#### 4. Compilar

```bash
pnpm run build
```

#### 5. Variáveis de Ambiente

```bash
cat > .env.production << EOF
NUXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica
EOF
```

#### 6. Iniciar com PM2

```bash
pm2 start "pnpm start" --name videoai
pm2 save
pm2 startup
```

#### 7. Configurar Nginx (Proxy Reverso)

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 8. SSL com Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

---

### Opção 4: Docker

#### 1. Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY . .

RUN pnpm run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["pnpm", "start"]
```

#### 2. Docker Compose

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NUXT_PUBLIC_SUPABASE_URL: ${SUPABASE_URL}
      NUXT_PUBLIC_SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY}
    restart: unless-stopped
```

#### 3. Build e Deploy

```bash
docker-compose up -d
```

---

## Otimizações de Performance

### 1. Renovação de Dependências

```bash
pnpm install
pnpm run build
pnpm run preview
```

### 2. Compressão Gzip

Em `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/sitemap.xml", "/rss.xml"],
      ignore: ["/admin"],
    },
    compress: true,
  },
});
```

### 3. Image Optimization

Use `<NuxtImg>` em vez de `<img>`:

```vue
<NuxtImg src="/logo.png" alt="Logo" width="100" height="100" />
```

### 4. Lazy Loading

```vue
<script setup>
const MyComponent = defineAsyncComponent(
  () => import("~/components/MyComponent.vue"),
);
</script>
```

### 5. Cache Headers

Configure no seu host:

```
Cache-Control: public, max-age=31536000, immutable
```

Para assets estáticos:

```
Cache-Control: public, max-age=3600
```

### 6. CDN

Use Cloudflare ou similar para:

- Caching de assets
- DDoS protection
- Minificação automática

---

## Monitoramento

### 1. Error Tracking (Sentry)

```bash
npm install @sentry/nuxt
```

Em `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ["@sentry/nuxt/module"],
  sentry: {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
  },
});
```

### 2. Analytics (Vercel Analytics)

```bash
npm install @vercel/analytics
```

Em `app.vue`:

```vue
<script setup>
import { webVitals } from "@vercel/analytics";
webVitals();
</script>
```

### 3. Logs com PM2

```bash
pm2 logs videoai
```

### 4. Health Checks

Crie endpoint em `server/api/health.ts`:

```typescript
export default defineEventHandler(() => {
  return { status: "ok", timestamp: new Date() };
});
```

Configure health check no seu host (Vercel, Netlify, etc).

---

## Troubleshooting

### Build falha com "Cannot find module"

```bash
# Limpar cache
rm -rf node_modules .nuxt
pnpm install
pnpm run build
```

### Variáveis de ambiente não carregam

- Variáveis públicas: prefixe com `NUXT_PUBLIC_`
- Verifique o arquivo `.env` ou configuração do host
- Rebuild e redeploy

### Banco de dados não conecta

```typescript
// Verificar conexão
const test = async () => {
  const { data, error } = await supabase.from("projects").select("*").limit(1);
  if (error) console.error("Database error:", error);
  else console.log("Database OK");
};
```

### Performance lenta

1. Verifique Core Web Vitals (Vercel/Lighthouse)
2. Reduza bundle size: `npm run build -- --analyze`
3. Ative cache no CDN/host
4. Considere SSR em `nuxt.config.ts`:

```typescript
ssr: true; // ou false para SPA
```

---

## Backup e Recuperação

### Backup Supabase

1. Acesse console Supabase
2. Settings → Backups
3. Ative backups automáticos
4. Download manualmente se necessário

### Backup Código

```bash
# Tag de release
git tag -a v1.0.0 -m "Production release"
git push origin v1.0.0
```

---

## Roadmap de Deploy

- [ ] Setup Supabase produção
- [ ] Configurar domínio
- [ ] Setup CI/CD (GitHub Actions/etc)
- [ ] Deploy para staging
- [ ] Testes em staging
- [ ] Deploy para produção
- [ ] Configurar SSL/TLS
- [ ] Monitoramento e alertas
- [ ] Backup automático
- [ ] Documentation updates

---

## Contato e Suporte

Para problemas ou questões:

- Abra issue no GitHub
- Consulte documentação Nuxt/Supabase
- Entre em contato com a equipe
