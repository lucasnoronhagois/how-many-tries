import { pt } from './pt';
import { en } from './en';

export type Locale = 'pt' | 'en';
export type LocaleData = typeof pt;

export const locales = {
  pt,
  en
};

export const getLocale = (locale: Locale): LocaleData => {
  return locales[locale];
};

