import { Request, Response } from 'express';
import { Simulation, SimulationRequest, MultipleSimulationResponse } from '../models/Simulation';
import { formatNumber, getElapsedTime } from '../utils/helpers';
import { appConfig } from '../config/app';

export class SimulationController {
  /**
   * Executa uma simulação de tentativas
   * @param req - Requisição HTTP
   * @param res - Resposta HTTP
   */
  static async simulate(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();
    
    try {
      const { successRate, maxAttempts = 1000 }: SimulationRequest = req.body;
      
      console.log(`🎲 Iniciando 5 simulações simultâneas: ${successRate}% de sucesso, máximo ${maxAttempts} tentativas`);
      
      // Valida os parâmetros
      const validation = Simulation.validateParameters(successRate, maxAttempts);
      if (!validation.isValid) {
        console.warn(`⚠️  Validação falhou: ${validation.error}`);
        res.status(400).json({
          error: validation.error
        });
        return;
      }
      
                // Executa 5 simulações simultâneas
          const result: MultipleSimulationResponse = Simulation.simulateMultipleAttempts(successRate, maxAttempts, 5);
      const elapsedTime = getElapsedTime(startTime);
      
                console.log(`✅ 5 simulações concluídas em ${elapsedTime}ms: Média de ${formatNumber(result.averageAttempts)} tentativas (${result.totalSuccesses} sucessos, ${result.totalFailures} falhas)`);
      
      res.json({
        ...result,
        executionTime: elapsedTime,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      const elapsedTime = getElapsedTime(startTime);
      console.error(`❌ Erro na simulação após ${elapsedTime}ms:`, error);
      
      res.status(500).json({
        error: 'Erro interno do servidor',
        executionTime: elapsedTime,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Retorna informações sobre a API
   * @param req - Requisição HTTP
   * @param res - Resposta HTTP
   */
  static getApiInfo(req: Request, res: Response): void {
    res.json({
      message: appConfig.api.name,
      version: appConfig.api.version,
      description: appConfig.api.description,
      environment: appConfig.environment,
      endpoints: {
        'POST /simulate': 'Simula tentativas baseado em porcentagem de sucesso',
        'GET /health': 'Verifica status do servidor',
        'GET /': 'Informações da API'
      },
      parameters: {
        successRate: 'Porcentagem de sucesso (0-100)',
        maxAttempts: 'Número máximo de tentativas (opcional, padrão: 1000)'
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Verifica o status de saúde da API
   * @param req - Requisição HTTP
   * @param res - Resposta HTTP
   */
  static healthCheck(req: Request, res: Response): void {
    const uptime = process.uptime();
    
    res.json({
      status: 'OK',
      message: 'Servidor funcionando!',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(uptime),
      environment: appConfig.environment,
      version: appConfig.api.version
    });
  }
}
