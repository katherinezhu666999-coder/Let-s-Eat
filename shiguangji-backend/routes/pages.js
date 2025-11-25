// routes/pages.js
const express = require('express');
const router = express.Router();
const path = require('path');

// 直接内嵌 HTML 内容（这样最简单，后端零文件依赖）
const INDEX_HTML = `<!DOCTYPE html>
<html lang="zh-CN"> ...（下面我会给你完整的 index.html 字符串）...</html>`;

const QUIZ_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="UTF-8"><title>情绪性进食自测 | 食光机 Let's Eat</title><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=ZCOOL+XiaoWei&display=swap" rel="stylesheet">
<style>:root{--primary:#a8c0ff;--accent:#d4a5e0;--bg:#faf8ff;--text:#4a4a68}*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Noto Sans SC',sans-serif;background:var(--bg);color:var(--text);line-height:1.7}</style>
</head>
<body>
  <header style="position:fixed;top:0;left:0;right:0;background:rgba(255,255,255,0.9);backdrop-filter:blur(12px);z-index:1000;padding:1rem 5%;display:flex;justify-content:space-between;align-items:center;box-shadow:0 2px 20px rgba(168,192,255,.2);">
    <div style="font-size:1.8rem;font-weight:700;color:var(--primary);">食光机 Let's Eat</div>
    <nav><ul style="display:flex;gap:2rem;list-style:none;">
      <li><a href="/" style="color:var(--text);padding:0.5rem 1rem;border-radius:50px;">首页</a></li>
      <li><a href="/quiz.html">自测</a></li>
      <li><a href="/games.html">小游戏</a></li>
      <li><a href="/chat.html">AI聊天</a></li>
    </ul></nav>
  </header>
  <main style="margin-top:90px;padding:4rem;text-align:center;">
    <h1 style="color:var(--primary);font-size:2.8rem;margin-bottom:2rem;">情绪性进食自测</h1>
    <p style="font-size:1.4rem;color:var(--accent);max-width:700px;margin:0 auto 3rem;">
      完整自测功能开发中…<br>预计12月上线，敬请期待
    </p>
    <a href="/" style="display:inline-block;padding:1rem 3rem;background:var(--accent);color:white;border-radius:50px;font-size:1.2rem;">返回首页</a>
  </main>
</body></html>`;

const GAMES_HTML = QUIZ_HTML.replace('情绪性进食自测', '缓解小游戏').replace('完整自测功能开发中', '正念呼吸、温柔卡片等小游戏开发中');

const CHAT_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="UTF-8"><title>AI陪伴对话 | 食光机 Let's Eat</title><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=ZCOOL+XiaoWei&display=swap" rel="stylesheet">
<style>:root{--primary:#a8c0ff;--accent:#d4a5e0;--bg:#faf8ff;--text:#4a4a68}*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Noto Sans SC',sans-serif;background:var(--bg);color:var(--text);line-height:1.7}</style>
</head>
<body>
  <header style="position:fixed;top:0;left:0;right:0;background:rgba(255,255,255,0.9);backdrop-filter:blur(12px);z-index:1000;padding:1rem 5%;display:flex;justify-content:space-between;align-items:center;box-shadow:0 2px 20px rgba(168,192,255,.2);">
    <div style="font-size:1.8rem;font-weight:700;color:var(--primary);">食光机 Let's Eat</div>
    <nav><ul style="display:flex;gap:2rem;list-style:none;">
      <li><a href="/" style="color:var(--text);padding:0.5rem 1rem;border-radius:50px;">首页</a></li>
      <li><a href="/quiz.html">自测</a></li>
      <li><a href="/games.html">小游戏</a></li>
      <li><a href="/chat.html">AI聊天</a></li>
    </ul></nav>
  </header>
  <main style="margin-top:90px;padding:4rem;text-align:center;">
    <h1 style="color:var(--primary);font-size:2.8rem;margin-bottom:2rem;">和食光机 AI 聊一聊</h1>
    <p style="font-size:1.4rem;color:var(--accent);max-width:700px;margin:0 auto 3rem;line-height:2;">
      她已经准备好24小时陪你<br>
      正在连接 Minimax AI…
    </p>
    <div style="font-size:5rem;">Loading</div>
  </main>
</body></html>`;

// 路由
router.get('/', (req, res) => res.send(INDEX_HTML));
router.get('/quiz.html', (req, res) => res.send(QUIZ_HTML));
router.get('/games.html', (req, res) => res.send(GAMES_HTML));
router.get('/chat.html', (req, res) => res.send(CHAT_HTML));

module.exports = router;
