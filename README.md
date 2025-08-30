# How Many Tries

Simulador de tentativas baseado em porcentagem de sucesso.

## Descrição

Esta aplicação permite simular quantas tentativas são necessárias para conseguir algo baseado em uma porcentagem de sucesso fornecida.

## Estrutura do Projeto

- `backend/` - API Express com TypeScript
- `frontend/` - Aplicação React com Vite e TypeScript

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm run install:all
```

## Executando o Projeto

### Desenvolvimento
Para executar backend e frontend simultaneamente:
```bash
npm run dev
```

### Individualmente
- Backend: `npm run dev:backend`
- Frontend: `npm run dev:frontend`

## Build

Para criar builds de produção:
```bash
npm run build
```

## 🚀 Deploy no Vercel

O projeto está configurado para deploy automático no Vercel.

### Deploy Rápido

1. **Fork** este repositório
2. **Conecte** ao [Vercel](https://vercel.com)
3. **Importe** o projeto
4. **Deploy automático**! 🎉

### Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Script de Deploy

```bash
# Executar script de deploy
chmod +x deploy.sh
./deploy.sh
```

📖 **Guia completo**: [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)

## 🌐 Sistema de Idiomas

O projeto suporta **português** e **inglês** com um botão de troca de idioma no canto superior direito.

### Funcionalidades:
- ✅ **Troca instantânea** entre PT/EN
- ✅ **Persistência** da escolha no localStorage
- ✅ **Interface completa** traduzida
- ✅ **Formatação de números** localizada
- ✅ **Responsivo** em todos os dispositivos

### Como usar:
1. Clique no botão **🌐 PT/EN** no canto superior direito
2. A interface muda instantaneamente
3. Sua preferência é salva automaticamente

## Tecnologias

- **Backend**: Express, TypeScript, Node.js
- **Frontend**: React, Vite, TypeScript
- **Ferramentas**: Concurrently (para execução simultânea)
- **Internacionalização**: Sistema próprio de i18n
