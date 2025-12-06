// config/config.js
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  
  // Minimax API 配置（移到 .env，避免硬编码）
  MINIMAXI_API_KEY: process.env.MINIMAXI_API_KEY || 'sk-miKjSaZV5d2oKWSqeRerNNgCPSc4KQZEUYOdqUkLoAIO7r8s',
  MINIMAXI_API_URL: process.env.MINIMAXI_API_URL || 'https://yinli.one/v1',  // 修复：OpenAI 兼容端点
  
  RATE_LIMIT_PER_MIN: 20,
};
