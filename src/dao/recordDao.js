const { pool } = require('../config/database');

class RecordDao {
  // 获取记录列表(分页)
  async getRecords(page = 1, pageSize = 20) {
    const offset = (page - 1) * pageSize;
    
    // 查询记录列表
    const [records] = await pool.query(
      `SELECT id, title, content, category, created_at, updated_at 
       FROM records 
       WHERE is_deleted = 0 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [pageSize, offset]
    );
    
    // 查询总数
    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM records WHERE is_deleted = 0'
    );
    
    return {
      records,
      total: countResult[0].total,
      page,
      pageSize
    };
  }
  
  // 根据ID获取记录详情
  async getRecordById(id) {
    const [records] = await pool.query(
      `SELECT id, title, content, category, created_at, updated_at 
       FROM records 
       WHERE id = ? AND is_deleted = 0`,
      [id]
    );
    
    return records[0] || null;
  }
  
  // 创建新记录
  async createRecord(title, content, category = 'daily') {
    const [result] = await pool.query(
      'INSERT INTO records (title, content, category) VALUES (?, ?, ?)',
      [title, content, category]
    );
    
    return result.insertId;
  }
  
  // 更新记录
  async updateRecord(id, title, content, category) {
    const [result] = await pool.query(
      'UPDATE records SET title = ?, content = ?, category = ? WHERE id = ? AND is_deleted = 0',
      [title, content, category, id]
    );
    
    return result.affectedRows > 0;
  }
  
  // 删除记录(软删除)
  async deleteRecord(id) {
    const [result] = await pool.query(
      'UPDATE records SET is_deleted = 1 WHERE id = ?',
      [id]
    );
    
    return result.affectedRows > 0;
  }
}

module.exports = new RecordDao();
