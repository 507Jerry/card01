/**
 * Canvas绘制工具函数
 */

/**
 * 名片信息接口
 */
export interface BusinessCardInfo {
  name: string;
  jobTitle: string;
  phone: string;
  email: string;
  company: string;
  address?: string;
  website?: string;
  logo?: string;
}

/**
 * 模板样式接口
 */
export interface TemplateStyle {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  gradient?: string;
}

/**
 * 模板样式配置
 */
export const templateStyles: Record<string, TemplateStyle> = {
  template1: {
    backgroundColor: '#1e293b',
    textColor: '#ffffff',
    accentColor: '#3b82f6',
  },
  template2: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  template3: {
    backgroundColor: '#f8fafc',
    textColor: '#1e293b',
    accentColor: '#d97706',
  },
};

/**
 * 字体配置
 */
export const fontConfigs = {
  font1: { family: 'Source Han Sans CN', weight: '500' },
  font2: { family: 'Microsoft YaHei', weight: '500' },
  font3: { family: 'PingFang SC', weight: '500' },
  font4: { family: 'Arial', weight: '500' },
  font5: { family: 'Helvetica', weight: '500' },
  font6: { family: 'Georgia', weight: '500' },
};

/**
 * 绘制圆形Logo
 * @param ctx Canvas上下文
 * @param image 图片对象
 * @param x X坐标
 * @param y Y坐标
 * @param size 尺寸
 */
export const drawCircularLogo = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  size: number
) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
  ctx.clip();
  
  // 计算图片缩放和位置
  const imgAspect = image.width / image.height;
  const sizeAspect = size / size;
  
  let drawWidth = size;
  let drawHeight = size;
  let drawX = x;
  let drawY = y;
  
  if (imgAspect > sizeAspect) {
    drawHeight = size / imgAspect;
    drawY = y + (size - drawHeight) / 2;
  } else {
    drawWidth = size * imgAspect;
    drawX = x + (size - drawWidth) / 2;
  }
  
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  ctx.restore();
};

/**
 * 绘制名片
 * @param canvas Canvas元素
 * @param info 名片信息
 * @param templateId 模板ID
 * @param fontId 字体ID
 * @returns Promise<string> base64图片数据
 */
export const drawBusinessCard = async (
  canvas: HTMLCanvasElement,
  info: BusinessCardInfo,
  templateId: string = 'template1',
  fontId: string = 'font1'
): Promise<string> => {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('无法获取Canvas上下文');

  const { width, height } = canvas;
  const style = templateStyles[templateId];
  const fontConfig = fontConfigs[fontId as keyof typeof fontConfigs];

  // 清空画布
  ctx.clearRect(0, 0, width, height);

  // 绘制背景
  if (style.gradient) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = style.backgroundColor;
  }
  ctx.fillRect(0, 0, width, height);

  // logo参数
  const logoSize = 100;
  const logoX = width - logoSize - 60;
  // 姓名参数
  const nameFontSize = 40;
  let y = 180;
  // logoY使logo垂直中心与姓名基线对齐
  const logoY = y - logoSize / 2 + nameFontSize / 2;

  // 姓名
  ctx.fillStyle = style.accentColor;
  ctx.font = `bold 40px ${fontConfig.family}`;
  ctx.fillText(info.name, 100, y);

  // 职位
  y += 40;
  ctx.font = `500 26px ${fontConfig.family}`;
  ctx.fillStyle = style.textColor;
  ctx.fillText(info.jobTitle, 100, y);

  // 公司
  y += 32;
  ctx.font = `500 22px ${fontConfig.family}`;
  ctx.fillStyle = style.accentColor;
  ctx.fillText(info.company, 100, y);

  // 分割线
  y += 28;
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(100, y);
  ctx.lineTo(width - 200, y);
  ctx.stroke();

  // 联系方式区
  y += 36;
  ctx.font = `400 18px ${fontConfig.family}`;
  ctx.fillStyle = '#e5e7eb';
  // 电话
  drawIconText(ctx, '📞', info.phone, 100, y);
  // 邮箱
  y += 32;
  drawIconText(ctx, '✉️', info.email, 100, y);
  // 地址
  if (info.address) {
    y += 32;
    drawIconText(ctx, '📍', info.address, 100, y);
  }
  // 网站
  if (info.website) {
    y += 32;
    drawIconText(ctx, '🌐', info.website, 100, y);
  }

  // 绘制Logo（带白色描边和阴影）
  if (info.logo) {
    const logoImage = new Image();
    logoImage.crossOrigin = 'anonymous';
    return new Promise((resolve, reject) => {
      logoImage.onload = () => {
        // 阴影
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.18)';
        ctx.shadowBlur = 12;
        // 白色描边
        ctx.beginPath();
        ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2 + 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.restore();
        // logo本体
        drawCircularLogo(ctx, logoImage, logoX, logoY, logoSize);
        resolve(canvas.toDataURL('image/png'));
      };
      logoImage.onerror = reject;
      logoImage.src = info.logo!;
    });
  }

  return canvas.toDataURL('image/png');
};

/**
 * 绘制带icon的文本
 */
function drawIconText(ctx: CanvasRenderingContext2D, icon: string, text: string | undefined, x: number, y: number) {
  if (!text) return;
  ctx.font = `18px sans-serif`;
  ctx.fillStyle = '#b6bbc6';
  ctx.fillText(icon, x, y);
  ctx.font = `400 18px sans-serif`;
  ctx.fillStyle = '#f1f5f9';
  ctx.fillText(text, x + 28, y);
}

/**
 * 下载图片
 * @param dataUrl 图片数据URL
 * @param filename 文件名
 */
export const downloadImage = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 