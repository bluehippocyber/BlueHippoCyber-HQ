/* global React */
const { useState: useStateChat, useEffect: useEffectChat, useRef: useRefChat } = React;

/* ============================================================
   Origin One — BlueHippoCyber's automated business guide
   ============================================================ */
function OriginChat({ open, setOpen, navigate }) {
  const [messages, setMessages] = useStateChat([
    { role: 'system', text: 'Connected to BlueHippoCyber.' },
    { role: 'bot', text: 'Hey — I\'m Origin One, BlueHippoCyber\'s guide. I\'m here to help you figure out which systems to set up first so you stop losing jobs. What kind of business do you run? Or ask me anything — pricing, how it works, real results.' },
  ]);
  const [input, setInput] = useStateChat('');
  const [thinking, setThinking] = useStateChat(false);
  const scrollRef = useRefChat(null);
  const bubbleRef = useRefChat(null);

  useEffectChat(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  // She tracks the cursor — a small tilt toward wherever the visitor is.
  useEffectChat(() => {
    if (open) return;
    let frame = null;
    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const el = bubbleRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.3;
        const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 400));
        const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 400));
        el.style.setProperty('--tilt-y', `${dx * 8}deg`);
        el.style.setProperty('--tilt-x', `${-dy * 5}deg`);
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); if (frame) cancelAnimationFrame(frame); };
  }, [open]);

  const send = async (text) => {
    if (!text || !text.trim() || thinking) return;
    const userMsg = { role: 'user', text: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setThinking(true);

    const history = newMessages
      .filter(m => m.role === 'user' || m.role === 'bot')
      .map(m => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.text,
      }));

    let reply = '';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) throw new Error('chat api ' + res.status);
      const data = await res.json();
      reply = data.reply || '';
      if (!reply) throw new Error('empty reply');
    } catch (e) {
      reply = scriptedFallback(text);
    }

    const navMatch = reply.match(/\[NAV:([a-z-]+)\]/i);
    let cleanReply = reply.replace(/\[NAV:[a-z-]+\]/gi, '').trim();
    if (!cleanReply) cleanReply = 'Routing you there now.';

    setMessages(prev => [...prev, { role: 'bot', text: cleanReply }]);
    setThinking(false);

    if (navMatch && navigate) {
      const dest = navMatch[1].toLowerCase();
      setTimeout(() => {
        if (dest === 'services' || dest === 'solutions') navigate('solutions');
        else if (dest === 'home') navigate('home');
        else if (dest === 'pricing') navigate('pricing');
        else if (dest === 'portfolio') navigate('portfolio');
        else navigate('home', dest);
      }, 600);
    }
  };

  const scripted = {
    pricing: 'Everything is a one-time setup — no subscriptions. Most owners start with a Website + Smart Chat Assistant ($560), Missed-Call Text-Back ($297), or Follow-Up Automation ($397). Want the whole system connected? The Full Lead Engine Build is $1,500. And the Business Growth Audit is always free.',
    how: 'Three steps. We start with a free audit and find where you\'re losing money, then we build the systems you need, then leads get captured, followed up, and booked automatically. Want the walkthrough?',
    results: 'Check the portfolio for real, verified work — no invented case studies here. Want me to send you there?',
    contact: 'Easiest way is to grab Keenan directly. Call (863) 209-7940, text (863) 825-2215, or email keenan@bluehippocyber.com. He replies within 4 hours.',
    services: 'We build the website, the lead capture, the follow-up, the booking, the reminders, and the review requests — connected and running on their own. Pick one or build the whole engine. Want to see everything?',
    default: 'I can walk you through pricing, how it works, real results, the free audit, or just connect you with Keenan. What do you want to start with?',
  };

  function scriptedFallback(t) {
    const q = t.toLowerCase();
    if (/(price|pricing|cost|how much|setup|fee)/.test(q)) return scripted.pricing + '\n[NAV:pricing]';
    if (/(ad|advertis|campaign|google|facebook|meta)/.test(q)) return scripted.services + '\n[NAV:services]';
    if (/(how|work|process|step|build)/.test(q)) return scripted.how + '\n[NAV:how]';
    if (/(result|case|story|example|proof|client)/.test(q)) return scripted.results + '\n[NAV:portfolio]';
    if (/(service|build|system|what do you)/.test(q)) return scripted.services + '\n[NAV:services]';
    if (/(contact|email|call|reach|book|audit)/.test(q)) return scripted.contact + '\n[NAV:contact]';
    return scripted.default;
  }

  const quickActions = [
    { label: 'see pricing', prompt: 'Show me pricing.' },
    { label: 'how it works', prompt: 'How does this work?' },
    { label: 'what you build', prompt: 'What do you build?' },
    { label: 'free audit', prompt: 'I want my free audit.' },
  ];

  return (
    <>
      {!open && (
        <div className="chat-bubble" ref={bubbleRef} onClick={() => setOpen(true)} title="Chat with us">
          <div className="origin-tilt">
            <div className="origin-stack">
              <div className="origin-ring"></div>
              <img className="origin-mark origin-idle" src="assets/origin-mascot-idle.png" alt="" />
              <img className="origin-mark origin-active" src="assets/origin-mascot-bust.png" alt="" />
            </div>
          </div>
        </div>
      )}
      <div className={`chat-window ${open ? 'open' : ''}`}>
        <div className="origin-watermark"></div>
        <div className="chat-header">
          <img className={`mark ${thinking ? 'mark-thinking' : ''}`} src={thinking ? 'assets/origin-mascot-full.png' : 'assets/origin-mascot-bust.png'} alt="" />
          <div className="title-block">
            <div className="title">AGENTIC AI ASSISTANT · LIVE</div>
            <div className="sub">{thinking ? 'thinking...' : 'online · reply in seconds'}</div>
          </div>
          <button className="close" onClick={() => setOpen(false)} title="Close">×</button>
        </div>
        <div className="chat-messages" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="author">
                {m.role === 'system' ? '// system' : m.role === 'bot' ? 'assistant' : 'you'}
              </div>
              <div className="bubble">{m.text}</div>
            </div>
          ))}
          {thinking && (
            <div className="msg bot">
              <div className="author">assistant</div>
              <div className="bubble">
                <span className="thinking"><span></span><span></span><span></span></span>
              </div>
            </div>
          )}
        </div>
        <div className="chat-actions">
          {quickActions.map(a => (
            <button key={a.label} className="chat-action" onClick={() => send(a.prompt)}>
              {a.label}
            </button>
          ))}
        </div>
        <div className="chat-input">
          <span className="prompt">▸</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(input); }}
            placeholder="ask anything..."
            autoFocus
          />
          <button onClick={() => send(input)}>↵</button>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   Services page — Deep dive on each system surface
   ============================================================ */
function SolutionsPage({ navigate }) {
  const services = [
    {
      num: '01',
      name: 'Capture & Respond',
      tag: 'No lead waits',
      body: 'Every call, form, text, and message gets captured the second it lands — and answered in seconds, even after hours. Miss a call and the caller gets an instant text back. You stop losing work to whoever picked up first.',
      bullets: [
        'Lead capture across site, forms, and social',
        'Missed-call text-back automation',
        'Instant quote-request auto-reply',
        'Smart chat assistant on your website',
        'Everything saved in one place',
      ],
      stats: [
        { num: '< 60s', lbl: 'response time' },
        { num: '24 / 7', lbl: 'always-on' },
        { num: '0', lbl: 'leads missed' },
      ],
    },
    {
      num: '02',
      name: 'Automatic Follow-Up',
      tag: 'No quote goes cold',
      body: 'Texts and emails go out to every lead until they book or say no. Quotes stop slipping because you got busy. Old customers get pulled back for new work and upgrades — all on its own.',
      bullets: [
        'Follow-up sequences (text + email)',
        'Estimate & quote follow-up',
        'Customer reactivation campaigns',
        'Referral requests to happy customers',
        'Invoice & payment reminders',
      ],
      stats: [
        { num: 'auto', lbl: 'every lead' },
        { num: '0', lbl: 'cold quotes' },
        { num: '+repeat', lbl: 'business' },
      ],
    },
    {
      num: '03',
      name: 'Booking & Scheduling',
      tag: 'Fill the calendar',
      body: 'Customers pick a time and book themselves straight into your calendar — no phone tag. Automatic reminders cut no-shows, and missed appointments get rescheduled on their own.',
      bullets: [
        'Online self-booking into your calendar',
        'Appointment reminders',
        'No-show recovery',
        'New client welcome messages',
        'Consultation booking for consultants',
      ],
      stats: [
        { num: 'self', lbl: 'booking' },
        { num: 'fewer', lbl: 'no-shows' },
        { num: '24 / 7', lbl: 'open to book' },
      ],
    },
    {
      num: '04',
      name: 'Get Found & Reviewed',
      tag: 'More leads, better reputation',
      body: 'Show up when people nearby are searching, and turn every finished job into a 5-star review. The better you look online, the more the phone rings — and it all runs in the background.',
      bullets: [
        'Google Business Profile setup',
        'Local search & Google Maps ranking',
        'Review request automation',
        'Reputation monitoring',
        'Social media auto-posting',
      ],
      stats: [
        { num: 'top', lbl: 'local search' },
        { num: '5★', lbl: 'reviews' },
        { num: 'always', lbl: 'active' },
      ],
    },
  ];

  return (
    <div className="solutions-inner" style={{ position: 'relative' }}>
      <video className="hero-video" src="assets/hero-loop.mp4" autoPlay muted loop playsInline
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.16, zIndex: 0 }}></video>
      <div className="solutions-bg-watermark"></div>

      <section className="solutions-hero" style={{ position: 'relative', zIndex: 2 }}>
        <div className="eyebrow">// Services · Everything we build</div>
        <h1>Every system we build,<br/><span style={{ color: 'var(--neon)', fontStyle: 'italic' }}>under one roof.</span></h1>
        <p className="lead">
          Capture, follow-up, booking, reviews — the systems that keep any business
          from losing jobs. Built for cybersecurity consultants and any local business
          without a solid website. Pick one, or build the whole engine. Every service is
          a one-time setup.
        </p>
        <div className="cta-row" style={{ marginTop: 28 }}>
          <button className="cta-primary" onClick={() => navigate('home', 'contact')}>
            Get Your Free Audit
            <span className="arrow"></span>
          </button>
          <button className="cta-ghost" onClick={() => navigate('pricing')}>
            See What It Costs
          </button>
        </div>
      </section>

      <div className="solutions-grid" style={{ position: 'relative', zIndex: 2 }}>
        {services.map((s) => (
          <div className="solution-card" key={s.num}>
            <div className="card-num">// {s.num}</div>
            <div className="card-tag">{s.tag}</div>
            <h3>{s.name}</h3>
            <p className="body">{s.body}</p>
            <ul className="card-bullets">
              {s.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <div className="severity-row">
              {s.stats.map((st) => (
                <div className="sev med" key={st.lbl}>
                  <div className="num">{st.num}</div>
                  <div className="lbl">{st.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { OriginChat, SolutionsPage });
