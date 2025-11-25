// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const { PORT } = require('./config/config');
const loggerAndLimiter = require('./middleware/logger');

const chatRouter = require('./routes/chat');

const app = express();

// 安全与基础设置
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(loggerAndLimiter);

// 路由
app.use('/api', chatRouter);

// 静态文件（你的前端 html/css/js）
app.use(express.static(path.join(__dirname, '../frontend'))); // 把前端文件放这里

// 健康检查
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

app.listen(PORT, () => {
  console.log(`食光机后端已启动：http://localhost:${PORT}`);
  console.log(`前端访问：http://localhost:${PORT}`);
});
// server.js 最后几行，加入这句（放在所有路由之后）
const pageRoutes = require('./routes/pages');  // ← 新增
app.use('/', pageRoutes);                      // ← 新增（优先级最高）
