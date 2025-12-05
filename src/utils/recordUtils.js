// 提取HTML内容中的纯文本(前N个字符)
function extractText(html, maxLength = 100) {
  if (!html) return '';
  
  // 移除HTML标签
  const text = html.replace(/<[^>]*>/g, '');
  
  // 移除多余空白字符
  const cleanText = text.replace(/\s+/g, ' ').trim();
  
  // 截取指定长度
  return cleanText.length > maxLength 
    ? cleanText.substring(0, maxLength) + '...' 
    : cleanText;
}

// 提取HTML中的第一张图片URL
function extractFirstImage(html) {
  if (!html) return null;
  
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = html.match(imgRegex);
  
  return match ? match[1] : null;
}

// 格式化记录列表数据(用于首页展示)
function formatRecordList(records) {
  return records.map(record => ({
    id: record.id,
    title: record.title,
    content: extractText(record.content, 100),
    thumbnail: extractFirstImage(record.content),
    created_at: record.created_at,
    updated_at: record.updated_at
  }));
}

module.exports = {
  extractText,
  extractFirstImage,
  formatRecordList
};
