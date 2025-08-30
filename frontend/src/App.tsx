import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { Locale, getLocale } from './locales'
import { useLanguage } from './hooks/useLanguage'

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
  const { currentLocale, changeLanguage } = useLanguage()
  const [successRate, setSuccessRate] = useState<string>('')
  const [maxAttempts, setMaxAttempts] = useState<string>('1000')
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState<string>('')

  const t = getLocale(currentLocale)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const rate = parseFloat(successRate)
    const max = parseInt(maxAttempts)
    
    if (isNaN(rate) || rate < 0 || rate > 100) {
      setError(t.successRateError)
      return
    }
    
    if (isNaN(max) || max <= 0) {
      setError(t.maxAttemptsError)
      return
    }
    
    setLoading(true)
    setLoadingProgress(0)
    setError('')
    setResult(null)
    
    // Inicia a barra de loading por exatamente 2 segundos
    const startTime = Date.now()
    const loadingDuration = 2000 // 2 segundos em milissegundos
    
    const loadingInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / loadingDuration) * 100, 100)
      
      setLoadingProgress(progress)
      
      if (progress >= 100) {
        clearInterval(loadingInterval)
      }
    }, 50) // Atualiza a cada 50ms para movimento mais suave
    
    try {
      // Use environment variable for API URL or default to localhost
      const apiUrl = import.meta.env.VITE_API_URL || '/api'
      const response = await axios.post(`${apiUrl}/simulate`, {
        successRate: rate,
        maxAttempts: max
      })
      
      // Aguarda até completar os 2 segundos antes de mostrar o resultado
      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(loadingDuration - elapsed, 0)
      
      await new Promise(resolve => setTimeout(resolve, remainingTime))
      
      setResult(response.data)
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else {
        setError(t.serverError)
      }
    } finally {
      clearInterval(loadingInterval)
      setLoadingProgress(100)
      setTimeout(() => {
        setLoading(false)
        setLoadingProgress(0)
      }, 500) // Pequena pausa para mostrar 100%
    }
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString(currentLocale === 'pt' ? 'pt-BR' : 'en-US')
  }

    return (
    <div className="container">
      {/* Header com botão de idioma */}
      <div className="header">
        <LanguageSwitcher 
          currentLocale={currentLocale} 
          onLocaleChange={changeLanguage} 
        />
      </div>
      
            {/* Conteúdo Principal */}
      <div className="main-content">
        {/* Painel do Formulário */}
        <div className="form-panel">
          <h1 className="title">{t.title}</h1>
          <p className="subtitle">
            {t.subtitle}
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="successRate" className="label">
                {t.successRateLabel}
              </label>
              <input
                type="number"
                id="successRate"
                className="input"
                value={successRate}
                onChange={(e) => setSuccessRate(e.target.value)}
                placeholder={t.successRatePlaceholder}
                step="0.01"
                min="0"
                max="100"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="maxAttempts" className="label">
                {t.maxAttemptsLabel}
              </label>
              <input
                type="number"
                id="maxAttempts"
                className="input"
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(e.target.value)}
                placeholder={t.maxAttemptsPlaceholder}
                min="1"
              />
            </div>
            
            <button 
              type="submit" 
              className="button"
              disabled={loading || !successRate}
            >
              {loading ? t.simulatingButton : t.simulateButton}
            </button>
          </form>
          
          {error && (
            <div className="error">
              <strong>{t.errorTitle}</strong> {error}
            </div>
          )}
          
          {loading && (
            <div className="loading">
              <div className="loading-text">{t.loadingText}</div>
              <div className="loading-bar-container">
                <div className="loading-bar" style={{ width: `${loadingProgress}%` }}></div>
              </div>
              <div className="loading-percentage">{loadingProgress}%</div>
            </div>
          )}
        </div>

        {/* Painel de Resultados */}
        <div className="result-panel">
                {result ? (
          <div className="result">
            <h3 className="result-title">{t.resultsTitle}</h3>
            
            <div className="result-item">
              <span className="result-label">{t.averageAttempts}</span>
              <span className="result-value">{formatNumber(result.averageAttempts)}</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">{t.successes}</span>
              <span className="result-value success">{result.totalSuccesses}/5</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">{t.failures}</span>
              <span className="result-value failure">{result.totalFailures}/5</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">{t.successPercentage}</span>
              <span className="result-value">{result.successRate}%</span>
            </div>
            
            {result.maxAttemptsReached && (
              <div className="result-item">
                <span className="result-label">{t.limitReached}</span>
                <span className="result-value failure">{t.limitReachedValue}</span>
              </div>
            )}
            
            {result.totalSuccesses > 0 && (
              <div className="result-item">
                <span className="result-label">{t.theoreticalProbability}</span>
                <span className="result-value">
                  {((1 - Math.pow(1 - result.successRate / 100, result.averageAttempts)) * 100).toFixed(2)}%
                </span>
              </div>
            )}
            
            <div className="result-details">
              <h4>{t.simulationDetails}</h4>
              {result.individualResults.map((sim, index) => (
                <div key={index} className="simulation-detail">
                  <span className="simulation-number">{t.simulation} {index + 1}:</span>
                  <span className={`simulation-result ${sim.success ? 'success' : 'failure'}`}>
                    {sim.success ? '✅' : '❌'} {formatNumber(sim.attempts)} {t.attempts}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-result">
            <div className="empty-result-icon">{t.emptyResultIcon}</div>
            <div className="empty-result-text">
              {t.emptyResultText}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default App
