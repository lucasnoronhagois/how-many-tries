export interface SimulationRequest {
  successRate: number; // Success percentage (0-100)
  maxAttempts?: number; // Maximum number of attempts (optional)
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
   * Simulates attempts based on a success percentage
   * @param successRate - Success percentage (0-100)
   * @param maxAttempts - Maximum number of attempts (default: 1000)
   * @returns Simulation result
   */
  static simulateAttempts(successRate: number, maxAttempts: number = 1000): SimulationResponse {
    const probability = successRate / 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      attempts++;
      
      // Generate a random number between 0 and 1
      const random = Math.random();
      
      // If the random number is less than the probability, success!
      if (random <= probability) {
        return {
          attempts,
          success: true,
          maxAttemptsReached: false,
          successRate
        };
      }
    }
    
    // If reached maximum attempts without success
    return {
      attempts: maxAttempts,
      success: false,
      maxAttemptsReached: true,
      successRate
    };
  }

  /**
   * Validates simulation parameters
   * @param successRate - Success percentage
   * @param maxAttempts - Maximum number of attempts
   * @returns Object with validation status and error message (if any)
   */
  static validateParameters(successRate: number, maxAttempts?: number): { isValid: boolean; error?: string } {
    if (typeof successRate !== 'number' || successRate < 0 || successRate > 100) {
      return {
        isValid: false,
        error: 'Success percentage must be a number between 0 and 100'
      };
    }
    
    if (maxAttempts && (typeof maxAttempts !== 'number' || maxAttempts <= 0)) {
      return {
        isValid: false,
        error: 'Maximum number of attempts must be a positive number'
      };
    }
    
    return { isValid: true };
  }

  /**
   * Calculates theoretical probability of success after n attempts
   * @param successRate - Success percentage per attempt
   * @param attempts - Number of attempts
   * @returns Theoretical probability as percentage
   */
  static calculateTheoreticalProbability(successRate: number, attempts: number): number {
    const probability = successRate / 100;
    return (1 - Math.pow(1 - probability, attempts)) * 100;
  }

  /**
   * Executes multiple simultaneous simulations and returns the average
   * @param successRate - Success percentage (0-100)
   * @param maxAttempts - Maximum number of attempts (default: 1000)
   * @param numberOfSimulations - Number of simulations to run (default: 5)
   * @returns Result with average attempts
   */
  static simulateMultipleAttempts(
    successRate: number, 
    maxAttempts: number = 1000, 
    numberOfSimulations: number = 5
  ): MultipleSimulationResponse {
    const results: SimulationResponse[] = [];
    
    // Execute simulations
    for (let i = 0; i < numberOfSimulations; i++) {
      results.push(this.simulateAttempts(successRate, maxAttempts));
    }
    
    // Calculate statistics
    const successfulResults = results.filter(r => r.success);
    const failedResults = results.filter(r => !r.success);
    
    const totalSuccesses = successfulResults.length;
    const totalFailures = failedResults.length;
    
    // Calculate average only of successful results
    const averageAttempts = successfulResults.length > 0 
      ? successfulResults.reduce((sum, result) => sum + result.attempts, 0) / successfulResults.length
      : maxAttempts; // If no simulation was successful, use maximum attempts
    
    // Check if any simulation reached the maximum limit
    const maxAttemptsReached = results.some(r => r.maxAttemptsReached);
    
    return {
      averageAttempts: Math.round(averageAttempts * 100) / 100, // Round to 2 decimal places
      totalSuccesses,
      totalFailures,
      successRate,
      maxAttemptsReached,
      individualResults: results
    };
  }
}
