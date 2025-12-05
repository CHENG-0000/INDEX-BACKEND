const express = require('express');
const router = express.Router();
const recordService = require('../services/recordService');

// 获取记录列表
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    
    const result = await recordService.getRecords(page, pageSize);
    
    res.json({
      code: 200,
      message: '获取成功',
      data: result
    });
  } catch (error) {
    console.error('获取记录列表失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      data: null
    });
  }
});

// 获取记录详情
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (!id || id <= 0) {
      return res.status(400).json({
        code: 400,
        message: '无效的记录ID',
        data: null
      });
    }
    
    const record = await recordService.getRecordById(id);
    
    res.json({
      code: 200,
      message: '获取成功',
      data: record
    });
  } catch (error) {
    if (error.message === '记录不存在') {
      return res.status(404).json({
        code: 404,
        message: error.message,
        data: null
      });
    }
    
    console.error('获取记录详情失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      data: null
    });
  }
});

// 创建记录
router.post('/', async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    const record = await recordService.createRecord(title, content, category);
    
    res.json({
      code: 200,
      message: '创建成功',
      data: record
    });
  } catch (error) {
    if (error.message.includes('不能为空') || error.message.includes('长度')) {
      return res.status(400).json({
        code: 400,
        message: error.message,
        data: null
      });
    }
    
    console.error('创建记录失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      data: null
    });
  }
});

// 更新记录
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content, category } = req.body;
    
    if (!id || id <= 0) {
      return res.status(400).json({
        code: 400,
        message: '无效的记录ID',
        data: null
      });
    }
    
    const record = await recordService.updateRecord(id, title, content, category);
    
    res.json({
      code: 200,
      message: '更新成功',
      data: record
    });
  } catch (error) {
    if (error.message.includes('不能为空') || error.message.includes('长度')) {
      return res.status(400).json({
        code: 400,
        message: error.message,
        data: null
      });
    }
    
    if (error.message.includes('不存在')) {
      return res.status(404).json({
        code: 404,
        message: error.message,
        data: null
      });
    }
    
    console.error('更新记录失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      data: null
    });
  }
});

// 删除记录
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (!id || id <= 0) {
      return res.status(400).json({
        code: 400,
        message: '无效的记录ID',
        data: null
      });
    }
    
    await recordService.deleteRecord(id);
    
    res.json({
      code: 200,
      message: '删除成功',
      data: null
    });
  } catch (error) {
    if (error.message.includes('不存在')) {
      return res.status(404).json({
        code: 404,
        message: error.message,
        data: null
      });
    }
    
    console.error('删除记录失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      data: null
    });
  }
});

module.exports = router;
