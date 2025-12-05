-- 创建数据库
CREATE DATABASE IF NOT EXISTS daily_records DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE daily_records;

-- 创建记录表
CREATE TABLE IF NOT EXISTS records (
  id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '记录唯一标识',
  title VARCHAR(255) NOT NULL COMMENT '记录标题',
  content TEXT NOT NULL COMMENT '富文本内容(HTML格式)',
  category VARCHAR(50) NOT NULL DEFAULT 'daily' COMMENT '记录分类',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  is_deleted TINYINT NOT NULL DEFAULT 0 COMMENT '软删除标记 0-未删除 1-已删除',
  INDEX idx_created_at (created_at),
  INDEX idx_is_deleted (is_deleted),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='日常记录表';
