import React, { useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { BusinessCardInfo } from '../utils/canvasUtils';

/**
 * 名片表单组件Props接口
 */
interface BusinessCardFormProps {
  cardInfo: BusinessCardInfo;
  onCardInfoChange: (info: BusinessCardInfo) => void;
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  selectedFont: string;
  onFontChange: (font: string) => void;
}

/**
 * 名片表单组件
 */
const BusinessCardForm: React.FC<BusinessCardFormProps> = ({
  cardInfo,
  onCardInfoChange,
  selectedTemplate,
  onTemplateChange,
  selectedFont,
  onFontChange,
}) => {
  const { dict } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * 处理输入字段变化
   */
  const handleInputChange = (field: keyof BusinessCardInfo, value: string) => {
    onCardInfoChange({
      ...cardInfo,
      [field]: value,
    });
  };

  /**
   * 处理Logo上传
   */
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange('logo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * 触发文件选择
   */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {dict.title}
      </h2>

      {/* 基本信息 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.name}
          </label>
          <input
            type="text"
            value={cardInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder={dict.placeholder.name}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.jobTitle}
          </label>
          <input
            type="text"
            value={cardInfo.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            placeholder={dict.placeholder.jobTitle}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.phone}
          </label>
          <input
            type="tel"
            value={cardInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder={dict.placeholder.phone}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.email}
          </label>
          <input
            type="email"
            value={cardInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={dict.placeholder.email}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.company}
          </label>
          <input
            type="text"
            value={cardInfo.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder={dict.placeholder.company}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.address}
          </label>
          <input
            type="text"
            value={cardInfo.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder={dict.placeholder.address}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.website}
          </label>
          <input
            type="text"
            value={cardInfo.website || ''}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder={dict.placeholder.website}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Logo上传 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {dict.uploadLogo}
        </label>
        <button
          type="button"
          onClick={handleUploadClick}
          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-gray-600 hover:text-primary-600"
        >
          {cardInfo.logo ? dict.changeLogoBtn : dict.uploadLogoBtn}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
        {cardInfo.logo && (
          <div className="mt-2 flex items-center space-x-2">
            <img
              src={cardInfo.logo}
              alt="Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-green-600">Logo 已上传</span>
          </div>
        )}
      </div>

      {/* 模板选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {dict.template}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['template1', 'template2', 'template3'].map((template) => (
            <button
              key={template}
              onClick={() => onTemplateChange(template)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedTemplate === template
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {dict[template as keyof typeof dict] as string}
            </button>
          ))}
        </div>
      </div>

      {/* 字体选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {dict.font}
        </label>
        <select
          value={selectedFont}
          onChange={(e) => onFontChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
        >
          {['font1', 'font2', 'font3', 'font4', 'font5', 'font6'].map((font) => (
            <option key={font} value={font}>
              {dict[font as keyof typeof dict] as string}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BusinessCardForm; 