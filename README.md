# 日常记录网站 - 后端服务

## 技术栈

- Node.js
- Express.js
- MySQL
- Multer (文件上传)

## 安装依赖

```bash
cd backend
npm install
```

## 数据库配置

1. 确保已安装MySQL数据库

2. 执行数据库初始化脚本:
```bash
mysql -u root -p < database/init.sql
```

3. 复制环境配置文件:
```bash
cp .env.example .env
```

4. 编辑 `.env` 文件,配置数据库连接信息:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=你的密码
DB_NAME=daily_records
PORT=3000
```

## 启动服务

开发模式(支持热重载):
```bash
npm run dev
```

生产模式:
```bash
npm start
```

服务器将运行在 `http://localhost:3000`

## API接口

### 记录管理

- `GET /api/records` - 获取记录列表
  - 参数: page(页码), pageSize(每页数量)
  
- `GET /api/records/:id` - 获取记录详情
  
- `POST /api/records` - 创建新记录
  - Body: { title, content }
  
- `PUT /api/records/:id` - 更新记录
  - Body: { title, content }
  
- `DELETE /api/records/:id` - 删除记录

### 文件上传

- `POST /api/upload` - 上传文件
  - Form Data: file

### 健康检查

- `GET /api/health` - 服务健康检查

## 目录结构

```
backend/
├── database/          # 数据库脚本
│   └── init.sql      # 初始化SQL
├── src/
│   ├── config/       # 配置文件
│   │   └── database.js
│   ├── dao/          # 数据访问层
│   │   └── recordDao.js
│   ├── services/     # 业务逻辑层
│   │   └── recordService.js
│   ├── routes/       # 路由控制器
│   │   ├── records.js
│   │   └── upload.js
│   ├── utils/        # 工具函数
│   │   └── recordUtils.js
│   └── app.js        # 应用入口
├── uploads/          # 文件上传目录
├── .env              # 环境配置
├── .env.example      # 环境配置示例
└── package.json
```
