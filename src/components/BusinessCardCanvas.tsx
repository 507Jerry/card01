import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { BusinessCardInfo, drawBusinessCard } from '../utils/canvasUtils';

/**
 * 名片Canvas组件Props接口
 */
interface BusinessCardCanvasProps {
  cardInfo: BusinessCardInfo;
  selectedTemplate: string;
  selectedFont: string;
  onCardGenerated: (base64: string) => void;
}

/**
 * 名片Canvas绘制组件
 */
const BusinessCardCanvas: React.FC<BusinessCardCanvasProps> = ({
  cardInfo,
  selectedTemplate,
  selectedFont,
  onCardGenerated,
}) => {
  const { dict } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  /**
   * 生成名片
   */
  const generateCard = async () => {
    if (!canvasRef.current) return;

    setIsGenerating(true);
    try {
      const base64 = await drawBusinessCard(
        canvasRef.current,
        cardInfo,
        selectedTemplate,
        selectedFont
      );
      setPreviewUrl(base64);
      onCardGenerated(base64);
    } catch (error) {
      console.error('生成名片失败:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 当信息变化时自动重新生成
  useEffect(() => {
    if (cardInfo.name || cardInfo.jobTitle || cardInfo.phone || cardInfo.email || cardInfo.company) {
      generateCard();
    }
  }, [cardInfo, selectedTemplate, selectedFont]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">{dict.preview}</h3>
        {isGenerating && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <span>{dict.generating}</span>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={1050}
            height={600}
            className="max-w-full h-auto border border-gray-200 rounded-lg shadow-sm"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
          {previewUrl && (
            <div className="mt-4 text-center">
              <p className="text-sm text-green-600 mb-2">{dict.generated}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessCardCanvas; 