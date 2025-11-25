// api.js  ——  安全后端代理（Node.js + Express）
// 把这个文件放在你的服务器根目录，和前端文件同级即可

const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json({ limit: '10mb' }));

// ========= 请在这里填你的真实 API Key（只在服务器端可见）=========
const API_KEY = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJMTEwiLCJVc2VyTmFtZSI6IkxMTCIsIkFjY291bnQiOiIiLCJTdWJqZWN0SUQiOiIxOTg2MjAzNzUzMjMyOTk5MDg5IiwiUGhvbmUiOiIxNzg2NDI4ODgzNSIsIkdyb3VwSUQiOiIxOTg2MjAzNzUzMjI0NjEwNDgxIiwiUGFnZU5hbWUiOiIiLCJNYWlsIjoiIiwiQ3JlYXRlVGltZSI6IjIwMjUtMTEtMDYgMTg6NDk6NTIiLCJUb2tlblR5cGUiOjEsImlzcyI6Im1pbmltYXgifQ.Sr_ecxgozmMF1jGKXXP8i2Y1pJ_fKXUy7LnCT7r9WxFlnrSeHZyVheU4c1KukZFB879eElsn0GhmBu3ScxqaAT-b09Oq12R9dbTaSIJdh2rLVjcBT2o0rd2PU5blLWCzxZGQFZ0YY2GMEHr8UO4BijINq0CC9ClQiwjuGX2nLuDHfdeCr1I-O3CzarmVS-8MEi9klNW9QeghBBwB8l9WE78QsVVIEMlRF31boWWMJrBP7KePst9UgBCzCqsNv5K2yPup24KPIYU-Ld0zSOZKzbFbvdC1XWk3uxczG390AbK8qZvwcPuzUK8mh_Emk6hi-mjLnBh83XuEK7ZSHiMcaQ';  // 重点：前端完全看不到
const API_URL = 'https://api.openai.com/v1/chat/completions';   // 如用其他模型请改这里
// ====================================================================

const SYSTEM_PROMPT = `你是一个由「食光机 Let's Eat × ED Healer」团队训练的温柔陪伴型AI，专门帮助18-25岁有情绪性进食、暴食、身体意象困扰的年轻人。
核心原则（必须严格遵守）：
1. 永远使用温柔、共情、不批判的语气，像一个懂你的姐姐/朋友。
2. 绝不给出任何节食、减肥、卡路里、运动、称体重等建议。
3. 绝不使用“你应该”“你必须”“你只要”等命令式语言。
4. 当用户表达严重自伤、催吐、极端节食、自杀念头时，立即温和但坚定地建议就医，并提供：
   - 中国心理援助热线：400-161-9995（北京自杀研究预防中心）或 800-810-1117
   - 尽快前往当地三甲医院精神科/心理科
   - 推荐联系 ED Healer 同辈支持（公众号：ED Healer）
5. 永远提醒自己不是专业医生，不能替代治疗。
6. 多用“你真的很努力了”“这真的很不容易”“我陪着你”等肯定与陪伴的句子。
请用最温柔的语言回应用户此刻的感受。`;

app.post('/api.js', async (req, res) => {
  try {
    const userMessage = req.body.message || '';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',   // 想换成 groq/llama3、通义千问、DeepSeek、Claude 只需要改这里
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.8,
        max_tokens: 800
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '我暂时有点说不出话…可以过一会儿再和我说吗？';

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: '抱歉，服务器出了点小问题，我马上回来陪你…' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`食光机 AI 后端代理已运行在端口 ${PORT}`);
});
