import express from 'express';
import cors from 'cors';
import simulationRoutes from './routes/simulationRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { appConfig, validateConfig } from './config/app';
import { initializeDatabase } from './config/database';

// Valida configurações
validateConfig();

const app = express();

// Middleware
app.use(cors(appConfig.cors));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rotas
app.use('/api', simulationRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: appConfig.api.name,
    version: appConfig.api.version,
    description: appConfig.api.description,
    environment: appConfig.environment,
    timestamp: new Date().toISOString()
  });
});

// Middleware de tratamento de erros
app.use(notFoundHandler);
app.use(errorHandler);

// Inicialização do servidor
const startServer = async (): Promise<void> => {
  try {
    // Inicializa banco de dados (se necessário)
    await initializeDatabase();
    
    // Inicia o servidor
    app.listen(appConfig.port, () => {
      console.log(`🚀 Servidor rodando na porta ${appConfig.port}`);
      console.log(`📊 API disponível em http://localhost:${appConfig.port}`);
      console.log(`🌍 Ambiente: ${appConfig.environment}`);
      console.log(`📋 Documentação: http://localhost:${appConfig.port}/api`);
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:', error);
    process.exit(1);
  }
};

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Inicia o servidor
startServer();
