// config/config.js
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  
  // 在根目录新建 .env 文件，填入你的密钥
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'sk-你的密钥',
  OPENAI_API_URL: process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions',
  
  // 也可以支持其他模型（只需改这里 + utils/openai.js）
  // GROQ_API_KEY: process.env.GROQ_API_KEY,
  // CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,

  // 安全相关
  RATE_LIMIT_PER_MIN: 20,  // 每人每分钟最多20条，防止刷
};
