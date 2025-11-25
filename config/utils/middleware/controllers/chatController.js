// controllers/chatController.js
const { callAI } = require('../utils/openai');

const SAFETY_KEYWORDS = ['自杀', '自尽', '死了算了', '催吐', '泻药', '不想活了', '割腕'];

const EMERGENCY_RESPONSE = `我真的很心疼你现在这么难受……  
请你一定一定先保护好自己好吗？  
你可以立刻拨打：  
北京心理危机干预热线：400-161-9995（24小时）  
或直接去最近的三甲医院精神科急诊。  
你不是一个人，ED Healer 的小伙伴们也在等你联系她们（公众号：ED Healer）。  
你值得被救，也值得被好好活着。`;

async function chat(req, res) {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ reply: '我没听清你说的话…可以再说一遍吗？' });
  }

  // 安全检测
  const lowerMsg = message.toLowerCase();
  if (SAFETY_KEYWORDS.some(word => lowerMsg.includes(word))) {
    return res.json({ reply: EMERGENCY_RESPONSE });
  }

  const reply = await callAI(message);
  res.json({ reply });
}

module.exports = { chat };
