const recordDao = require('../dao/recordDao');
const { formatRecordList } = require('../utils/recordUtils');

class RecordService {
  // 获取记录列表
  async getRecords(page, pageSize) {
    const result = await recordDao.getRecords(page, pageSize);
    
    return {
      records: formatRecordList(result.records),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize
    };
  }
  
  // 获取记录详情
  async getRecordById(id) {
    const record = await recordDao.getRecordById(id);
    
    if (!record) {
      throw new Error('记录不存在');
    }
    
    return record;
  }
  
  // 创建记录
  async createRecord(title, content, category = 'daily') {
    // 验证标题
    if (!title || title.trim().length === 0) {
      throw new Error('标题不能为空');
    }
    
    if (title.length > 255) {
      throw new Error('标题长度不能超过255字符');
    }
    
    // 验证内容
    if (!content || content.trim().length === 0) {
      throw new Error('内容不能为空');
    }
    
    // 创建记录
    const id = await recordDao.createRecord(title, content, category);
    
    // 返回完整记录
    return await recordDao.getRecordById(id);
  }
  
  // 更新记录
  async updateRecord(id, title, content, category) {
    // 验证标题
    if (!title || title.trim().length === 0) {
      throw new Error('标题不能为空');
    }
    
    if (title.length > 255) {
      throw new Error('标题长度不能超过255字符');
    }
    
    // 验证内容
    if (!content || content.trim().length === 0) {
      throw new Error('内容不能为空');
    }
    
    // 更新记录
    const success = await recordDao.updateRecord(id, title, content, category);
    
    if (!success) {
      throw new Error('记录不存在或更新失败');
    }
    
    // 返回更新后的记录
    return await recordDao.getRecordById(id);
  }
  
  // 删除记录
  async deleteRecord(id) {
    const success = await recordDao.deleteRecord(id);
    
    if (!success) {
      throw new Error('记录不存在或删除失败');
    }
    
    return true;
  }
}

module.exports = new RecordService();
