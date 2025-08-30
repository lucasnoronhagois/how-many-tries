import { useState } from 'react'
import './App.css'

interface SimulationResult {
  averageAttempts: number
  totalSuccesses: number
  totalFailures: number
  successRate: number
  maxAttemptsReached: boolean
  individualResults: Array<{
    attempts: number
    success: boolean
    maxAttemptsReached: boolean
    successRate: number
  }>
  executionTime?: number
  timestamp?: string
}

function App() {
  const [successRate, setSuccessRate] = useState<string>('')
  const [maxAttempts, setMaxAttempts] = useState<string>('1000')
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const rate = parseFloat(successRate)
    const max = parseInt(maxAttempts)
    
    if (isNaN(rate) || rate < 0 || rate > 100) {
      setError('Success percentage must be a number between 0 and 100')
      return
    }
    
    if (isNaN(max) || max <= 0) {
      setError('Maximum attempts must be a positive number')
      return
    }
    
    setLoading(true)
    setLoadingProgress(0)
    setError('')
    setResult(null)
    
    // Simulates loading bar for exactly 2 seconds
    const startTime = Date.now()
    const loadingDuration = 2000 // 2 seconds in milliseconds
    
    const loadingInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / loadingDuration) * 100, 100)
      
      setLoadingProgress(Math.round(progress))
      
      if (progress >= 100) {
        clearInterval(loadingInterval)
      }
    }, 50) // Updates every 50ms for smoother movement
    
    try {
      // Local simulation instead of calling API
      const simulateAttempts = (successRate: number, maxAttempts: number = 1000) => {
        let currentAttempts = 0;
        let success = false;
        while (currentAttempts < maxAttempts) {
          currentAttempts++;
          const random = Math.random() * 100;
          if (random <= successRate) {
            success = true;
            break;
          }
        }
        return {
          attempts: currentAttempts,
          success: success,
          maxAttemptsReached: currentAttempts >= maxAttempts,
          successRate
        };
      };

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
      
      // Wait until 2 seconds are completed before showing the result
      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(loadingDuration - elapsed, 0)
      
      await new Promise(resolve => setTimeout(resolve, remainingTime))
      
      // Execute local simulation
      const result = simulateMultipleAttempts(rate, max, 5)
      setResult(result)
    } catch (err: any) {
      setError('Error in local simulation')
    } finally {
      clearInterval(loadingInterval)
      setLoadingProgress(100)
      setTimeout(() => {
        setLoading(false)
        setLoadingProgress(0)
      }, 500) // Small pause to show 100%
    }
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  return (
    <div className="container">
      {/* Form Panel */}
      <div className="form-panel">
        <h1 className="title">🎯 How Many Tries</h1>
        <p className="subtitle">
          Simulate how many attempts you need to achieve something based on a success percentage (5 simultaneous simulations)
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="successRate" className="label">
              Success Percentage (%)
            </label>
            <input
              type="number"
              id="successRate"
              className="input"
              value={successRate}
              onChange={(e) => setSuccessRate(e.target.value)}
              placeholder="Ex: 25 (for 25% chance)"
              step="0.01"
              min="0"
              max="100"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="maxAttempts" className="label">
              Maximum Attempts (optional)
            </label>
            <input
              type="number"
              id="maxAttempts"
              className="input"
              value={maxAttempts}
              onChange={(e) => setMaxAttempts(e.target.value)}
              placeholder="Ex: 1000"
              min="1"
            />
          </div>
          
          <button 
            type="submit" 
            className="button"
            disabled={loading || !successRate}
          >
            {loading ? 'Simulating...' : '🎲 Simulate 5 Attempts'}
          </button>
        </form>
        
        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {loading && (
          <div className="loading">
            <div className="loading-text">Running 5 simultaneous simulations...</div>
            <div className="loading-bar-container">
              <div className="loading-bar" style={{ width: `${loadingProgress}%` }}></div>
            </div>
            <div className="loading-percentage">{loadingProgress}%</div>
          </div>
        )}
      </div>

      {/* Results Panel */}
      <div className="result-panel">
        {result ? (
          <div className="result">
            <h3 className="result-title">📊 Results of 5 Simulations</h3>
            
            <div className="result-item">
              <span className="result-label">Average attempts:</span>
              <span className="result-value">{formatNumber(result.averageAttempts)}</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Successes:</span>
              <span className="result-value success">{result.totalSuccesses}/5</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Failures:</span>
              <span className="result-value failure">{result.totalFailures}/5</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Success percentage:</span>
              <span className="result-value">{result.successRate}%</span>
            </div>
            
            {result.maxAttemptsReached && (
              <div className="result-item">
                <span className="result-label">Limit reached:</span>
                <span className="result-value failure">Yes (some simulation)</span>
              </div>
            )}
            
            {result.totalSuccesses > 0 && (
              <div className="result-item">
                <span className="result-label">Theoretical probability:</span>
                <span className="result-value">
                  {((1 - Math.pow(1 - result.successRate / 100, result.averageAttempts)) * 100).toFixed(2)}%
                </span>
              </div>
            )}
            
            <div className="result-details">
              <h4>📋 Simulation Details:</h4>
              {result.individualResults.map((sim, index) => (
                <div key={index} className="simulation-detail">
                  <span className="simulation-number">Simulation {index + 1}:</span>
                  <span className={`simulation-result ${sim.success ? 'success' : 'failure'}`}>
                    {sim.success ? '✅' : '❌'} {formatNumber(sim.attempts)} attempts
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-result">
            <div className="empty-result-icon">🎯</div>
            <div className="empty-result-text">
              Enter a success percentage and click "Simulate" to see results here
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
