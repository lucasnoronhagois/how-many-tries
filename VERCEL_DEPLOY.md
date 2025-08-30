# 🚀 Deploy no Vercel - How Many Tries

Guia completo para fazer deploy do projeto no Vercel.

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Projeto no GitHub/GitLab/Bitbucket
- Node.js 18+ instalado localmente

## 🔧 Configuração

### 1. Estrutura do Projeto

O projeto está configurado para funcionar no Vercel com:

- **Backend**: API Express com TypeScript
- **Frontend**: React + Vite
- **Configuração**: `vercel.json` na raiz

### 2. Arquivos de Configuração

#### `vercel.json` (Raiz)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/src/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/src/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/$1"
    }
  ]
}
```

#### `frontend/vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## 🚀 Deploy

### Opção 1: Deploy via Vercel Dashboard

1. **Acesse** [vercel.com](https://vercel.com)
2. **Faça login** com sua conta
3. **Clique** em "New Project"
4. **Importe** seu repositório do GitHub
5. **Configure** as variáveis de ambiente:
   - `NODE_ENV`: `production`
   - `CORS_ORIGIN`: `https://seu-dominio.vercel.app`
6. **Clique** em "Deploy"

### Opção 2: Deploy via CLI

1. **Instale** o Vercel CLI:
```bash
npm i -g vercel
```

2. **Faça login**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Para produção**:
```bash
vercel --prod
```

## 🔧 Variáveis de Ambiente

Configure no Vercel Dashboard:

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `NODE_ENV` | `production` | Ambiente de produção |
| `CORS_ORIGIN` | `https://seu-dominio.vercel.app` | Origem permitida para CORS |
| `PORT` | `3001` | Porta do servidor (opcional) |

## 📁 Estrutura de Deploy

```
/
├── api/           # Backend (Express)
│   ├── simulate   # POST /api/simulate
│   ├── health     # GET /api/health
│   └── index      # GET /api
├── _next/         # Frontend (React)
└── index.html     # Página inicial
```

## 🔍 URLs de Acesso

Após o deploy, você terá acesso a:

- **Frontend**: `https://seu-projeto.vercel.app`
- **API**: `https://seu-projeto.vercel.app/api`
- **Health Check**: `https://seu-projeto.vercel.app/api/health`

## 🐛 Troubleshooting

### Erro de Build
- Verifique se todas as dependências estão no `package.json`
- Confirme se o Node.js 18+ está sendo usado

### Erro de CORS
- Configure a variável `CORS_ORIGIN` corretamente
- Verifique se a URL do frontend está na lista de origens permitidas

### Erro de Rota
- Confirme se o `vercel.json` está configurado corretamente
- Verifique se as rotas estão apontando para os arquivos corretos

## 📊 Monitoramento

- **Logs**: Acesse via Vercel Dashboard
- **Performance**: Use o Analytics do Vercel
- **Erros**: Configure alertas no dashboard

## 🔄 Atualizações

Para atualizar o projeto:

1. **Faça push** para o repositório
2. **O Vercel** fará deploy automático
3. **Ou force** um novo deploy via dashboard

## 📞 Suporte

- **Documentação**: [vercel.com/docs](https://vercel.com/docs)
- **Comunidade**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Status**: [vercel-status.com](https://vercel-status.com)

---

🎉 **Seu projeto está pronto para produção no Vercel!**
