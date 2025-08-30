// Configurações da aplicação
export const appConfig = {
  port: process.env.PORT || 3001,
  environment: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'https://*.vercel.app'],
    credentials: true
  },
  api: {
    version: '1.0.0',
    name: 'How Many Tries API',
    description: 'API para simulação de tentativas baseado em porcentagem de sucesso'
  }
};

// Função para validar configurações
export const validateConfig = (): void => {
  const requiredEnvVars: string[] = [];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.warn(`⚠️  Variável de ambiente ${envVar} não definida`);
    }
  }
};
