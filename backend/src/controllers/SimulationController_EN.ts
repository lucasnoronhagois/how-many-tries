import { Request, Response } from 'express';
import { Simulation, SimulationRequest, MultipleSimulationResponse } from '../models/Simulation';
import { formatNumber, getElapsedTime } from '../utils/helpers';
import { appConfig } from '../config/app';

export class SimulationController {
  /**
   * Executes an attempt simulation
   * @param req - HTTP request
   * @param res - HTTP response
   */
  static async simulate(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();
    
    try {
      const { successRate, maxAttempts = 1000 }: SimulationRequest = req.body;
      
      console.log(`🎲 Starting 5 simultaneous simulations: ${successRate}% success rate, maximum ${maxAttempts} attempts`);
      
      // Validate parameters
      const validation = Simulation.validateParameters(successRate, maxAttempts);
      if (!validation.isValid) {
        console.warn(`⚠️  Validation failed: ${validation.error}`);
        res.status(400).json({
          error: validation.error
        });
        return;
      }
      
      // Execute 5 simultaneous simulations
      const result: MultipleSimulationResponse = Simulation.simulateMultipleAttempts(successRate, maxAttempts, 5);
      const elapsedTime = getElapsedTime(startTime);
      
      console.log(`✅ 5 simulations completed in ${elapsedTime}ms: Average of ${formatNumber(result.averageAttempts)} attempts (${result.totalSuccesses} successes, ${result.totalFailures} failures)`);
      
      res.json({
        ...result,
        executionTime: elapsedTime,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      const elapsedTime = getElapsedTime(startTime);
      console.error(`❌ Error in simulation after ${elapsedTime}ms:`, error);
      
      res.status(500).json({
        error: 'Internal server error',
        executionTime: elapsedTime,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Returns API information
   * @param req - HTTP request
   * @param res - HTTP response
   */
  static getApiInfo(req: Request, res: Response): void {
    res.json({
      message: appConfig.api.name,
      version: appConfig.api.version,
      description: appConfig.api.description,
      environment: appConfig.environment,
      endpoints: {
        'POST /simulate': 'Simulate attempts based on success percentage',
        'GET /health': 'Check server status',
        'GET /': 'API information'
      },
      parameters: {
        successRate: 'Success percentage (0-100)',
        maxAttempts: 'Maximum number of attempts (optional, default: 1000)'
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Checks API health status
   * @param req - HTTP request
   * @param res - HTTP response
   */
  static healthCheck(req: Request, res: Response): void {
    const uptime = process.uptime();
    
    res.json({
      status: 'OK',
      message: 'Server is running!',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(uptime),
      environment: appConfig.environment,
      version: appConfig.api.version
    });
  }
}
