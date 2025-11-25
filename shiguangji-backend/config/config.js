// config/config.js
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  
  // Minimax API 配置
  MINIMAXI_API_KEY: process.env.MINIMAXI_API_KEY,
  MINIMAXI_API_URL: process.env.MINIMAXI_API_URL || 'https://api.minimaxi.com/v1/chat/completions',
  
  RATE_LIMIT_PER_MIN: 20,
};