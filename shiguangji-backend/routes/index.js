// routes/pages.js
const express = require('express');
const router = express.Router();
const path = require('path');

// 直接内嵌 HTML 内容（这样最简单，后端零文件依赖）
const INDEX_HTML = `<!DOCTYPE html>
<html lang="zh-CN"> 
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>食光机 Let's Eat｜和食物、情绪重新好好在一起</title>
  <meta name="description" content="一个面向18–25岁青年的情绪性进食支持空间"/>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=ZCOOL+XiaoWei&display=swap" rel="stylesheet">
  <style>
    :root{--primary:#a8c0ff;--accent:#d4a5e0;--bg:#faf8ff;--text:#4a4a68;--light:#e6e6fa;}
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Noto Sans SC',sans-serif;background:var(--bg);color:var(--text);line-height:1.7;}
    a{text-decoration:none;color:inherit;}
    header{position:fixed;top:0;left:0;right:0;background:rgba(255,255,255,0.85);backdrop-filter:blur(12px);z-index:1000;padding:1rem 5%;display:flex;justify-content:space-between;align-items:center;box-shadow:0 2px 20px rgba(168,192,255,.2);transition:all .3s;}
    header.scrolled{background:rgba(255,255,255,0.95);}
    .logo{font-size:1.8rem;font-weight:700;color:var(--primary);}
    nav ul{display:flex;gap:2.5rem;list-style:none;}
    nav a{font-weight:500;padding:0.5rem 1rem;border-radius:50px;transition:all .3s;}
    nav a:hover{background:var(--accent);color:white;}
    main{margin-top:90px;padding:0 5%;}
    .hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:2rem;background:linear-gradient(135deg,#e0e7ff,#f8f0ff);}
    .hero h1{font-size:3.5rem;margin-bottom:1rem;color:var(--primary);}
    .hero p{font-size:1.4rem;max-width:800px;margin-bottom:2rem;}
    .btn{display:inline-block;padding:1rem 2rem;margin:0.8rem;background:var(--accent);color:white;border-radius:50px;font-weight:600;transition:transform .3s;}
    .btn:hover{transform:translateY(-5px);}
    .btn-outline{background:transparent;border:2px solid var(--accent);}
    section{padding:6rem 5%;}
    .section-title{text-align:center;font-size:2.5rem;margin-bottom:1.5rem;color:var(--primary);}
    .section-intro{text-align:center;max-width:900px;margin:0 auto 4rem;font-size:1.2rem;color:#666;}
    .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:2rem;margin-top:3rem;}
    .card{background:white;padding:2rem;border-radius:20px;box-shadow:0 10px 30px rgba(168,192,255,.15);transition:transform .3s;}
    .card:hover{transform:translateY(-10px);}
    .card h3{font-size:1.6rem;margin-bottom:1rem;color:var(--primary);}
    footer{background:#4a4a68;color:#ddd;text-align:center;padding:3rem 5%;font-size:0.9rem;}
    footer a{color:#a8c0ff;}
    @media(max-width:768px){.hero h1{font-size:2.8rem;}nav ul{gap:1rem;font-size:0.9rem;}}
  </style>
</head>
<body>

<header id="header">
  <div class="logo">食光机 Let's Eat</div>
  <nav>
    <ul>
      <li><a href="/">首页</a></li>
      <li><a href="#knowledge">科普内容</a></li>
      <li><a href="/quiz.html">情绪性进食自测</a></li>
      <li><a href="/games.html">缓解小游戏</a></li>
      <li><a href="/chat.html">AI陪伴对话</a></li>   <!-- 关键：保持 /chat.html -->
      <li><a href="#help">寻求帮助</a></li>
      <li><a href="#about">关于 ED Healer</a></li>
    </ul>
  </nav>
</header>

<!-- Hero 区 -->
<section id="home" class="hero">
  <h1>食光机 Let's Eat<br>和食物、情绪重新好好在一起</h1>
  <p style="font-size:1.3rem;">
    一个面向 18–25 岁青年的情绪性进食支持空间，<br>
    结合 ED Healer 科普、正念饮食练习、小游戏和 AI 陪伴，<br>
    帮你慢慢走出「情绪靠吃解决」「吃完又自责」的循环。
  </p>
  <div>
    <a href="/quiz.html" class="btn">开始情绪性进食自测</a>
    <a href="/games.html" class="btn btn-outline">学习正念饮食</a>
  </div>
  <p style="margin-top:3rem;font-size:0.95rem;color:#888;">
    本网站不提供诊断或医疗建议，主要用于科普与自助支持。<br>
    如有严重身心困扰，请尽快寻求专业帮助。
  </p>
</section>

<!-- 下面内容保持不变（科普、占位区块等） -->
<section id="knowledge">
  <h2 class="section-title">认识情绪性进食 & 进食障碍</h2>
  <p class="section-intro">食光机由 <strong>ED Healer</strong> 提供内容支持。</p>
  <div class="cards">
    <div class="card"><h3>情绪性进食是什么？</h3><p>情绪性进食 vs. 生理性饥饿……</p><a href="#" class="btn" style="margin-top:1rem;">敬请期待</a></div>
    <div class="card"><h3>进食障碍基础知识</h3><p>神经性厌食症、贪食症、暴食障碍……</p><a href="#" class="btn" style="margin-top:1rem;">敬请期待</a></div>
    <div class="card"><h3>正念饮食 & 直觉饮食</h3><p>从“计算卡路里”到“倾听身体信号”</p><a href="/games.html" class="btn" style="margin-top:1rem;">开始练习</a></div>
  </div>
</section>

<section style="text-align:center;padding:4rem;">
  <h2 class="section-title">情绪性进食自测 & 智能反馈</h2>
  <p class="section-intro">想知道你的进食和情绪的关系有多紧密吗？</p>
  <a href="/quiz.html" class="btn" style="font-size:1.3rem;padding:1.2rem 3rem;">开始自测</a>
</section>

<section style="background:#f5f0ff;padding:6rem 5%;">
  <h2 class="section-title">小小游戏，大大喘口气</h2>
  <p class="section-intro">当你想吃来发泄时，先给自己3–5分钟</p>
  <div class="cards">
    <div class="card"><h3>正念吃一块小食物</h3><a href="/games.html" class="btn">开始练习</a></div>
    <div class="card"><h3>吃完以后不要只剩下自责</h3><a href="/games.html" class="btn">开始练习</a></div>
    <div class="card"><h3>抽一张「此刻我需要的提醒」</h3><a href="/games.html" class="btn">抽一张</a></div>
  </div>
</section>

<section style="text-align:center;padding:6rem 5%;">
  <h2 class="section-title">和食光机 AI 聊一聊</h2>
  <p class="section-intro">一个不会打断你、不会评价你的聆听者，随时在这里。</p>
  <a href="/chat.html" class="btn" style="font-size:1.3rem;padding:1.2rem 3rem;">开始聊天</a>
</section>

<section id="help" style="background:#fff0f8;">
  <h2 class="section-title">我需要更多帮助</h2>
  <p class="section-intro">如果你觉得已经有点超出自己能扛的范围，这不是软弱，而是你认真对待自己的生命。</p>
</section>

<section id="about">
  <h2 class="section-title">关于 ED Healer & 食光机</h2>
  <p class="section-intro">ED Healer 是由亲历者、志愿者与专业人士共同发起的中国进食障碍同辈互助组织。</p>
</section>

<footer>
  <p>© 2025 食光机 Let's Eat · ED Healer</p>
  <p style="margin-top:1rem;color:#aaa;">网站内容仅用于科普和自助支持，不构成医疗诊断或治疗建议。</p>
</footer>

<script>
  window.addEventListener('scroll',()=>{document.getElementById('header').classList.toggle('scrolled',window.scrollY>50);});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});}));  
</script>
</body>
</html>`;

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
