import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { languageDict, Language } from '../utils/languageDict';

interface LanguageContextProps {
  currentLanguage: Language;
  switchLanguage: (lang: Language) => void;
  dict: typeof languageDict[Language];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // 优先读取localStorage，没有就用'en'
  const getDefaultLanguage = (): Language => {
    const saved = localStorage.getItem('language');
    if (saved === 'zh' || saved === 'en') return saved;
    return 'en';
  };
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getDefaultLanguage());

  const switchLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const dict = useMemo(() => languageDict[currentLanguage], [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, switchLanguage, dict }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}; 