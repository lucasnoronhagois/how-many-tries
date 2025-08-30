# 🌐 Sistema de Idiomas - How Many Tries

Documentação completa do sistema de internacionalização implementado no projeto.

## 📋 Visão Geral

O projeto implementa um sistema completo de internacionalização (i18n) que permite alternar entre **português** e **inglês** de forma instantânea, com persistência da preferência do usuário.

## 🏗️ Arquitetura

### Estrutura de Arquivos

```
frontend/src/
├── locales/
│   ├── index.ts      # Exportações e tipos
│   ├── pt.ts         # Traduções em português
│   └── en.ts         # Traduções em inglês
├── components/
│   ├── LanguageSwitcher.tsx  # Componente do botão
│   └── LanguageDemo.tsx      # Componente de demonstração
├── hooks/
│   └── useLanguage.ts        # Hook personalizado
└── App.tsx                   # Aplicação principal
```

## 🔧 Implementação

### 1. Arquivos de Tradução

#### `locales/pt.ts`
```typescript
export const pt = {
  title: "🎯 How Many Tries",
  subtitle: "Simule quantas tentativas...",
  successRateLabel: "Porcentagem de Sucesso (%)",
  // ... mais traduções
};
```

#### `locales/en.ts`
```typescript
export const en = {
  title: "🎯 How Many Tries",
  subtitle: "Simulate how many attempts...",
  successRateLabel: "Success Percentage (%)",
  // ... mais traduções
};
```

### 2. Hook Personalizado

#### `hooks/useLanguage.ts`
```typescript
export const useLanguage = () => {
  const [currentLocale, setCurrentLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return (saved as Locale) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, currentLocale);
  }, [currentLocale]);

  return { currentLocale, changeLanguage };
};
```

### 3. Componente de Troca

#### `components/LanguageSwitcher.tsx`
```typescript
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLocale,
  onLocaleChange
}) => {
  const nextLocale = currentLocale === 'pt' ? 'en' : 'pt';
  const buttonText = currentLocale === 'pt' ? 'EN' : 'PT';

  return (
    <button className="language-switcher" onClick={() => onLocaleChange(nextLocale)}>
      <span className="language-icon">🌐</span>
      <span className="language-text">{buttonText}</span>
    </button>
  );
};
```

## 🎨 Estilos CSS

### Botão de Idioma
```css
.language-switcher {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 8px 16px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.language-switcher:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

## 📱 Responsividade

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .language-switcher {
    padding: 6px 12px;
    font-size: 12px;
  }
}
```

## 🔄 Como Usar

### 1. No Componente Principal
```typescript
import { useLanguage } from './hooks/useLanguage';
import { getLocale } from './locales';

function App() {
  const { currentLocale, changeLanguage } = useLanguage();
  const t = getLocale(currentLocale);

  return (
    <div className="container">
      <div className="header">
        <LanguageSwitcher 
          currentLocale={currentLocale} 
          onLocaleChange={changeLanguage} 
        />
      </div>
      {/* Resto da aplicação usando 't' para traduções */}
    </div>
  );
}
```

### 2. Usando Traduções
```typescript
// Em vez de texto hardcoded
<h1>🎯 How Many Tries</h1>

// Use a tradução
<h1>{t.title}</h1>
```

### 3. Formatação de Números
```typescript
const formatNumber = (num: number) => {
  return num.toLocaleString(currentLocale === 'pt' ? 'pt-BR' : 'en-US');
};
```

## 📊 Funcionalidades

### ✅ Implementado
- [x] Troca instantânea entre PT/EN
- [x] Persistência no localStorage
- [x] Interface completa traduzida
- [x] Formatação de números localizada
- [x] Design responsivo
- [x] Animações suaves
- [x] Acessibilidade (aria-label, title)

### 🔄 Próximas Melhorias
- [ ] Detecção automática do idioma do navegador
- [ ] Mais idiomas (espanhol, francês, etc.)
- [ ] Tradução dinâmica via API
- [ ] Pluralização automática
- [ ] Formatação de datas localizada

## 🧪 Testando

### 1. Troca de Idioma
1. Abra a aplicação
2. Clique no botão **🌐 PT/EN** no canto superior direito
3. Verifique se toda a interface muda instantaneamente

### 2. Persistência
1. Troque o idioma
2. Recarregue a página (F5)
3. Verifique se o idioma escolhido permanece

### 3. Formatação de Números
1. Execute uma simulação
2. Troque o idioma
3. Verifique se os números mudam de formato:
   - **PT**: `1.234,56`
   - **EN**: `1,234.56`

## 🐛 Troubleshooting

### Problema: Idioma não persiste
**Solução**: Verifique se o localStorage está habilitado no navegador

### Problema: Traduções não aparecem
**Solução**: Verifique se os arquivos de tradução estão sendo importados corretamente

### Problema: Botão não funciona
**Solução**: Verifique se o hook `useLanguage` está sendo usado corretamente

## 📚 Recursos

- **Documentação Vite**: [vitejs.dev/guide/env-and-mode](https://vitejs.dev/guide/env-and-mode)
- **MDN Intl**: [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- **React i18n**: [react.i18next.com](https://react.i18next.com)

---

🎉 **O sistema de idiomas está funcionando perfeitamente!**

