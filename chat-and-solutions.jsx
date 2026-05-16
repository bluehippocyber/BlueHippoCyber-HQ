/* global React */
const { useState: useStateChat, useEffect: useEffectChat, useRef: useRefChat } = React;

/* ============================================================
   Hippo — AI infrastructure concierge
   ============================================================ */
const SYSTEM_PROMPT = `You are Hippo, the AI concierge for BlueHippoCyber.

WHAT WE DO: BlueHippoCyber architects AI growth infrastructure for security camera installers, low-voltage contractors, and service businesses. We build and operate lead-generation engines, AI response infrastructure, and operational workflow systems — done-for-you. We also manage paid lead-generation campaigns (Meta, Google, local channels) tuned for measurable ROI.

PRIMARY NICHE: CCTV installers, low-voltage contractors, surveillance system companies, residential & commercial security integrators, access control. SECONDARY: open to other field-service trades and local service businesses.

THE FOUNDER: BlueHippoCyber is founded and operated by Keenan McGriff in Lakeland, Florida. Direct support, no corporate runaround.

DEPLOYMENT TIMELINE: Most installs go live in 5–10 business days.

VOCABULARY (use these): systems, infrastructure, operations, lead engine, workflow automation, business systems, growth infrastructure, AI response layer, managed campaigns.

VOCABULARY (AVOID): "chatbot," "automation agency," "bot," "AI chatbot." We are NOT a chatbot agency — we are an AI growth infrastructure company.

PERSONALITY: Confident, performance-driven, ROI-focused. Plain English but premium. No marketing fluff, no buzzword soup. Talk like a senior architect who has installed dozens of these systems and knows what works.

THE GOAL: Help installers and service businesses generate more qualified leads, respond faster, automate ops, and scale without hiring. Every answer ties back to revenue impact.

THREE TIERS:
  · Ghost — Foundation Lead Engine. $299 setup, $497/mo. Capture + routing + AI auto-replies + CRM connection. Monthly retainer covers monitoring, automation upkeep, CRM syncing, reporting, support.
  · Sentinel — Operations + Growth System. $597 setup, $997–$1,497/mo. Full ops layer + managed lead-gen campaigns. MOST POPULAR. Monthly covers system monitoring, lead response mgmt, ad campaign management, optimization, CRM syncing, AI tuning, reporting, priority support.
  · Architect — Full Business Infrastructure. $1,500 setup, $2,500–$4,500/mo. Voice AI, multi-channel outbound, custom workflows, dedicated growth architect. Monthly covers full lead-gen + ad management, multi-channel campaigns, AI voice ops, advanced analytics, custom workflow upkeep, same-day support, quarterly strategy.

THE MONTHLY RETAINER IS ONGOING GROWTH INFRASTRUCTURE — not software hosting. When asked, explain WHAT'S IN IT.

Add-ons: System Audit, Growth Monitoring, Standalone Lead Capture, Website Hardening, Local Search Build.

AD MANAGEMENT: We launch and manage targeted lead-generation campaigns designed for measurable ROI. Clients can scale ad budget up or down any time. Campaigns are optimized continuously. NEVER disclose internal budget tactics — just speak to performance, ROI, and continuous optimization.

NAVIGATION: If they ask to see pricing, how it works, results, services, or insights — respond briefly AND end your message with ONE token on its own line:
[NAV:how]   [NAV:pricing]   [NAV:stories]   [NAV:insights]   [NAV:contact]   [NAV:services]   [NAV:home]

Keep responses tight — 2–4 sentences. No markdown, no headers. Sound like an architect.`;

function HippoChat({ open, setOpen, navigate }) {
  const [messages, setMessages] = useStateChat([
    { role: 'system', text: 'Connected to BlueHippoCyber. You\'re chatting with Hippo.' },
    { role: 'bot', text: 'Hey — I\'m Hippo. I help installers and service operators figure out which growth systems to install first. What does your business look like? Or ask me anything — pricing, how the system works, real results.' },
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
    pricing: 'Three tiers. Ghost ($299 setup, $497/mo) — foundation lead engine. Sentinel ($597 setup, $997–$1,497/mo) — full ops + managed lead-gen, our most popular. Architect ($1,500 setup, $2,500–$4,500/mo) — full infrastructure with voice AI and multi-channel outbound. Monthly retainers cover monitoring, ad management, AI tuning, reporting — ongoing growth infrastructure, not hosting.',
    how: 'Three steps. We architect your system, then go live in 5–10 days with campaigns and AI response running, then we monitor and optimize monthly. Want the walkthrough?',
    results: 'A Tampa CCTV installer added a third service van inside 60 days — 62% more booked installs, sub-60-second lead response. A Georgia low-voltage contractor moved to 9 jobs/week with 4–7 qualified leads per day. Want me to pull up the full case studies?',
    insights: 'We publish operational intelligence for installers and trade businesses weekly — AI for security installers, lead generation tactics, surveillance trends. Want to see the latest piece?',
    contact: 'Call or text Keenan direct: 863-440-4145. Email: bluehippo.cyber@gmail.com. We reply within 4 hours.',
    ad: 'We launch and manage targeted lead-generation campaigns across Meta, Google, and local channels. Campaigns are tuned for measurable ROI and continuously optimized. You scale the budget up or down any time — full control stays with you.',
    default: 'I can walk you through pricing, how the install works, real installer results, insights we publish for the trade, or just connect you with Keenan. What do you want to start with?',
  };

  function scriptedFallback(t) {
    const q = t.toLowerCase();
    if (/(price|pricing|cost|tier|plan|how much)/.test(q)) return scripted.pricing + '\n[NAV:pricing]';
    if (/(ad|advertis|campaign|google|facebook|meta|lead gen)/.test(q)) return scripted.ad + '\n[NAV:pricing]';
    if (/(how|work|install|process|step)/.test(q)) return scripted.how + '\n[NAV:how]';
    if (/(result|case|story|example|proof|client|installer)/.test(q)) return scripted.results + '\n[NAV:stories]';
    if (/(insight|blog|article|read|intel)/.test(q)) return scripted.insights + '\n[NAV:insights]';
    if (/(contact|email|call|reach|book)/.test(q)) return scripted.contact + '\n[NAV:contact]';
    return scripted.default;
  }

  const quickActions = [
    { label: 'see pricing', prompt: 'Show me pricing.' },
    { label: 'how it works', prompt: 'How does this work?' },
    { label: 'ad management', prompt: 'How does ad management work?' },
    { label: 'book a call', prompt: 'I want to book a call.' },
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
            <div className="title">HIPPO · AI ARCHITECT</div>
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
      name: 'Lead Generation Engine',
      tag: 'The growth flywheel',
      body: 'Managed paid campaigns plus the capture infrastructure that converts the click. Built for installer trades — service-area targeting, intent-matched creative, and continuous optimization against booked-job rate.',
      bullets: [
        'Meta + Google + local channel campaigns',
        'Service-area + intent targeting',
        'On-site lead capture & qualification',
        'Continuous performance optimization',
        'Cost-per-qualified-lead reporting',
      ],
      stats: [
        { num: '$30–60', lbl: 'cost / qualified' },
        { num: '4–7 / day', lbl: 'lead pace' },
        { num: '+62%', lbl: 'booked installs' },
      ],
    },
    {
      num: '02',
      name: 'AI Response Infrastructure',
      tag: 'No lead waits',
      body: 'Inbound calls, missed calls, texts, forms, and DMs answered within seconds — by infrastructure tuned to your trade and your service area. Qualifies, books, routes to the right tech automatically.',
      bullets: [
        'AI response across phone, SMS, and forms',
        'Missed-call text-back automation',
        'Trade-specific qualification logic',
        'Auto-routing to the right tech or queue',
        'Human handoff when context demands it',
      ],
      stats: [
        { num: '< 60s', lbl: 'response time' },
        { num: '24 / 7', lbl: 'always-on' },
        { num: '80%', lbl: 'auto-handled' },
      ],
    },
    {
      num: '03',
      name: 'Operational Workflow',
      tag: 'Your tools, one nervous system',
      body: 'Quotes, dispatch, scheduling, intake, follow-up — wired into one operations layer. CRM updates flow automatically. The crew stops re-typing customer info between five different apps.',
      bullets: [
        'CRM integration + contact enrichment',
        'Calendar booking & crew dispatch',
        'Quote / estimate workflow automation',
        'Follow-up sequences (text + email)',
        'Real-time alerts & dashboards',
      ],
      stats: [
        { num: '12+', lbl: 'tools connected' },
        { num: '0', lbl: 'manual re-entry' },
        { num: '24 / 7', lbl: 'always synced' },
      ],
    },
    {
      num: '04',
      name: 'AI Voice & Multi-Channel',
      tag: 'For Architect-tier installs',
      body: 'A custom AI voice agent answers your phone in your brand voice — qualifies callers, books, dispatches. Outbound campaigns re-engage cold pipeline across SMS, email, and voice. At scale.',
      bullets: [
        'Custom AI voice agent for inbound',
        'Outbound SMS, email, and voice',
        'Multi-channel campaign orchestration',
        'Quarterly strategy reviews',
        'Dedicated growth architect',
      ],
      stats: [
        { num: '100%', lbl: 'inbound answered' },
        { num: '24 / 7', lbl: 'live coverage' },
        { num: 'your', lbl: 'brand voice' },
      ],
    },
  ];

  return (
    <div className="solutions-inner" style={{ position: 'relative' }}>
      <video className="hero-video" src="assets/hero-loop.mp4" autoPlay muted loop playsInline
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.16, zIndex: 0 }}></video>
      <div className="solutions-bg-watermark"></div>

      <section className="solutions-hero" style={{ position: 'relative', zIndex: 2 }}>
        <div className="eyebrow">// Services · End-to-end growth infrastructure</div>
        <h1>Every system we install,<br/><span style={{ color: 'var(--neon)', fontStyle: 'italic' }}>under one roof.</span></h1>
        <p className="lead">
          Four core systems — installed together as a tier, or run individually. Built around how
          security installers, low-voltage contractors, and field-service trades actually operate.
          We architect, install, and continuously operate the infrastructure for you.
        </p>
        <div className="cta-row" style={{ marginTop: 28 }}>
          <button className="cta-primary" onClick={() => navigate('home', 'contact')}>
            Book a 15-min Call
            <span className="arrow"></span>
          </button>
          <button className="cta-ghost" onClick={() => navigate('home', 'pricing')}>
            See Tiers & Pricing
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
