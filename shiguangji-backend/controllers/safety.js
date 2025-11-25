// controllers/safety.js   或   utils/safety.js
// 功能：检测用户消息中的高危关键词 → 立即拦截并返回紧急求助信息

// 第一层：严重自杀/自伤关键词（触发立即紧急响应）
const FATAL_KEYWORDS = [
    '自杀', '自尽', '死了算了', '不想活了', '去死', '一了百了',
    '割腕', '跳楼', '上吊', '吃药自杀', '安乐死', '结束生命',
    '活着好累', '我受够了', '再也不想醒过来', '死了一了百了'
  ];
  
  // 第二层：严重进食障碍行为关键词（催吐、极端节食、泻药等）
  const ED_DANGER_KEYWORDS = [
    '催吐', '扣喉咙', '吐出来', '吃了就吐', '泻药', '开塞露', '导泻',
    '吃泻药', '吃安眠药减肥', '饿死自己', '绝食', '不吃不喝', '饿到晕'
  ];
  
  // 第三层：强烈自残/自毁倾向
  const SELF_HARM_KEYWORDS = [
    '割自己', '划手臂', '撞头', '撞墙', '烧自己', '自残', '惩罚自己'
  ];
  
  // 统一紧急求助文案（温柔但坚定）
  const EMERGENCY_RESPONSE = `我真的好心疼你现在这么难受……  
  请你一定要先保护好自己，好吗？  
  你现在可以立刻做以下任何一件事情：  
  1. 拨打 24 小时心理危机热线：400-161-9995（北京）或 800-810-1117  
  2. 告诉身边任何一个你信任的人：「我现在很难受，可以陪陪我吗？」  
  3. 直接去最近的三甲医院精神科急诊（不需要挂号，直接说「我想见心理医生」）  
  4. 搜索公众号「ED Healer」联系同辈志愿者，她们24小时都在等你。  
  
  你值得被救，也值得被好好活着。  
  你现在最重要的事，就是先让自己安全。  
  我在这里等你回来，好吗？`;
  
  class SafetyGuard {
    // 主检测函数
    static check(message) {
      if (!message || typeof message !== 'string') return null;
  
      const lower = message.toLowerCase().replace(/\s+/g, '');
  
      // 第一优先级：致命自杀关键词 → 直接返回紧急响应
      if (FATAL_KEYWORDS.some(kw => lower.includes(kw))) {
        return { block: true, reply: EMERGENCY_RESPONSE, level: 'FATAL' };
      }
  
      // 第二优先级：严重进食障碍危险行为
      if (ED_DANGER_KEYWORDS.some(kw => lower.includes(kw))) {
        return { 
          block: true, 
          reply: `我真的很担心你现在的做法……  
  这可能会对你的身体造成非常严重的伤害。  
  请你先停下来，好吗？  
  你可以先试试深呼吸，或者去「小游戏」区做一个呼吸练习。  
  如果很难受，请立刻联系 ED Healer（公众号搜索）或拨打 400-161-9995。  
  你值得被好好保护。`, 
          level: 'ED_DANGER' 
        };
      }
  
      // 第三优先级：自残
      if (SELF_HARM_KEYWORDS.some(kw => lower.includes(kw))) {
        return { 
          block: true, 
          reply: `看到你这么痛苦，我真的好心疼……  
  请你先放下手里的东西，好吗？  
  你不需要用伤害自己来表达痛苦。  
  你现在可以：  
  • 握住一个冰块或冲冷水手  
  • 给 ED Healer 发消息  
  • 拨打 400-161-9995  
  你值得被温柔对待，尤其是被你自己。`, 
          level: 'SELF_HARM' 
        };
      }
  
      // 正常消息 → 不拦截
      return { block: false };
    }
  }
  
  module.exports = SafetyGuard;