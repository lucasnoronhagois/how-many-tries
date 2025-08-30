import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://*.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Simulação de tentativas
const simulateAttempts = (successRate: number, maxAttempts: number = 1000) => {
  const attempts = [];
  let currentAttempts = 0;
  
  while (currentAttempts < maxAttempts) {
    currentAttempts++;
    const random = Math.random() * 100;
    
    if (random <= successRate) {
      attempts.push({
        attempt: currentAttempts,
        success: true,
        randomValue: random.toFixed(2)
      });
      break;
    } else {
      attempts.push({
        attempt: currentAttempts,
        success: false,
        randomValue: random.toFixed(2)
      });
    }
  }
  
  return {
    attempts: currentAttempts,
    success: currentAttempts <= maxAttempts,
    maxAttemptsReached: currentAttempts >= maxAttempts,
    successRate,
    allAttempts: attempts
  };
};

// Simular múltiplas tentativas
const simulateMultipleAttempts = (successRate: number, maxAttempts: number = 1000, numberOfSimulations: number = 5) => {
  const results = [];
  let totalAttempts = 0;
  let totalSuccesses = 0;
  let totalFailures = 0;
  
  for (let i = 0; i < numberOfSimulations; i++) {
    const result = simulateAttempts(successRate, maxAttempts);
    results.push(result);
    totalAttempts += result.attempts;
    if (result.success) {
      totalSuccesses++;
    } else {
      totalFailures++;
    }
  }
  
  const averageAttempts = Math.round(totalAttempts / numberOfSimulations);
  
  return {
    averageAttempts,
    totalSuccesses,
    totalFailures,
    successRate,
    maxAttemptsReached: results.some(r => r.maxAttemptsReached),
    individualResults: results.map(r => ({
      attempts: r.attempts,
      success: r.success,
      maxAttemptsReached: r.maxAttemptsReached,
      successRate: r.successRate
    })),
    executionTime: Date.now(),
    timestamp: new Date().toISOString()
  };
};

// Rota de simulação
app.post('/api/simulate', (req, res) => {
  try {
    const { successRate, maxAttempts = 1000 } = req.body;
    
    if (!successRate || successRate < 0 || successRate > 100) {
      return res.status(400).json({
        error: 'Porcentagem de sucesso deve ser um número entre 0 e 100'
      });
    }
    
    if (maxAttempts <= 0) {
      return res.status(400).json({
        error: 'Número máximo de tentativas deve ser um número positivo'
      });
    }
    
    const result = simulateMultipleAttempts(successRate, maxAttempts, 5);
    
    res.json(result);
  } catch (error) {
    console.error('Erro na simulação:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rota raiz da API
app.get('/api', (req, res) => {
  res.json({
    message: 'How Many Tries API',
    version: '1.0.0',
    description: 'API para simulação de tentativas baseado em porcentagem de sucesso',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    endpoints: {
      simulate: 'POST /api/simulate',
      health: 'GET /api/health'
    }
  });
});

// Middleware de tratamento de erros
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path,
    method: req.method
  });
});

app.use((error: any, req: any, res: any, next: any) => {
  console.error('Erro:', error);
  res.status(500).json({
    error: 'Erro interno do servidor'
  });
});

// Para Vercel, exportamos o app
export default app;
