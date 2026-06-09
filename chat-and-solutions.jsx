/* global React */
const { useState: useStateChat, useEffect: useEffectChat, useRef: useRefChat } = React;

/* ============================================================
   Hippo — AI infrastructure concierge
   ============================================================ */
const SYSTEM_PROMPT = `You are Hippo, the smart assistant for BlueHippoCyber.

WHAT WE DO: BlueHippoCyber builds automated systems for service businesses that help them capture more leads, follow up automatically, and never miss a job — even after hours. We build the website, the lead capture, the follow-up, the booking, the reminders, the reviews — connected and running on their own.

WHO WE WORK WITH: security camera installers, TV mount & AV installers, and cybersecurity consultants. Also open to other service businesses.

THE OWNER: BlueHippoCyber is founded and run by Keenan McGriff, an automation engineer based in Florida. Direct support, no corporate runaround.

PRICING MODEL: Everything is a ONE-TIME SETUP. No subscriptions, no monthly retainer. The owner picks what they need, starts with one, and adds more when they're ready. Every business gets a FREE Business Growth Audit first — we look at how they get leads, how they follow up, and where they're losing money, then tell them exactly what to fix.

POPULAR SETUPS (one-time prices):
  · Professional Website + Smart Chat Assistant — $560
  · Missed-Call Text-Back — $297
  · Booking & Scheduling Setup — $347
  · Lead Capture Setup — $397
  · Follow-Up Automation — $397
  · Review Request Automation — $297
  · Google Business Profile Setup — $297
  · Local Search Build — $397
  · Ad Campaign Setup — $597
  · Full Lead Engine Build (capture + follow-up + booking + reminders, all connected) — $1,500
There are 20+ individual services plus packages tailored to camera installers, AV installers, and cybersecurity consultants. Point people to the pricing section for the full list.

PERSONALITY: Direct and plain. Talk like you're texting a busy business owner who's on a job site. Short sentences. One idea per sentence. Outcome-first — say what a service DOES for them, not what it is. No corporate language, no jargon ("synergy," "leverage," "holistic").

CRITICAL RULE: NEVER use the word "AI." Frame everything as "automated," "a system that...," or "smart" where needed (e.g. "smart chat assistant"). Never say "chatbot" or "bot" either.

THE GOAL: Help service businesses stop losing jobs to whoever answers faster — capture every lead, follow up on every quote, book more jobs without hiring. Steer people toward booking their free audit.

NAVIGATION: If they ask to see pricing, how it works, results, services, or insights — respond briefly AND end your message with ONE token on its own line:
[NAV:how]   [NAV:pricing]   [NAV:stories]   [NAV:insights]   [NAV:contact]   [NAV:services]   [NAV:home]

Keep responses tight — 2–4 sentences. No markdown, no headers. Plain and direct.`;

function HippoChat({ open, setOpen, navigate }) {
  const [messages, setMessages] = useStateChat([
    { role: 'system', text: 'Connected to BlueHippoCyber. You\'re chatting with Hippo.' },
    { role: 'bot', text: 'Hey — I\'m Hippo. I help service businesses figure out which systems to set up first so they stop losing jobs. What kind of business do you run? Or ask me anything — pricing, how it works, real results.' },
  ]);
  const [input, setInput] = useStateChat('');
  const [thinking, setThinking] = useStateChat(false);
  const scrollRef = useRefChat(null);

  useEffectChat(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

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
      if (window.claude && typeof window.claude.complete === 'function') {
        const promptText = `${SYSTEM_PROMPT}\n\n--- conversation ---\n` +
          history.map(m => `${m.role === 'assistant' ? 'Hippo' : 'User'}: ${m.content}`).join('\n') +
          `\nHippo:`;
        reply = await window.claude.complete(promptText);
      } else {
        reply = scriptedFallback(text);
      }
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
        else navigate('home', dest);
      }, 600);
    }
  };

  const scripted = {
    pricing: 'Everything is a one-time setup — no subscriptions. Most owners start with a Website + Smart Chat Assistant ($560), Missed-Call Text-Back ($297), or Follow-Up Automation ($397). Want the whole system connected? The Full Lead Engine Build is $1,500. And the Business Growth Audit is always free.',
    how: 'Three steps. We start with a free audit and find where you\'re losing money, then we build the systems you need, then leads get captured, followed up, and booked automatically. Want the walkthrough?',
    results: 'A Tampa camera installer stopped losing after-hours leads and added a second crew — 62% more booked jobs with sub-60-second replies. A Georgia AV installer went from chasing quotes to booked 3 weeks out. Want the details?',
    insights: 'We publish short, plain tips for service businesses every week — follow-up, lead capture, local search, reviews. Want to see the latest one?',
    contact: 'Easiest way is to grab Keenan directly. Call or text (863) 209-7940, or email keenan@bluehippocyber.com. He replies within 4 hours.',
    services: 'We build the website, the lead capture, the follow-up, the booking, the reminders, and the review requests — connected and running on their own. Pick one or build the whole engine. Want to see everything?',
    default: 'I can walk you through pricing, how it works, real results, the free audit, or just connect you with Keenan. What do you want to start with?',
  };

  function scriptedFallback(t) {
    const q = t.toLowerCase();
    if (/(price|pricing|cost|how much|setup|fee)/.test(q)) return scripted.pricing + '\n[NAV:pricing]';
    if (/(ad|advertis|campaign|google|facebook|meta)/.test(q)) return scripted.services + '\n[NAV:services]';
    if (/(how|work|process|step|build)/.test(q)) return scripted.how + '\n[NAV:how]';
    if (/(result|case|story|example|proof|client)/.test(q)) return scripted.results + '\n[NAV:stories]';
    if (/(service|build|system|what do you)/.test(q)) return scripted.services + '\n[NAV:services]';
    if (/(insight|blog|article|read|tip)/.test(q)) return scripted.insights + '\n[NAV:insights]';
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
        <div className="chat-bubble" onClick={() => setOpen(true)} title="Chat with Hippo">
          <div className="pulse"></div>
          <div className="mark"></div>
        </div>
      )}
      <div className={`chat-window ${open ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="mark"></div>
          <div className="title-block">
            <div className="title">HIPPO · SMART ASSISTANT</div>
            <div className="sub">online · reply in seconds</div>
          </div>
          <button className="close" onClick={() => setOpen(false)} title="Close">×</button>
        </div>
        <div className="chat-messages" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="author">
                {m.role === 'system' ? '// system' : m.role === 'bot' ? 'Hippo' : 'you'}
              </div>
              <div className="bubble">{m.text}</div>
            </div>
          ))}
          {thinking && (
            <div className="msg bot">
              <div className="author">Hippo</div>
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
          Capture, follow-up, booking, reviews — the systems that keep service businesses
          from losing jobs. Built for security camera installers, TV mount & AV techs, and
          cybersecurity consultants. Pick one, or build the whole engine. Every service is
          a one-time setup.
        </p>
        <div className="cta-row" style={{ marginTop: 28 }}>
          <button className="cta-primary" onClick={() => navigate('home', 'contact')}>
            Get Your Free Audit
            <span className="arrow"></span>
          </button>
          <button className="cta-ghost" onClick={() => navigate('home', 'pricing')}>
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

Object.assign(window, { HippoChat, SolutionsPage });
