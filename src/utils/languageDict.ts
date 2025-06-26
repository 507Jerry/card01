/**
 * 多语言字典配置
 */
export const languageDict = {
  zh: {
    // 页面标题
    title: '电子名片二维码生成器',
    
    // 表单字段
    name: '姓名',
    jobTitle: '职位',
    phone: '电话',
    email: '邮箱',
    company: '公司名称',
    address: '公司地址',
    website: '公司网站',
    uploadLogo: '上传 Logo',
    
    // 按钮
    generate: '生成名片',
    downloadQR: '下载二维码',
    preview: '预览',
    downloadCard: '下载名片图片',
    
    // 模板选择
    template: '选择模板',
    template1: '商务简约',
    template2: '现代科技',
    template3: '经典优雅',
    
    // 字体选择
    font: '选择字体',
    font1: '思源黑体',
    font2: '微软雅黑',
    font3: '苹方',
    font4: 'Arial',
    font5: 'Helvetica',
    font6: 'Georgia',
    
    // 提示信息
    placeholder: {
      name: '请输入您的姓名',
      jobTitle: '请输入您的职位',
      phone: '请输入您的电话号码',
      email: '请输入您的邮箱地址',
      company: '请输入您的公司名称',
      address: '请输入公司地址',
      website: '请输入公司网站',
    },
    
    // 状态信息
    generating: '正在生成...',
    generated: '生成完成',
    downloading: '正在下载...',
    uploadSuccess: '上传成功',
    uploadError: '上传失败，请重试',
    
    // 语言切换
    language: '简体中文',
    switchToEnglish: 'Switch to English',
    uploadLogoBtn: '点击上传 Logo',
    changeLogoBtn: '更换 Logo',
  },
  
  en: {
    // 页面标题
    title: 'Business Card QR Generator',
    
    // 表单字段
    name: 'Name',
    jobTitle: 'Title',
    phone: 'Phone',
    email: 'Email',
    company: 'Company',
    address: 'Company Address',
    website: 'Company Website',
    uploadLogo: 'Upload Logo',
    
    // 按钮
    generate: 'Generate Card',
    downloadQR: 'Download QR Code',
    preview: 'Preview',
    downloadCard: 'Download Card Image',
    
    // 模板选择
    template: 'Select Template',
    template1: 'Business Simple',
    template2: 'Modern Tech',
    template3: 'Classic Elegant',
    
    // 字体选择
    font: 'Select Font',
    font1: 'Source Han Sans',
    font2: 'Microsoft YaHei',
    font3: 'PingFang SC',
    font4: 'Arial',
    font5: 'Helvetica',
    font6: 'Georgia',
    
    // 提示信息
    placeholder: {
      name: 'Enter your name',
      jobTitle: 'Enter your job title',
      phone: 'Enter your phone number',
      email: 'Enter your email address',
      company: 'Enter your company name',
      address: 'Enter company address',
      website: 'Enter company website',
    },
    
    // 状态信息
    generating: 'Generating...',
    generated: 'Generated successfully',
    downloading: 'Downloading...',
    uploadSuccess: 'Upload successful',
    uploadError: 'Upload failed, please try again',
    
    // 语言切换
    language: 'English',
    switchToChinese: '切换到简体中文',
    uploadLogoBtn: 'Click to upload Logo',
    changeLogoBtn: 'Change Logo',
  }
};

export type Language = 'zh' | 'en';
export type LanguageDict = typeof languageDict; 