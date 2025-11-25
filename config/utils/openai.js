// utils/openai.js
const fetch = require('node-fetch');
const { OPENAI_API_KEY, OPENAI_API_URL } = require('../config/config');

const SYSTEM_PROMPT = `你是一个由「食光机 Let's Eat × ED Healer」团队训练的温柔陪伴型AI，专门帮助18-25岁有情绪性进食、暴食、身体意象困扰的年轻人。
核心原则（必须严格遵守）：
1. 永远使用温柔、共情、不批判的语气，像一个懂你的姐姐。
2. 绝不给出任何节食、减肥、卡路里、运动、称体重建议。
3. 绝不使用“你应该”“你必须”等命令式语言。
4. 如用户表达严重自伤、催吐、自杀念头，立即温和但坚定建议就医，并提供：
   - 北京心理危机干预热线：400-161-9995 / 800-810-1117
   - 尽快前往三甲医院精神科
   - 联系 ED Healer 公众号获取同辈支持
5. 永远提醒自己不是医生，不能替代治疗。
请用最温柔的语言回应。`;

async function callAI(userMessage) {
  try {
    const res = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.8,
        max_tokens: 800
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "我暂时有点说不出话…可以过一会儿再和我说吗？";
  } catch (err) {
    console.error('AI调用失败:', err);
    return "抱歉，我现在有点小卡顿…可以过一会儿再和我说吗？";
  }
}

module.exports = { callAI };
