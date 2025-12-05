# 日常记录网站 - 后端服务

Node.js + Express + MySQL 后端 API 服务

## 🚀 快速开始

### 本地开发

1. **安装依赖**
```bash
npm install
```

2. **配置环境变量**
```bash
# 复制 .env.example 为 .env
cp .env.example .env

# 编辑 .env 文件，配置数据库信息
```

3. **初始化数据库**
```bash
mysql -u root -p < database/init.sql
```

4. **启动开发服务器**
```bash
npm run dev
```

服务将运行在 http://localhost:3000

## 📦 生产部署

### Render 部署

详见 [Render部署指南.md](../Render部署指南.md)

简要步骤：
1. 准备云数据库（PlanetScale 或 Railway）
2. 推送代码到 GitHub
3. 在 Render 创建 Web Service
4. 配置环境变量
5. 自动部署

## 🔌 API 接口

### 健康检查
```
GET /api/health
```

### 记录管理
```
GET    /api/records          # 获取记录列表
GET    /api/records/:id      # 获取记录详情
POST   /api/records          # 创建记录
PUT    /api/records/:id      # 更新记录
DELETE /api/records/:id      # 删除记录
```

### 文件上传
```
POST   /api/upload           # 上传文件
```

## 🛠️ 技术栈

- **Node.js** 18+
- **Express** 4.x
- **MySQL** 5.7+
- **Multer** - 文件上传
- **CORS** - 跨域支持
- **dotenv** - 环境变量管理

## 📁 项目结构

```
backend/
├── src/
│   ├── app.js           # 应用入口
│   ├── config/          # 配置文件
│   │   └── database.js  # 数据库配置
│   ├── dao/             # 数据访问层
│   │   └── recordDao.js
│   ├── services/        # 业务逻辑层
│   │   └── recordService.js
│   └── routes/          # 路由层
│       ├── records.js
│       └── upload.js
├── database/            # 数据库脚本
│   └── init.sql
├── uploads/             # 文件上传目录（本地）
├── .env                 # 环境变量（不提交到git）
├── .env.example         # 环境变量示例
├── .gitignore
├── package.json
└── render.yaml          # Render 部署配置
```

## 🔐 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NODE_ENV` | 运行环境 | development |
| `PORT` | 服务端口 | 3000 |
| `DB_HOST` | 数据库地址 | localhost |
| `DB_PORT` | 数据库端口 | 3306 |
| `DB_USER` | 数据库用户名 | root |
| `DB_PASSWORD` | 数据库密码 | - |
| `DB_NAME` | 数据库名称 | daily_records |
| `UPLOAD_DIR` | 文件上传目录 | uploads |
| `MAX_FILE_SIZE` | 最大文件大小 | 52428800 (50MB) |

## 📝 开发规范

### 数据库表结构

**records 表**
- `id` - 主键，自增
- `title` - 标题
- `content` - 富文本内容
- `category` - 分类（daily/travel/study/food/work/life）
- `created_at` - 创建时间
- `updated_at` - 更新时间
- `is_deleted` - 软删除标记

### 分类系统

支持 6 个分类：
- `daily` - 日常
- `travel` - 游记
- `study` - 学习
- `food` - 美食
- `work` - 工作
- `life` - 生活

## 🐛 问题排查

### 数据库连接失败
```bash
# 检查 MySQL 是否运行
mysql -u root -p -e "SELECT 1"

# 检查环境变量配置
cat .env
```

### 文件上传失败
```bash
# 检查 uploads 目录权限
ls -la uploads/

# 创建目录
mkdir -p uploads
```

## 📄 License

MIT
