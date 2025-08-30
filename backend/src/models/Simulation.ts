export interface SimulationRequest {
  successRate: number; // Porcentagem de sucesso (0-100)
  maxAttempts?: number; // Número máximo de tentativas (opcional)
}

export interface SimulationResponse {
  attempts: number;
  success: boolean;
  maxAttemptsReached: boolean;
  successRate: number;
}

export interface MultipleSimulationResponse {
  averageAttempts: number;
  totalSuccesses: number;
  totalFailures: number;
  successRate: number;
  maxAttemptsReached: boolean;
  individualResults: SimulationResponse[];
}

export class Simulation {
  /**
   * Simula tentativas baseado em uma porcentagem de sucesso
   * @param successRate - Porcentagem de sucesso (0-100)
   * @param maxAttempts - Número máximo de tentativas (padrão: 1000)
   * @returns Resultado da simulação
   */
  static simulateAttempts(successRate: number, maxAttempts: number = 1000): SimulationResponse {
    const probability = successRate / 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      attempts++;
      
      // Gera um número aleatório entre 0 e 1
      const random = Math.random();
      
      // Se o número aleatório for menor que a probabilidade, sucesso!
      if (random <= probability) {
        return {
          attempts,
          success: true,
          maxAttemptsReached: false,
          successRate
        };
      }
    }
    
    // Se chegou ao máximo de tentativas sem sucesso
    return {
      attempts: maxAttempts,
      success: false,
      maxAttemptsReached: true,
      successRate
    };
  }

  /**
   * Valida os parâmetros da simulação
   * @param successRate - Porcentagem de sucesso
   * @param maxAttempts - Número máximo de tentativas
   * @returns Objeto com status de validação e mensagem de erro (se houver)
   */
  static validateParameters(successRate: number, maxAttempts?: number): { isValid: boolean; error?: string } {
    if (typeof successRate !== 'number' || successRate < 0 || successRate > 100) {
      return {
        isValid: false,
        error: 'Porcentagem de sucesso deve ser um número entre 0 e 100'
      };
    }
    
    if (maxAttempts && (typeof maxAttempts !== 'number' || maxAttempts <= 0)) {
      return {
        isValid: false,
        error: 'Número máximo de tentativas deve ser um número positivo'
      };
    }
    
    return { isValid: true };
  }

  /**
   * Calcula a probabilidade teórica de sucesso após n tentativas
   * @param successRate - Porcentagem de sucesso por tentativa
   * @param attempts - Número de tentativas
   * @returns Probabilidade teórica em porcentagem
   */
  static calculateTheoreticalProbability(successRate: number, attempts: number): number {
    const probability = successRate / 100;
    return (1 - Math.pow(1 - probability, attempts)) * 100;
  }

  /**
   * Executa múltiplas simulações simultâneas e retorna a média
   * @param successRate - Porcentagem de sucesso (0-100)
   * @param maxAttempts - Número máximo de tentativas (padrão: 1000)
   * @param numberOfSimulations - Número de simulações a executar (padrão: 5)
   * @returns Resultado com média das tentativas
   */
  static simulateMultipleAttempts(
    successRate: number, 
    maxAttempts: number = 1000, 
    numberOfSimulations: number = 5
  ): MultipleSimulationResponse {
    const results: SimulationResponse[] = [];
    
    // Executa as simulações
    for (let i = 0; i < numberOfSimulations; i++) {
      results.push(this.simulateAttempts(successRate, maxAttempts));
    }
    
    // Calcula estatísticas
    const successfulResults = results.filter(r => r.success);
    const failedResults = results.filter(r => !r.success);
    
    const totalSuccesses = successfulResults.length;
    const totalFailures = failedResults.length;
    
    // Calcula média apenas dos resultados com sucesso
    const averageAttempts = successfulResults.length > 0 
      ? successfulResults.reduce((sum, result) => sum + result.attempts, 0) / successfulResults.length
      : maxAttempts; // Se nenhuma simulação teve sucesso, usa o máximo de tentativas
    
    // Verifica se alguma simulação atingiu o limite máximo
    const maxAttemptsReached = results.some(r => r.maxAttemptsReached);
    
    return {
      averageAttempts: Math.round(averageAttempts * 100) / 100, // Arredonda para 2 casas decimais
      totalSuccesses,
      totalFailures,
      successRate,
      maxAttemptsReached,
      individualResults: results
    };
  }
}
