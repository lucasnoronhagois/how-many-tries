# How Many Tries 🎯

Simulador de tentativas baseado em porcentagem de sucesso com simulação local em tempo real.

## 📋 Descrição

Esta aplicação permite simular quantas tentativas são necessárias para conseguir algo baseado em uma porcentagem de sucesso fornecida. O projeto executa **5 simulações simultâneas** e calcula a média de tentativas necessárias.

## 🏗️ Estrutura do Projeto

```
how-many-tries/
├── frontend/          # Aplicação React com Vite e TypeScript
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── hooks/         # Custom hooks
│   │   ├── locales/       # Sistema de internacionalização
│   │   └── App.tsx        # Componente principal
│   └── package.json
├── backend/           # API Express com TypeScript (desenvolvimento local)
├── vercel.json       # Configuração do Vercel
└── README.md
```

## ⚡ Funcionalidades

- 🎲 **Simulação local** - Não depende de API externa
- 📊 **5 simulações simultâneas** - Resultados mais precisos
- ⏱️ **Barra de loading** - Feedback visual de 2 segundos
- 🌐 **Suporte a idiomas** - Português e Inglês
- 📱 **Interface responsiva** - Funciona em todos os dispositivos
- 🎨 **Design moderno** - Interface intuitiva e bonita

## 🚀 Deploy no Vercel

O projeto está **otimizado para deploy no Vercel** como aplicação frontend-only.

### Deploy Automático

1. **Fork** este repositório
2. **Conecte** ao [Vercel](https://vercel.com)
3. **Importe** o projeto
4. **Deploy automático**! 🎉

### Configuração Vercel

O `vercel.json` está configurado para:
- ✅ Build apenas do frontend
- ✅ Ignorar backend e arquivos desnecessários
- ✅ Roteamento correto para SPA

## 🌐 Sistema de Idiomas

O projeto suporta **português** e **inglês** com troca instantânea.

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

## 🛠️ Desenvolvimento Local

### Instalação

```bash
# Clone o repositório
git clone https://github.com/lucasnoronhagois/how-many-tries.git
cd how-many-tries

# Instale as dependências do frontend
cd frontend
npm install
```

### Executando

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## 📊 Como Funciona

1. **Digite** uma porcentagem de sucesso (0.01% a 100%)
2. **Configure** o máximo de tentativas (opcional)
3. **Clique** em "Simular 5 Tentativas"
4. **Aguarde** a barra de loading (2 segundos)
5. **Veja** os resultados:
   - Média de tentativas necessárias
   - Número de sucessos/falhas
   - Detalhes de cada simulação
   - Probabilidade teórica

## 🎯 Exemplos de Uso

- **50% de sucesso**: ~2 tentativas em média
- **25% de sucesso**: ~4 tentativas em média
- **10% de sucesso**: ~10 tentativas em média
- **1% de sucesso**: ~100 tentativas em média
- **0.1% de sucesso**: ~1000 tentativas em média

## 🛡️ Correções Recentes

### ✅ Problema de Lógica Resolvido
- **Antes**: Simulações marcavam sucesso incorretamente
- **Depois**: Lógica corrigida para verificar sucesso real
- **Resultado**: Cálculos precisos e resultados confiáveis

## 🛠️ Tecnologias

- **Frontend**: React 18, Vite, TypeScript
- **Estilização**: CSS puro com design responsivo
- **Internacionalização**: Sistema próprio de i18n
- **Deploy**: Vercel (frontend-only)
- **Desenvolvimento**: Node.js, npm

## 📚 Documentação Adicional

- 📖 [Guia de Deploy](./VERCEL_DEPLOY.md)
- 🌐 [Sistema de Idiomas](./LANGUAGE_SYSTEM.md)
- 🏗️ [Estrutura do Projeto](./PROJECT_STRUCTURE.md)
- 🇺🇸 [README em Inglês](./README_EN.md)
