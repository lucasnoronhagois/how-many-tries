/**
 * Utilitários e funções auxiliares
 */

/**
 * Formata um número para exibição com separadores de milhares
 * @param num - Número a ser formatado
 * @param locale - Localização (padrão: 'pt-BR')
 * @returns Número formatado
 */
export const formatNumber = (num: number, locale: string = 'pt-BR'): string => {
  return num.toLocaleString(locale);
};

/**
 * Gera um ID único
 * @returns ID único
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Valida se uma string é um número válido
 * @param value - Valor a ser validado
 * @returns true se for um número válido
 */
export const isValidNumber = (value: any): boolean => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Calcula o tempo decorrido desde um timestamp
 * @param startTime - Timestamp de início
 * @returns Tempo decorrido em milissegundos
 */
export const getElapsedTime = (startTime: number): number => {
  return Date.now() - startTime;
};

/**
 * Formata um tempo em milissegundos para uma string legível
 * @param ms - Tempo em milissegundos
 * @returns String formatada
 */
export const formatDuration = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  return `${(ms / 60000).toFixed(2)}min`;
};

/**
 * Sanitiza uma string removendo caracteres especiais
 * @param str - String a ser sanitizada
 * @returns String sanitizada
 */
export const sanitizeString = (str: string): string => {
  return str.replace(/[<>]/g, '');
};
