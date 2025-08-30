import React from 'react';
import { Locale } from '../locales';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLocale,
  onLocaleChange
}) => {
  const nextLocale = currentLocale === 'pt' ? 'en' : 'pt';
  const buttonText = currentLocale === 'pt' ? 'EN' : 'PT';
  const tooltipText = currentLocale === 'pt' ? 'Switch to English' : 'Mudar para Português';

  return (
    <button
      className="language-switcher"
      onClick={() => onLocaleChange(nextLocale)}
      title={tooltipText}
      aria-label={tooltipText}
    >
      <span className="language-icon">🌐</span>
      <span className="language-text">{buttonText}</span>
    </button>
  );
};

