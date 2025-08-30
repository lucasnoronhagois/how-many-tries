# Backend - How Many Tries API

API REST para simulação de tentativas baseado em porcentagem de sucesso, seguindo o padrão MVC.

## Estrutura MVC

```
src/
├── config/           # Configurações da aplicação
│   ├── app.ts       # Configurações gerais
│   └── database.ts  # Configurações de banco de dados
├── controllers/     # Controladores (lógica de requisições HTTP)
│   └── SimulationController.ts
├── middleware/      # Middlewares personalizados
│   └── errorHandler.ts
├── models/          # Modelos (lógica de negócio)
│   └── Simulation.ts
├── routes/          # Definição de rotas
│   └── simulationRoutes.ts
├── types/           # Tipos TypeScript globais
│   └── index.ts
├── utils/           # Utilitários e funções auxiliares
│   └── helpers.ts
└── index.ts         # Arquivo principal do servidor
```

## Padrão MVC Implementado

### Model (Modelo)
- **Localização**: `src/models/Simulation.ts`
- **Responsabilidade**: Lógica de negócio, validações e cálculos
- **Funcionalidades**:
  - Simulação de tentativas
  - Validação de parâmetros
  - Cálculo de probabilidades teóricas

### View (Visão)
- **Localização**: Frontend React (separado)
- **Responsabilidade**: Interface do usuário e apresentação dos dados

### Controller (Controlador)
- **Localização**: `src/controllers/SimulationController.ts`
- **Responsabilidade**: Gerenciar requisições HTTP e coordenar entre Model e View
- **Funcionalidades**:
  - Receber requisições
  - Validar dados de entrada
  - Chamar métodos do Model
  - Retornar respostas formatadas

## Endpoints da API

### POST `/api/simulate`
Executa 5 simulações simultâneas e retorna a média das tentativas necessárias.

**Body:**
```json
{
  "successRate": 25,
  "maxAttempts": 1000
}
```

**Response:**
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

## Middlewares

### Error Handler
- Tratamento centralizado de erros
- Logging de erros com contexto
- Respostas de erro padronizadas

### Logging
- Log de todas as requisições
- Medição de tempo de execução
- Logs estruturados com emojis

## Configurações

### Variáveis de Ambiente
- `PORT`: Porta do servidor (padrão: 3001)
- `NODE_ENV`: Ambiente (development/production)
- `CORS_ORIGIN`: Origem permitida para CORS

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

## Tecnologias Utilizadas

- **Express.js**: Framework web
- **TypeScript**: Linguagem principal
- **CORS**: Middleware para CORS
- **ts-node-dev**: Desenvolvimento com hot reload

## Próximas Melhorias

- [ ] Adicionar autenticação
- [ ] Implementar rate limiting
- [ ] Adicionar cache (Redis)
- [ ] Implementar logs estruturados
- [ ] Adicionar testes unitários
- [ ] Implementar documentação com Swagger
