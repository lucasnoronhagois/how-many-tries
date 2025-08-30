// Tipos globais da aplicação

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  statusCode?: number;
  timestamp?: string;
}

export interface HealthCheckResponse {
  status: string;
  message: string;
  timestamp: string;
  uptime: number;
  environment: string;
}

export interface ApiInfoResponse {
  message: string;
  version: string;
  endpoints: Record<string, string>;
  parameters?: Record<string, string>;
}

// Extensão do Express Request para incluir dados customizados
declare global {
  namespace Express {
    interface Request {
      user?: any; // Para futuras implementações de autenticação
      startTime?: number; // Para logging de performance
    }
  }
}
