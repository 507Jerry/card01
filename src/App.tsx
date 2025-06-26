import React, { useState } from 'react';
import LanguageSwitcher from './components/LanguageSwitcher';
import BusinessCardForm from './components/BusinessCardForm';
import BusinessCardCanvas from './components/BusinessCardCanvas';
import { BusinessCardInfo } from './utils/canvasUtils';
import { downloadImage } from './utils/canvasUtils';
import { useLanguage } from './hooks/useLanguage';
import './index.css';

/**
 * 主应用组件
 */
const App: React.FC = () => {
  const [cardInfo, setCardInfo] = useState<BusinessCardInfo>({
    name: '',
    jobTitle: '',
    phone: '',
    email: '',
    company: '',
    address: '',
    website: '',
    logo: '',
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [selectedFont, setSelectedFont] = useState('font1');
  const [cardBase64, setCardBase64] = useState('');
  const { dict } = useLanguage();

  /**
   * 处理名片信息变化
   */
  const handleCardInfoChange = (info: BusinessCardInfo) => {
    setCardInfo(info);
  };

  /**
   * 处理名片生成完成
   */
  const handleCardGenerated = (base64: string) => {
    setCardBase64(base64);
  };

  /**
   * 下载名片图片
   */
  const handleDownloadCard = () => {
    if (cardBase64) {
      downloadImage(cardBase64, `${cardInfo.name || 'business-card'}.png`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <LanguageSwitcher />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧表单 */}
            <div className="space-y-6">
              <BusinessCardForm
                cardInfo={cardInfo}
                onCardInfoChange={handleCardInfoChange}
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
                selectedFont={selectedFont}
                onFontChange={setSelectedFont}
              />
            </div>

            {/* 右侧预览和下载 */}
            <div className="space-y-6">
              <BusinessCardCanvas
                cardInfo={cardInfo}
                selectedTemplate={selectedTemplate}
                selectedFont={selectedFont}
                onCardGenerated={handleCardGenerated}
              />
              <div className="flex justify-center">
                <button
                  onClick={handleDownloadCard}
                  disabled={!cardBase64}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg shadow hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
                >
                  {dict.downloadCard}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 