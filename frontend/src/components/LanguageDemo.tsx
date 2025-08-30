import React from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../hooks/useLanguage';
import { getLocale } from '../locales';

export const LanguageDemo: React.FC = () => {
  const { currentLocale, changeLanguage } = useLanguage();
  const t = getLocale(currentLocale);

  return (
    <div style={{ 
      padding: '20px', 
      background: '#f5f5f5', 
      borderRadius: '10px',
      margin: '20px 0',
      border: '1px solid #ddd'
    }}>
      <h3>🌐 Language Switcher Demo</h3>
      <p>Current language: <strong>{currentLocale.toUpperCase()}</strong></p>
      <p>Sample text: <em>{t.title}</em></p>
      
      <div style={{ marginTop: '15px' }}>
        <LanguageSwitcher 
          currentLocale={currentLocale} 
          onLocaleChange={changeLanguage} 
        />
      </div>
      
      <div style={{ 
        marginTop: '15px', 
        fontSize: '12px', 
        color: '#666',
        fontStyle: 'italic'
      }}>
        💡 The language preference is saved in localStorage and will persist across sessions.
      </div>
    </div>
  );
};

