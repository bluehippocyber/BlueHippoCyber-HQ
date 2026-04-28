/* global React */
const { useState, useEffect, useRef, useCallback } = React;

/* ============================================================
   Sentinel status bar (top)
   ============================================================ */
function SentinelBar({ active, bridge }) {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const z = (n) => String(n).padStart(2, '0');
      setTime(`${z(d.getUTCHours())}:${z(d.getUTCMinutes())}:${z(d.getUTCSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="sentinel-bar">
      <div className="left">
        {active ? <span className="dot"></span> : null}
        <span>Sentinel Systems: <span className="span-neon">{active ? 'ACTIVE' : 'STANDBY'}</span></span>
        <span className="sep">/</span>
        <span>Bridge: <span className="span-neon">{bridge ? 'ONLINE' : 'OFFLINE'}</span></span>
        <span className="sep">/</span>
        <span>Local AI: <span className="span-neon">OLLAMA · MISTRAL-7B</span></span>
      </div>
      <div className="right">
        <span>NODE&nbsp;BHC-001</span>
        <span className="sep">/</span>
        <span>UTC&nbsp;{time}</span>
      </div>
    </div>
  );
}

/* ============================================================
   Top nav
   ============================================================ */
function Nav({ route, navigate }) {
  return (
    <nav className="nav">
      <a className="brand" href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
        <span className="mark"></span>
        <span className="word">Blue<em>Hippo</em>Cyber</span>
      </a>
      <div className="links">
        <a href="#" className={route === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a>
        <a href="#" className={route === 'solutions' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('solutions'); }}>Solutions</a>
        <a href="#hippo" onClick={(e) => { e.preventDefault(); navigate('home', 'hippo'); }}>HIPPO Framework</a>
        <a href="#vault" onClick={(e) => { e.preventDefault(); navigate('home', 'vault-section'); }}>The Vault</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); navigate('home', 'contact'); }}>Contact</a>
      </div>
      <button className="cta-mini" onClick={() => navigate('home', 'contact')}>Speak to Architect →</button>
    </nav>
  );
}

/* ============================================================
   Hero
   ============================================================ */
function Hero({ onSpeak, onScroll }) {
  return (
    <section className="hero" id="hero">
      <video className="hero-video" src="assets/hero-loop.mp4" autoPlay muted loop playsInline></video>
      <div className="hero-grid"></div>
      <div className="hero-scrim"></div>
      <div className="hero-content">
        <div className="tagline-mono">[ Defensive Architects · Est. 2024 · Private-First ]</div>
        <h1>
          Building <span className="neon">Unshakeable</span><br/>
          Digital Fortresses.
        </h1>
        <p className="slogan">
          Deploying Private AI Infrastructure for Small Businesses Across the USA.
          Hardened SQL, local-first AI, autonomous sentinels — deployed inside walls
          we architect for you, around the data only you should ever see.
        </p>
        <div className="trust-line">
          <span className="trust-flag">◆</span>
          <span><b>Florida-Based. Nationally-Trusted.</b></span>
          <span className="trust-sep">·</span>
          <span>Direct Support from Keenan McGriff:</span>
          <a href="tel:8634404145" className="trust-phone">863-440-4145</a>
        </div>
        <div className="cta-row">
          <button className="cta-primary" onClick={onSpeak}>
            Speak to the Architect
            <span className="arrow"></span>
          </button>
          <button className="cta-ghost" onClick={onScroll}>
            Read the HIPPO Doctrine
          </button>
        </div>
      </div>
      <div className="scroll-hint">
        <span>Scroll</span>
        <span className="line"></span>
      </div>
    </section>
  );
}

/* ============================================================
   HIPPO pillars (scroll-reveal)
   ============================================================ */
const HIPPO_DATA = [
  {
    letter: 'H', num: '01',
    name: 'Hardening',
    lead: 'We don\'t patch — we re-architect. Platform-specific reinforcement, hardened SQL with row-level encryption, and surface reduction on every endpoint we touch.',
    tools: ['DesktopScanner', 'macOS CIS L2', 'Win11 STIG', 'Hardened-SQL', 'AppArmor profiles'],
    statLabel: 'Avg Surface Reduction',
    statNum: '74%',
    statSub: 'across 12 onboarded clients',
    ascii: '▓▓▓▓▓▓▓▓▓░░░  74'
  },
  {
    letter: 'I', num: '02',
    name: 'Intelligence',
    lead: 'OSINTOrchestrator runs deep reconnaissance across 40+ sources before threats reach you. Private AI orchestration — Claude, Gemini, Ollama — keeps your queries off public infrastructure.',
    tools: ['OSINTOrchestrator', 'PcapAnalyzer', 'Ollama / Mistral', 'MITRE ATT&CK', 'Maltego'],
    statLabel: 'OSINT Sources Indexed',
    statNum: '42',
    statSub: 'continuous · 18 dark-web feeds',
    ascii: '◢◤◢◤◢◤◢◤◢◤◢◤'
  },
  {
    letter: 'P', num: '03',
    name: 'Privacy',
    lead: 'Metadata stripped at the byte level. Footprint cleanup that actually reaches takedown. 100% data sovereignty — your AI inference runs on your hardware, your queries never leave your perimeter.',
    tools: ['ExifTool', 'YeOldeCleanser', 'Local-first AI', 'GDPR/CCPA', 'Removal pipelines'],
    statLabel: 'Records Removed',
    statNum: '11.4K',
    statSub: 'broker takedowns · last 90d',
    ascii: '⌬ ⌬ ⌬ ⌬ ⌬ ⌬'
  },
  {
    letter: 'P', num: '04',
    name: 'Protection',
    lead: 'Real-time sentinels watch the wire. Telegram and Gmail alerts in under 60 seconds. Web3 contract audits before deploy — because once it\'s on-chain, it\'s permanent.',
    tools: ['Sentinel-Bridge', 'Telegram alerts', 'OWASP Top-10', 'SolidityParser', 'DeFiHackLabsDB'],
    statLabel: 'Median Alert Latency',
    statNum: '38s',
    statSub: 'breach signal → human eyes',
    ascii: '◉───◯───◉───◯'
  },
  {
    letter: 'O', num: '05',
    name: 'Orchestration',
    lead: 'AgenticCore plans, executes, validates — autonomously. n8n pipelines collapse manual ops. Speed-to-lead under 60 seconds, hands free, 24/7. The architect sleeps. The fortress doesn\'t.',
    tools: ['AgenticCore', 'n8n', 'Vapi voice', 'Claude Code', 'Sentinel-Bot'],
    statLabel: 'Speed-to-Lead',
    statNum: '< 60s',
    statSub: 'autonomous · 99.4% uptime',
    ascii: '⟶⟶⟶ AUTO ⟶⟶⟶'
  },
];

function HippoFramework() {
  const refs = useRef([]);
  const [active, setActive] = useState(new Set());
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      setActive(prev => {
        const next = new Set(prev);
        entries.forEach(en => {
          const idx = Number(en.target.dataset.idx);
          if (en.isIntersecting) next.add(idx);
          else if (en.intersectionRatio === 0) next.delete(idx);
        });
        return next;
      });
    }, { threshold: 0.35, rootMargin: '-15% 0px -15% 0px' });
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section hippo-frame" id="hippo">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 02 · Doctrine</div>
          <h2>The HIPPO Framework.</h2>
        </div>
        <div className="meta">
          5 PILLARS · 1 DOCTRINE<br/>
          <b>{active.size}/5</b> illuminated
        </div>
      </div>
      <div className="hippo-pillars">
        {HIPPO_DATA.map((p, i) => (
          <div
            key={i}
            ref={(el) => refs.current[i] = el}
            data-idx={i}
            className={`pillar ${active.has(i) ? 'in-view' : ''}`}
          >
            <div className="letter" data-num={p.num}>{p.letter}</div>
            <div className="body">
              <h3>{p.name}</h3>
              <p className="lead">{p.lead}</p>
              <div className="tools">
                {p.tools.map(t => <span key={t} className="tool">{t}</span>)}
              </div>
            </div>
            <div className="stat-card">
              <div className="label">{p.statLabel}</div>
              <div className="stat-num">{p.statNum}</div>
              <div className="stat-sub">{p.statSub}</div>
              <div className="ascii">{p.ascii}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Vault tiers
   ============================================================ */
const TIER_DATA = [
  {
    num: '01', name: 'The Ghost', focus: 'Pre-Infiltration & Privacy',
    plain: 'Remove your personal info from the web. Stop junk mail and spam.',
    setup: '$997', monthly: '$497',
    features: [
      { txt: 'Digital Footprint Cleanup (OSINTOrchestrator)' },
      { txt: 'Metadata Stripping (ExifTool pipeline)' },
      { txt: 'DM/Email Inbox Triage (CyberAgent Base)' },
      { txt: 'Social Media Privacy Audit' },
      { txt: 'Secure SQL Database Management' },
      { txt: 'Basic Private AI Chatbot (Ollama/Gemini)' },
    ],
  },
  {
    num: '02', name: 'The Sentinel', focus: 'Active Defense & Growth',
    plain: '24/7 Website Security. Never miss a customer inquiry again.',
    setup: '$2,497', monthly: '$1,497',
    features: [
      { txt: 'Everything in The Ghost', inherit: true },
      { txt: 'Impersonator / Clone Audits' },
      { txt: 'Weekly OWASP Top-10 WebScans' },
      { txt: 'Real-time Telegram + Gmail Alerts' },
      { txt: 'Custom Secure Website + Hosting' },
      { txt: 'AI Lead Capture Automation' },
    ],
    featured: true,
    badge: 'Recommended Growth Driver',
  },
  {
    num: '03', name: 'The Architect', focus: 'Sovereign Build · Total Ownership',
    plain: '$12,500 One-Time. Own your data — no cloud, no monthly bills.',
    setup: '$12,500', monthly: '$0',
    sovereign: true,
    features: [
      { txt: 'Custom Local AI PC — on-prem hardware', inherit: true },
      { txt: '100% on-site data privacy · zero cloud egress' },
      { txt: 'Full company standards + marketing integration' },
      { txt: 'Custom Vapi Voice Assistant + AgenticCore' },
      { txt: 'Speed-to-Lead < 60 seconds, autonomous' },
      { txt: 'Monthly MITRE ATT&CK PDF Reports' },
      { txt: 'On-Call Service & Maintenance — no subscription' },
    ],
  },
  {
    num: '04', name: 'Sentinel Light', focus: 'À La Carte · Mix & Match',
    plain: 'Buy what you need. Own your assets. Add managed monitoring monthly.',
    splitSections: {
      assets: {
        title: 'One-Time Assets · Ownership',
        badge: 'Buy once, own forever',
        items: [
          { name: 'Private AI Server Build', price: '$15,000' },
          { name: 'Phone Answering Bot',     price: '$750' },
          { name: 'Lead-Gen Site',           price: '$900' },
          { name: 'Text-Back Automation',    price: '$500' },
        ],
      },
      managed: {
        title: 'Managed Services · Monthly',
        badge: 'Recurring · cancel anytime',
        items: [
          { name: 'Deep Web Monitoring',  price: '$150', unit: '/mo' },
          { name: 'Vulnerability Scanning', price: '$300', unit: '/mo' },
          { name: 'Inbox Triage',         price: '$200', unit: '/mo' },
        ],
      },
    },
  },
];

function Vault({ featuredOverride }) {
  return (
    <section className="section vault" id="vault-section">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 03 · The Vault</div>
          <h2>Architected by Tier.</h2>
        </div>
        <div className="meta">
          SETUP + MONTHLY · MONTH-TO-MONTH<br/>
          <b>No annual lock-in.</b> Remote onboarding · all 50 states.
        </div>
      </div>
      <div className="tier-grid">
        {TIER_DATA.map((t, i) => {
          const isFeatured = featuredOverride != null ? featuredOverride === i : t.featured;
          const isFlat = !!t.flatItems;
          const isSplit = !!t.splitSections;
          return (
            <div key={t.num} className={`tier ${isFeatured ? 'featured' : ''} ${isFlat || isSplit ? 'tier-flat' : ''} ${t.sovereign ? 'sovereign-tier' : ''} ${isSplit ? 'tier-split' : ''}`}>
              {isFeatured && <div className="badge">{t.badge || 'Selected'}</div>}
              <div className="tier-num">TIER · {t.num}</div>
              <div className="tier-name">{t.name}</div>
              <div className="tier-focus">{t.focus}</div>
              {t.plain && <div className="tier-plain">{t.plain}</div>}
              {isSplit ? (
                <>
                  <div className="split-block">
                    <div className="split-head">
                      <span className="split-title">{t.splitSections.assets.title}</span>
                      <span className="split-badge split-badge-own">◆ {t.splitSections.assets.badge}</span>
                    </div>
                    <div className="flat-list">
                      {t.splitSections.assets.items.map((item, j) => (
                        <div className="flat-row" key={j}>
                          <span className="flat-name">{item.name}</span>
                          <span className="flat-price">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="split-block">
                    <div className="split-head">
                      <span className="split-title">{t.splitSections.managed.title}</span>
                      <span className="split-badge split-badge-rec">↻ {t.splitSections.managed.badge}</span>
                    </div>
                    <div className="flat-list">
                      {t.splitSections.managed.items.map((item, j) => (
                        <div className="flat-row" key={j}>
                          <span className="flat-name">{item.name}</span>
                          <span className="flat-price">{item.price}<span className="flat-unit">{item.unit}</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="tier-cta">Build Your Stack →</button>
                </>
              ) : isFlat ? (
                <>
                  <div className="flat-list">
                    {t.flatItems.map((item, j) => (
                      <div className="flat-row" key={j}>
                        <span className="flat-name">{item.name}</span>
                        <span className="flat-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flat-note">{t.flatNote}</div>
                  <button className="tier-cta">Build Your Stack →</button>
                </>
              ) : (
                <>
                  <div className={`price price-setup-first ${t.sovereign ? 'price-sovereign' : ''}`}>
                    {t.sovereign ? (
                      <>
                        <div className="setup-label">One-Time Build · Total Ownership</div>
                        <div className="setup-prominent">{t.setup}</div>
                        <div className="monthly-after sovereign-after"><b>$0/mo</b><span className="month"> · On-call service & maintenance</span></div>
                      </>
                    ) : (
                      <>
                        <div className="setup-label">Setup Fee · One-time</div>
                        <div className="setup-prominent">{t.setup}</div>
                        <div className="monthly-after">then <b>{t.monthly}</b><span className="month">/mo</span></div>
                      </>
                    )}
                  </div>
                  <ul className="features">
                    {t.features.map((f, j) => (
                      <li key={j} className={f.inherit ? 'inherit' : ''}>{f.txt}</li>
                    ))}
                  </ul>
                  <button className="tier-cta">{t.sovereign ? `Commission ${t.name} →` : `Deploy ${t.name} →`}</button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Stories carousel
   ============================================================ */
const STORIES = [
  {
    tag: 'Case 01 · Italian Deli, NYC',
    title: 'A 75-year-old deli walks into the metaverse — and walks out hardened.',
    body: 'We built a 3D walkthrough demo for the front-of-house, hardened the lead-capture pipeline, and stripped 1,200+ PII records from data brokers. Foot traffic up. Footprint down.',
    stats: [
      { num: '+38%', lbl: 'Lead capture' },
      { num: '1.2K', lbl: 'Records removed' },
      { num: '<1s', lbl: 'TTFB hardened' },
    ],
    mock: (
      <div className="story-mock">
        <div className="mock-header">
          <span></span><span></span><span></span>
          <span className="url">deli3d.bluehippo.io</span>
        </div>
        <div style={{ color: 'var(--neon)', marginBottom: 6 }}>$ npm run deploy:deli</div>
        <div>{'>'} hardening front-of-house lead form...</div>
        <div>{'>'} CSP + HSTS + SameSite=Strict — <span style={{ color: 'var(--ok)' }}>OK</span></div>
        <div>{'>'} OSINT sweep · 1,247 records flagged</div>
        <div>{'>'} broker takedowns scheduled · 18 sources</div>
        <div style={{ color: 'var(--neon)', marginTop: 6 }}>FORTRESS ONLINE ✓</div>
      </div>
    ),
  },
  {
    tag: 'Case 02 · Florida Treehouse',
    title: 'Boutique vacation rental gets a Sentinel — and a 6-figure booking quarter.',
    body: 'Local-SEO tuned site, Hippo-Chat handling 80% of FAQs unattended, speed-to-lead under 40s. The treehouse runs itself now. The owner hasn\'t answered a "do you have wifi?" email in 7 months.',
    stats: [
      { num: '40s', lbl: 'Speed-to-lead' },
      { num: '80%', lbl: 'FAQ deflection' },
      { num: '6×', lbl: 'Booking velocity' },
    ],
    mock: (
      <div className="story-mock">
        <div className="mock-header">
          <span></span><span></span><span></span>
          <span className="url">treehouse-fl.io</span>
        </div>
        <div style={{ color: 'var(--neon)', marginBottom: 6 }}>HIPPO-CHAT &gt; visitor#492</div>
        <div style={{ color: 'var(--ink-2)' }}>"are pets allowed?"</div>
        <div style={{ color: 'var(--neon)', marginTop: 4 }}>↳ bot: dogs welcome, $50 fee</div>
        <div style={{ color: 'var(--ink-2)' }}>"book mar 14-18"</div>
        <div style={{ color: 'var(--neon)', marginTop: 4 }}>↳ bot: holding · payment link sent</div>
        <div style={{ color: 'var(--ok)', marginTop: 8 }}>BOOKING #4827 · $1,840</div>
      </div>
    ),
  },
];

function Stories() {
  const [idx, setIdx] = useState(0);
  const story = STORIES[idx];
  return (
    <section className="section stories" id="stories">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 04 · Field Reports</div>
          <h2>Fortresses, Built.</h2>
        </div>
        <div className="meta">
          {String(idx + 1).padStart(2,'0')} / {String(STORIES.length).padStart(2,'0')}
        </div>
      </div>
      <div className="story-stage">
        <div className="story-visual">{story.mock}</div>
        <div className="story-content">
          <div>
            <div className="story-tag">{story.tag}</div>
            <h3>{story.title}</h3>
            <p className="story-body">{story.body}</p>
          </div>
          <div>
            <div className="story-stats">
              {story.stats.map(s => (
                <div key={s.lbl}>
                  <div className="s-num">{s.num}</div>
                  <div className="s-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
            <div className="story-nav">
              <div className="dots">
                {STORIES.map((_, i) => (
                  <div key={i} className={`dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)}></div>
                ))}
              </div>
              <button onClick={() => setIdx((idx - 1 + STORIES.length) % STORIES.length)}>‹</button>
              <button onClick={() => setIdx((idx + 1) % STORIES.length)}>›</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Marquee
   ============================================================ */
function Marquee() {
  const tools = [
    'WebScanner', 'PcapAnalyzer', 'OSINTOrchestrator',
    'MITRE ATT&CK Mapping', 'SolidityParser', 'DeFiHackLabsDB',
    'AgenticCore', 'Sentinel-Bridge', 'Hardened-SQL',
    'ExifTool Pipeline', 'Vapi Voice', 'n8n Orchestrator',
  ];
  const all = [...tools, ...tools];
  return (
    <section className="marquee-section">
      <div className="label">// Engineered Toolchain · 12 modules · Continuously Audited</div>
      <div className="marquee">
        {all.map((t, i) => (
          <div className="item" key={i}>
            <span className="glyph"></span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Contact (terminal-styled)
   ============================================================ */
function Contact() {
  const [tier, setTier] = useState('sentinel');
  const [severity, setSeverity] = useState('medium');
  const sevColor = {
    low: 'var(--ok)', medium: 'oklch(0.78 0.16 220)',
    high: 'var(--warn)', critical: 'var(--crit)',
  }[severity];
  const sevLabel = {
    low: 'just exploring',
    medium: 'planning a deployment',
    high: 'active threat / urgent',
    critical: 'breach in progress',
  }[severity];

  return (
    <section className="section contact" id="contact">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 06 · Channel</div>
          <h2>Contact Form.</h2>
        </div>
        <div className="meta">
          ENCRYPTED INTAKE · TLS 1.3<br/>
          <b>Ack within 4h.</b> Always.
        </div>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          <h3>Speak architect-to-architect.</h3>
          <p>
            Skip the sales funnel. Tell us what you're defending and we'll send back a
            scoped recommendation within 4 hours — signed by the Sentinel that will own your account.
          </p>
          <div className="channels">
            <div className="channel">
              <div className="icon">☎</div>
              <div className="name">Call or Text</div>
              <div className="val"><a href="tel:8634404145" style={{ color: 'inherit', textDecoration: 'none' }}>863-440-4145</a></div>
            </div>
            <div className="channel">
              <div className="icon">@</div>
              <div className="name">Email</div>
              <div className="val">bluehippo.cyber@gmail.com</div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Intake encrypted and forwarded to Sentinel-Bridge.'); }}>
          <div className="term-header">
            <div className="dots"><span></span><span></span><span></span></div>
            <span className="path">~ /intake/new</span>
          </div>
          <div className="field">
            <label>handle <span className="req">*</span></label>
            <input type="text" required placeholder="ada@yourcompany.io" />
          </div>
          <div className="field">
            <label>org / domain</label>
            <input type="text" placeholder="yourcompany.io" />
          </div>
          <div className="field">
            <label>tier of interest</label>
            <select value={tier} onChange={(e) => setTier(e.target.value)}>
              <option value="ghost">Tier 1 — The Ghost</option>
              <option value="sentinel">Tier 2 — The Sentinel</option>
              <option value="architect">Tier 3 — The Architect</option>
              <option value="light">Tier 4 — Sentinel Light</option>
              <option value="alacarte">À la carte</option>
            </select>
          </div>
          <div className="field">
            <label>severity</label>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
              <option value="low">low — exploring</option>
              <option value="medium">medium — planning</option>
              <option value="high">high — urgent</option>
              <option value="critical">critical — breach in progress</option>
            </select>
          </div>
          <div className="severity-note">
            <span className="sev-dot" style={{ background: sevColor, boxShadow: `0 0 6px ${sevColor}` }}></span>
            <span>severity: <span style={{ color: sevColor }}>{severity.toUpperCase()}</span> · {sevLabel}</span>
          </div>
          <div className="field">
            <label>brief</label>
            <textarea placeholder="What can we help you with?"></textarea>
          </div>
          <button type="submit">▸ Send Message</button>
        </form>
      </div>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-mark"></div>
      <div className="footer-inner">
        <div className="col">
          <h4>// BlueHippoCyber</h4>
          <p style={{ color: 'var(--ink)', fontSize: 14, lineHeight: 1.6, maxWidth: 360 }}>
            Defensive Architects. Building unshakeable digital fortresses, one hardened endpoint at a time.
          </p>
          <p style={{ color: 'var(--ink-3)', fontSize: 12, marginTop: 12, fontFamily: 'var(--font-mono)' }}>
            EST. 2024 · Private-First · Local-AI Native
          </p>
        </div>
        <div className="col">
          <h4>Doctrine</h4>
          <a href="#hippo">HIPPO Framework</a>
          <a href="#vault-section">The Vault</a>
          <a href="#stories">Field Reports</a>
        </div>
        <div className="col">
          <h4>Toolchain</h4>
          <a href="#">OSINTOrchestrator</a>
          <a href="#">Sentinel-Bridge</a>
          <a href="#">AgenticCore</a>
          <a href="#">Hippo-Chat</a>
        </div>
        <div className="col">
          <h4>Channel</h4>
          <a href="#contact">bluehippo.cyber@gmail.com</a>
          <a href="#contact">@BlueHippoCyber_Sentinel_bot</a>
          <a href="#vault">/vault (admin)</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 BlueHippoCyber · All transmissions encrypted</div>
        <div className="socials">
          <a title="LinkedIn">in</a>
          <a title="Gumroad">G</a>
          <a title="Instagram">ig</a>
          <a title="YouTube">yt</a>
          <a title="Facebook">fb</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  SentinelBar, Nav, Hero, HippoFramework, Vault, Stories, Marquee, Contact, Footer,
});
