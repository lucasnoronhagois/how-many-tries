# Estrutura do Projeto - How Many Tries

## Visão Geral

Este projeto é um simulador de tentativas baseado em porcentagem de sucesso, desenvolvido com uma arquitetura moderna e escalável.

## Estrutura de Diretórios

```
how-many-tries/
├── backend/                 # API REST com Express + TypeScript
│   ├── src/
│   │   ├── config/         # Configurações da aplicação
│   │   ├── controllers/    # Controladores (padrão MVC)
│   │   ├── middleware/     # Middlewares personalizados
│   │   ├── models/         # Modelos (lógica de negócio)
│   │   ├── routes/         # Definição de rotas
│   │   ├── types/          # Tipos TypeScript globais
│   │   ├── utils/          # Utilitários e funções auxiliares
│   │   └── index.ts        # Arquivo principal do servidor
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend/               # Aplicação React + Vite + TypeScript
│   ├── src/
│   │   ├── App.tsx         # Componente principal
│   │   ├── main.tsx        # Ponto de entrada
│   │   ├── index.css       # Estilos globais
│   │   └── App.css         # Estilos do componente
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .eslintrc.cjs
├── package.json            # Scripts principais do projeto
├── README.md              # Documentação principal
├── .gitignore
└── PROJECT_STRUCTURE.md   # Este arquivo
```

## Arquitetura Backend (MVC)

### Model (Modelo)
**Arquivo**: `backend/src/models/Simulation.ts`

**Responsabilidades**:
- Lógica de negócio da simulação
- Validação de parâmetros
- Cálculos matemáticos
- Geração de números aleatórios

**Principais Métodos**:
- `simulateAttempts()`: Executa a simulação
- `validateParameters()`: Valida dados de entrada
- `calculateTheoreticalProbability()`: Calcula probabilidades

### View (Visão)
**Localização**: Frontend React

**Responsabilidades**:
- Interface do usuário
- Apresentação dos dados
- Interação com o usuário
- Formatação de resultados

### Controller (Controlador)
**Arquivo**: `backend/src/controllers/SimulationController.ts`

**Responsabilidades**:
- Receber requisições HTTP
- Validar dados de entrada
- Coordenar entre Model e View
- Retornar respostas formatadas
- Logging e monitoramento

**Principais Métodos**:
- `simulate()`: Endpoint principal de simulação
- `getApiInfo()`: Informações da API
- `healthCheck()`: Status de saúde

## Frontend (React + Vite)

### Componentes Principais
- **App.tsx**: Componente principal com formulário e resultados
- **main.tsx**: Ponto de entrada da aplicação

### Funcionalidades
- Interface moderna e responsiva
- Validação de formulários
- Exibição de resultados em tempo real
- Tratamento de erros
- Loading states

### Tecnologias
- **React 18**: Framework principal
- **TypeScript**: Tipagem estática
- **Vite**: Build tool e dev server
- **Axios**: Cliente HTTP
- **CSS Modules**: Estilização

## API Endpoints

### POST `/api/simulate`
Executa 5 simulações simultâneas e retorna a média das tentativas necessárias.

**Request Body**:
```json
{
  "successRate": 25,
  "maxAttempts": 1000
}
```

**Response**:
```json
{
  "averageAttempts": 18.4,
  "totalSuccesses": 4,
  "totalFailures": 1,
  "successRate": 25,
  "maxAttemptsReached": false,
  "individualResults": [
    {
      "attempts": 15,
      "success": true,
      "maxAttemptsReached": false,
      "successRate": 25
    },
    {
      "attempts": 22,
      "success": true,
      "maxAttemptsReached": false,
      "successRate": 25
    }
  ],
  "executionTime": 5,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET `/api/health`
Verifica o status de saúde da API.

### GET `/api`
Retorna informações sobre a API.

## Scripts Disponíveis

### Scripts Principais
```bash
# Instalar todas as dependências
npm run install:all

# Executar backend e frontend simultaneamente
npm run dev

# Executar apenas o backend
npm run dev:backend

# Executar apenas o frontend
npm run dev:frontend

# Build para produção
npm run build
```

### Scripts do Backend
```bash
cd backend

# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

### Scripts do Frontend
```bash
cd frontend

# Desenvolvimento
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Configurações

### Variáveis de Ambiente
- `PORT`: Porta do servidor backend (padrão: 3001)
- `NODE_ENV`: Ambiente (development/production)
- `CORS_ORIGIN`: Origem permitida para CORS

### Portas
- **Backend**: 3001
- **Frontend**: 3000

## Funcionalidades Implementadas

### ✅ Concluído
- [x] Estrutura MVC no backend
- [x] API REST funcional
- [x] Frontend React moderno
- [x] Interface responsiva
- [x] Validação de dados
- [x] Tratamento de erros
- [x] Logging estruturado
- [x] Configurações centralizadas
- [x] TypeScript em ambos os lados
- [x] Hot reload no desenvolvimento

### 🔄 Próximas Melhorias
- [ ] Autenticação e autorização
- [ ] Rate limiting
- [ ] Cache (Redis)
- [ ] Logs estruturados (Winston)
- [ ] Testes unitários e de integração
- [ ] Documentação com Swagger
- [ ] Docker e Docker Compose
- [ ] CI/CD pipeline
- [ ] Monitoramento e métricas
- [ ] Histórico de simulações
- [ ] Múltiplas simulações simultâneas
- [ ] Exportação de resultados

## Como Executar

1. **Clone o repositório**
2. **Instale as dependências**:
   ```bash
   npm run install:all
   ```
3. **Execute o projeto**:
   ```bash
   npm run dev
   ```
4. **Acesse**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Documentação API: http://localhost:3001/api

## Tecnologias Utilizadas

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **TypeScript**: Linguagem principal
- **CORS**: Middleware para CORS
- **ts-node-dev**: Desenvolvimento com hot reload

### Frontend
- **React 18**: Framework principal
- **TypeScript**: Tipagem estática
- **Vite**: Build tool e dev server
- **Axios**: Cliente HTTP
- **CSS**: Estilização moderna

### Ferramentas
- **Concurrently**: Execução simultânea
- **ESLint**: Linting de código
- **Git**: Controle de versão
