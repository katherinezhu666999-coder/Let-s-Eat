// utils/minimaxi.js
const fetch = require('node-fetch');
const { MINIMAXI_API_KEY, MINIMAXI_API_URL } = require('../config/config');

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
    const res = await fetch(MINIMAXI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MINIMAXI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'MiniMax-M2',  // 修复：指定官方模型（支持 128K 上下文）
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.8,
        max_tokens: 800,
        // 可选：reasoning_split: true  # 如果想启用思考链，取消注释
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`Minimax API 错误: ${res.status} - ${errorData.error?.message || '未知错误'}`);
    }

    const data = await res.json();
    let reply = data.choices?.[0]?.message?.content || "我暂时有点说不出话…可以过一会儿再和我说吗？";
    
    // MiniMax 可能返回 <think> 标签（保留完整内容）
    if (reply.includes('<think>')) {
      // 可选：提取思考部分，但这里保留原样以保持自然
      console.log('检测到思考标签，已保留');
    }
    
    return reply;
  } catch (err) {
    console.error('Minimax API 调用失败:', err);  // 添加日志，便于调试
    return "抱歉，我现在有点小卡顿…可以过一会儿再和我说吗？（如果持续，请检查网络或联系支持）";
  }
}

module.exports = { callAI };
