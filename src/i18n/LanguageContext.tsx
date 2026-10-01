import { createContext, useContext } from 'react';
import { translations, DEFAULT_LANG } from './translations';
import type { Lang, Translation } from './translations';

export const LanguageContext = createContext<Lang>(DEFAULT_LANG);

export const useTranslation = (): Translation => translations[useContext(LanguageContext)];
