import { useState, useEffect } from 'react';
import { Locale } from '../locales';

const LANGUAGE_KEY = 'how-many-tries-language';

export const useLanguage = () => {
  const [currentLocale, setCurrentLocale] = useState<Locale>(() => {
    // Tenta recuperar o idioma salvo no localStorage
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return (saved as Locale) || 'pt';
  });

  // Salva o idioma no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, currentLocale);
  }, [currentLocale]);

  const changeLanguage = (locale: Locale) => {
    setCurrentLocale(locale);
  };

  return {
    currentLocale,
    changeLanguage
  };
};

