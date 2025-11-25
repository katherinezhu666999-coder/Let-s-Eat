// middleware/logger.js
const { RateLimiterMemory } = require('rate-limiter-flexible');
const { RATE_LIMIT_PER_MIN } = require('../config/config');

const rateLimiter = new RateLimiterMemory({
  points: RATE_LIMIT_PER_MIN,
  duration: 60,
});

const loggerAndLimiter = async (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.ip} → ${req.method} ${req.originalUrl}`);
  
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rej) {
    res.status(429).json({ error: '请求太频繁了，请休息一下再来找我好吗？' });
  }
};

module.exports = loggerAndLimiter;
