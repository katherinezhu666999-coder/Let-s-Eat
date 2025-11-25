
  const messages = document.getElementById('messages');
  const input = document.getElementById('userInput');
  const sendBtn = document.querySelector('.send');

  function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = `message ${type}`;
    div.innerHTML = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';

    // 这里替换成你自己的 API（OpenAI / 通义千问 / 硅基流动 等）
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 你的API_KEY'
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {role:"system", content:`你是一个专门为情绪性进食和进食障碍人群提供温柔支持的AI助手。永远使用温和、共情、不批判的语气。绝不给出节食、卡路里、运动建议。始终提醒用户你不是专业医生。如果用户表达严重自伤或自杀倾向，立即建议就医并提供紧急热线。`},
          {role:"user", content: text}
        ],
        temperature: 0.8
      })
    });
    const data = await res.json();
    const reply = data.choices[0].message.content;
    addMessage(reply, 'ai');
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', e => { if(e.key==='Enter') sendMessage(); });
