import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../utils/languageDict';

/**
 * 语言切换组件
 */
const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, switchLanguage } = useLanguage();

  /**
   * 切换语言
   */
  const handleLanguageSwitch = () => {
    const newLanguage: Language = currentLanguage === 'zh' ? 'en' : 'zh';
    switchLanguage(newLanguage);
  };

  return (
    <button
      onClick={handleLanguageSwitch}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg hover:bg-white transition-all duration-200 text-sm font-medium text-gray-700 hover:text-gray-900"
    >
      {currentLanguage === 'zh' ? 'English' : '简体中文'}
    </button>
  );
};

export default LanguageSwitcher; 