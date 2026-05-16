/* global React */
const { useState, useEffect, useRef, useCallback } = React;

/* ============================================================
   Top status bar — operational telemetry strip
   ============================================================ */
function SentinelBar({ active, bridge }) {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const z = (n) => String(n).padStart(2, '0');
      setTime(`${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="sentinel-bar">
      <div className="left">
        {active ? <span className="dot"></span> : null}
        <span>Lead Engine: <span className="span-neon">{active ? 'LIVE' : 'STANDBY'}</span></span>
        <span className="sep">/</span>
        <span>Campaigns: <span className="span-neon">{bridge ? 'OPTIMIZING' : 'PAUSED'}</span></span>
        <span className="sep">/</span>
        <span>Intake: <span className="span-neon">24 / 7</span></span>
      </div>
      <div className="right">
        <span>BHC · LAKELAND, FL</span>
        <span className="sep">/</span>
        <span>{time}</span>
      </div>
    </div>
  );
}

/* ============================================================
   Top nav
   ============================================================ */
function Nav({ route, navigate }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav className={`nav ${open ? 'nav-open' : ''}`}>
      <a className="brand" href="#" onClick={(e) => { e.preventDefault(); navigate('home'); close(); }}>
        <span className="mark"></span>
        <span className="word">Blue<em>Hippo</em>Cyber</span>
      </a>
      <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <div className="links">
        <a href="#" className={route === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('home'); close(); }}>Home</a>
        <a href="#how" onClick={(e) => { e.preventDefault(); navigate('home', 'how'); close(); }}>How It Works</a>
        <a href="#pricing" onClick={(e) => { e.preventDefault(); navigate('home', 'pricing'); close(); }}>Pricing</a>
        <a href="#insights" onClick={(e) => { e.preventDefault(); navigate('home', 'insights'); close(); }}>Insights</a>
        <a href="#" className={route === 'solutions' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('solutions'); close(); }}>Services</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); navigate('home', 'contact'); close(); }}>Contact</a>
      </div>
      <button className="cta-mini" onClick={() => { navigate('home', 'contact'); close(); }}>Book a Call →</button>
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
        <div className="tagline-mono">[ AI Infrastructure for Security Installers & Service Businesses ]</div>
        <h1>
          The growth system<br/>
          built for <span className="neon">installers.</span>
        </h1>
        <p className="slogan">
          We build the lead-generation engine, AI infrastructure, and operational workflow
          that powers modern security camera installers, low-voltage contractors, and service businesses.
          More qualified leads. Faster response. Scalable growth — without hiring.
        </p>
        <div className="trust-line">
          <span className="trust-flag">◆</span>
          <span><b>Specialists in CCTV & low-voltage.</b></span>
          <span className="trust-sep">·</span>
          <span>Open to service businesses USA-wide.</span>
          <span className="trust-sep">·</span>
          <a href="tel:8634404145" className="trust-phone">863-440-4145</a>
        </div>
        <div className="cta-row">
          <button className="cta-primary" onClick={onSpeak}>
            Book a 15-min Call
            <span className="arrow"></span>
          </button>
          <button className="cta-ghost" onClick={onScroll}>
            See the System
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
   Built For — niche specificity band
   ============================================================ */
function BuiltFor() {
  const verticals = [
    'CCTV Installers',
    'Low-Voltage Contractors',
    'Surveillance Companies',
    'Access Control',
    'Residential Security',
    'Commercial Integrators',
    'Field-Service Trades',
    'Local Contractors',
  ];
  return (
    <section className="built-for-band" id="built-for">
      <div className="bf-inner">
        <div className="bf-label">// Specialty Verticals · Built around their operations</div>
        <div className="bf-list">
          {verticals.map(v => (
            <div className="bf-chip" key={v}>
              <span className="bf-glyph">◆</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   What We Do — 4 outcome / infrastructure cards
   ============================================================ */
function WhatWeDo() {
  const items = [
    {
      num: '01',
      title: 'Lead Generation Engine',
      body: 'We build and operate the systems that produce qualified leads — paid campaigns, local search infrastructure, capture flows. Volume becomes predictable.',
    },
    {
      num: '02',
      title: 'AI Response Infrastructure',
      body: 'Inbound calls, texts, forms, and DMs are answered within seconds by infrastructure tuned to your trade. No lead waits. No lead is forgotten.',
    },
    {
      num: '03',
      title: 'Operational Workflow',
      body: 'Quotes, scheduling, dispatch, intake, follow-up — wired together as one operations layer. Your tools stop fighting; your team stops re-typing.',
    },
    {
      num: '04',
      title: 'Growth Monitoring',
      body: 'Every install is monitored, tuned, and reported. Your campaigns get better month over month — and you can see exactly what each dollar produced.',
    },
  ];
  return (
    <section className="section what-we-do" id="what">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 01 · What We Build</div>
          <h2>Four systems.<br/>One <span className="neon">growth infrastructure.</span></h2>
        </div>
        <div className="meta">
          INSTALLED · MONITORED · OWNED<br/>
          <b>Built for trade businesses.</b>
        </div>
      </div>
      <div className="what-grid">
        {items.map((it) => (
          <div className="what-card" key={it.num}>
            <div className="what-num">{it.num}</div>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   How It Works — 3-step
   ============================================================ */
function HowItWorks({ onSpeak }) {
  const steps = [
    {
      num: '01',
      title: 'We architect the system',
      body: 'A focused discovery call, then we design your full lead engine, AI response layer, and operational workflow. We architect what fits your trade — not a template.',
      stat: '5–10 days', statLabel: 'install timeline',
    },
    {
      num: '02',
      title: 'Campaigns + AI go live',
      body: 'Lead-generation campaigns launch with a controlled, performance-tuned budget. AI infrastructure goes live across calls, text, forms, and CRM. Leads start arriving.',
      stat: '< 60 sec', statLabel: 'lead response time',
    },
    {
      num: '03',
      title: 'We run, tune, and scale',
      body: 'Monthly retainer covers monitoring, ad management, automation upkeep, and reporting. Campaigns are optimized continuously. Scale ad budget any time.',
      stat: '24 / 7', statLabel: 'monitored & optimized',
    },
  ];
  return (
    <section className="section how" id="how">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 02 · How It Works</div>
          <h2>Architect.<br/><span className="neon">Operate.</span> Scale.</h2>
        </div>
        <div className="meta">
          DONE-FOR-YOU<br/>
          <b>End-to-end ownership.</b>
        </div>
      </div>
      <div className="how-grid">
        {steps.map((s, i) => (
          <div className="how-card" key={s.num}>
            <div className="how-step">STEP · {s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <div className="how-stat">
              <div className="hs-num">{s.stat}</div>
              <div className="hs-lbl">{s.statLabel}</div>
            </div>
            {i < steps.length - 1 && <div className="how-arrow">→</div>}
          </div>
        ))}
      </div>
      <div className="how-cta">
        <button className="cta-primary" onClick={onSpeak}>
          Architect My System
          <span className="arrow"></span>
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   Growth Engine — ad management positioning band
   ============================================================ */
function GrowthEngine() {
  const includes = [
    { name: 'Targeted Campaigns', body: 'Meta, Google, and local channels. Pre-tested creative tuned to your service area.' },
    { name: 'Continuous Optimization', body: 'Audiences, creatives, and bidding refined weekly against measurable ROI.' },
    { name: 'Performance Reporting', body: 'A monthly snapshot of leads generated, cost per qualified lead, and revenue impact.' },
    { name: 'Scale on Demand', body: 'Ramp budget up when you can take more work. Pull back any month. You stay in control.' },
  ];
  return (
    <section className="section growth-engine" id="growth-engine">
      <div className="ge-frame">
        <div className="ge-head">
          <div className="ge-eyebrow">// 03 · Growth Engine</div>
          <h2>Managed lead generation<br/>built for <span className="neon">measurable ROI.</span></h2>
          <p>
            We don't just install software and hand you a login. We launch and manage targeted
            lead-generation campaigns designed to produce real, attributable revenue —
            then refine them every month against the numbers.
          </p>
        </div>
        <div className="ge-grid">
          {includes.map(it => (
            <div className="ge-cell" key={it.name}>
              <div className="ge-name">{it.name}</div>
              <div className="ge-body">{it.body}</div>
            </div>
          ))}
        </div>
        <div className="ge-foot">
          <span className="ge-mono">// Campaigns scale with your business · Budget control stays with you · Every dollar is reportable</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Pricing — 3 tiers with explicit monthly retainer breakdown
   ============================================================ */
const TIER_DATA = [
  {
    num: '01', name: 'Ghost', focus: 'Foundation Lead Engine',
    plain: 'For operators who lose leads to slow response. We install the capture and routing layer.',
    setup: '$299', monthly: '$497',
    features: [
      { txt: 'Lead capture across site, social, and forms' },
      { txt: 'Missed-call text-back automation' },
      { txt: 'AI auto-replies, tuned to your trade' },
      { txt: 'CRM connection & lead routing' },
      { txt: 'Live in 5–7 business days' },
    ],
    monthlyIncludes: [
      'Lead response monitoring',
      'Automation upkeep & tuning',
      'CRM syncing',
      'Monthly performance report',
      'Technical support',
    ],
  },
  {
    num: '02', name: 'Sentinel', focus: 'Operations + Growth System',
    plain: 'The full operations layer plus managed lead-generation campaigns. Most installers start here.',
    setup: '$597', monthly: '$997 – $1,497',
    features: [
      { txt: 'Everything in Ghost', inherit: true },
      { txt: 'Full follow-up sequences (text + email)' },
      { txt: 'Calendar booking + dispatch routing' },
      { txt: 'CRM integration & contact enrichment' },
      { txt: 'Real-time alerts & dashboards' },
      { txt: 'Managed lead-generation campaigns' },
    ],
    monthlyIncludes: [
      'AI system monitoring',
      'Lead response management',
      'Automation upkeep',
      'Ad campaign management',
      'Campaign optimization',
      'CRM syncing & enrichment',
      'Workflow maintenance',
      'AI tuning & updates',
      'Monthly reporting & strategy',
      'Priority technical support',
    ],
    featured: true,
    badge: 'Most Popular · Recommended',
  },
  {
    num: '03', name: 'Architect', focus: 'Full Business Infrastructure',
    plain: 'A complete AI-powered growth engine. Dedicated architect, full ad mgmt, voice AI, multi-channel.',
    setup: '$1,500', monthly: '$2,500 – $4,500',
    features: [
      { txt: 'Everything in Sentinel', inherit: true },
      { txt: 'AI voice assistant for inbound calls' },
      { txt: 'Outbound multi-channel campaigns (SMS, email, voice)' },
      { txt: 'Custom workflow builds on request' },
      { txt: 'Dedicated growth architect' },
      { txt: 'Quarterly strategy review' },
    ],
    monthlyIncludes: [
      'Dedicated growth architect',
      'Full lead-gen + ad management',
      'Multi-channel campaign mgmt',
      'AI voice agent operations',
      'Advanced analytics & attribution',
      'Continuous AI tuning',
      'Custom workflow upkeep',
      'Same-day technical support',
      'Quarterly strategy sessions',
      'On-demand growth experiments',
    ],
  },
];

function Pricing({ featuredOverride }) {
  return (
    <section className="section pricing" id="pricing">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 04 · Pricing</div>
          <h2>The infrastructure tier<br/>that fits <span className="neon">where you are.</span></h2>
        </div>
        <div className="meta">
          MONTH-TO-MONTH<br/>
          <b>No long-term lock-in.</b> Scale up or pause anytime.
        </div>
      </div>
      <div className="tier-grid tier-grid-3">
        {TIER_DATA.map((t, i) => {
          const isFeatured = featuredOverride != null ? featuredOverride === i : t.featured;
          return (
            <div key={t.num} className={`tier ${isFeatured ? 'featured' : ''}`}>
              {isFeatured && <div className="badge">{t.badge || 'Recommended'}</div>}
              <div className="tier-num">TIER · {t.num}</div>
              <div className="tier-name">{t.name}</div>
              <div className="tier-focus">{t.focus}</div>
              {t.plain && <div className="tier-plain">{t.plain}</div>}
              <div className="price price-setup-first">
                <div className="setup-label">Setup · One-time</div>
                <div className="setup-prominent">{t.setup}</div>
                <div className="monthly-after">then <b>{t.monthly}</b><span className="month">/mo</span></div>
              </div>
              <ul className="features">
                {t.features.map((f, j) => (
                  <li key={j} className={f.inherit ? 'inherit' : ''}>{f.txt}</li>
                ))}
              </ul>

              <div className="monthly-includes">
                <div className="mi-label">// Monthly retainer includes</div>
                <ul className="mi-list">
                  {t.monthlyIncludes.map((m, k) => (
                    <li key={k}>{m}</li>
                  ))}
                </ul>
              </div>

              <button className="tier-cta">Architect with {t.name} →</button>
            </div>
          );
        })}
      </div>

      <div className="retainer-note">
        <span className="rn-mono">// Monthly retainer is ongoing business growth infrastructure — not software hosting.</span>
      </div>

      <ALaCarte />
    </section>
  );
}

/* ============================================================
   À la carte add-ons
   ============================================================ */
function ALaCarte() {
  const items = [
    { name: 'System Audit', body: 'A full audit of your current operations and lead flow. We identify the highest-leverage installs first.' },
    { name: 'Growth Monitoring', body: 'Ongoing monitoring of your existing lead engine and operational systems. Catches breaks before they cost you.' },
    { name: 'Standalone Lead Capture', body: 'Drop a single AI lead-capture surface onto an existing site or social profile, tuned to your trade.' },
    { name: 'Website Hardening', body: 'Practical safeguards on your site so it stays fast, online, and trustworthy under campaign traffic.' },
    { name: 'Local Search Build', body: 'Optimize and own your Google Business profile so local searches actually find and call your trade.' },
  ];
  return (
    <div className="alacarte">
      <div className="alacarte-head">
        <div className="eyebrow">// Add-ons</div>
        <h3>Standalone systems.</h3>
        <p>Run any of these on their own, or stack them onto a tier.</p>
      </div>
      <div className="alacarte-grid">
        {items.map((it) => (
          <div className="alacarte-card" key={it.name}>
            <div className="ac-name">{it.name}</div>
            <div className="ac-body">{it.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Stories
   ============================================================ */
const STORIES = [
  {
    tag: 'Case 01 · CCTV Installer · Tampa Bay',
    title: 'A 6-tech surveillance install company stopped losing leads — and added a third van.',
    body: 'We built their lead engine and operational workflow: managed campaigns, instant response across phone and form, dispatch routing into their CRM. Booked-job rate climbed inside 60 days.',
    stats: [
      { num: '+62%', lbl: 'Booked installs' },
      { num: '< 60s', lbl: 'Lead response' },
      { num: '3rd', lbl: 'Service van added' },
    ],
    mock: (
      <div className="story-mock">
        <div className="mock-header">
          <span></span><span></span><span></span>
          <span className="url">installer-ops · live</span>
        </div>
        <div style={{ color: 'var(--neon)', marginBottom: 6 }}>// inbound lead · 8:47 PM</div>
        <div style={{ color: 'var(--ink-2)' }}>"Need 8 cameras for warehouse"</div>
        <div style={{ color: 'var(--neon)', marginTop: 6 }}>↳ AI: qualified + site survey booked Tue 9am</div>
        <div style={{ color: 'var(--ink-2)', marginTop: 4 }}>{'>'} CRM updated · tech notified</div>
        <div style={{ color: 'var(--ink-2)' }}>{'>'} estimate template prepped</div>
        <div style={{ color: 'var(--ok)', marginTop: 8 }}>BOOKED · est. $11,400</div>
      </div>
    ),
  },
  {
    tag: 'Case 02 · Low-Voltage Contractor · GA',
    title: 'A two-truck low-voltage shop became a 9-job-a-week operation.',
    body: 'Managed lead-generation campaigns produced 4–7 qualified inquiries per day. AI response handled qualification and dispatch routing. The owner stopped quoting at 11pm.',
    stats: [
      { num: '4–7/d', lbl: 'Qualified leads' },
      { num: '9', lbl: 'Jobs/week' },
      { num: '0', lbl: 'Evenings spent quoting' },
    ],
    mock: (
      <div className="story-mock">
        <div className="mock-header">
          <span></span><span></span><span></span>
          <span className="url">growth-dashboard · live</span>
        </div>
        <div style={{ color: 'var(--neon)', marginBottom: 6 }}>// 30-day campaign snapshot</div>
        <div style={{ color: 'var(--ink-2)' }}>Leads generated · <span style={{ color: 'var(--neon)' }}>142</span></div>
        <div style={{ color: 'var(--ink-2)' }}>Qualified · <span style={{ color: 'var(--neon)' }}>97</span></div>
        <div style={{ color: 'var(--ink-2)' }}>Booked installs · <span style={{ color: 'var(--neon)' }}>36</span></div>
        <div style={{ color: 'var(--ink-2)' }}>Cost / qualified · <span style={{ color: 'var(--neon)' }}>$38</span></div>
        <div style={{ color: 'var(--ok)', marginTop: 8 }}>PIPELINE · $148K</div>
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
          <div className="eyebrow">// 05 · Field Results</div>
          <h2>Real installers.<br/>Real <span className="neon">growth.</span></h2>
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
   Insights — operational intelligence blog section
   ============================================================ */
const CATEGORIES = [
  'AI for Security Installers',
  'Business Automation',
  'Lead Generation',
  'Operations & Workflow',
  'AI News · Blue-Collar',
  'Surveillance Tech Trends',
  'Local Business Growth',
];

const TEASERS = [
  {
    cat: 'Lead Generation',
    title: 'The 4 automations every CCTV installer should run before adding a salesperson',
    blurb: 'Salespeople are expensive. Most missed-revenue problems on the install side aren\'t a sales problem — they\'re a response problem. Here\'s what to wire up first.',
    read: '6 min read',
  },
  {
    cat: 'Operations & Workflow',
    title: 'Why missed-call text-back is the highest-ROI install you\'ll ever do',
    blurb: 'For trades that get most of their work by phone, a 30-second automation often outperforms thousands in ad spend. A practical breakdown of why — and how to implement it well.',
    read: '4 min read',
  },
  {
    cat: 'Local Business Growth',
    title: 'Local SEO in 2026: what actually still works for low-voltage trades',
    blurb: 'Google\'s search results look nothing like they did 18 months ago. Here\'s the short list of things that still consistently produce booked jobs for local installers.',
    read: '7 min read',
  },
];

function Insights() {
  const [activeCat, setActiveCat] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="section insights" id="insights">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 06 · Insights</div>
          <h2>Automation Intel.</h2>
        </div>
        <div className="meta">
          OPERATIONAL INTELLIGENCE<br/>
          <b>For installers & service ops.</b>
        </div>
      </div>

      {/* Featured article */}
      <article className="insights-featured">
        <div className="if-meta">
          <span className="if-cat">// AI for Security Installers</span>
          <span className="if-date">FEATURED · 9 min read</span>
        </div>
        <h3 className="if-title">
          Why Your Security Cameras Should Be<br/>
          Your <span className="neon-italic">Best Employee</span> in 2026.
        </h3>
        <div className="if-sub">
          How AI-powered surveillance systems are becoming operational tools —
          not just passive recording devices.
        </div>
        <div className="if-body">
          <p>
            For decades, security cameras have been treated as forensic tools. You check
            the tape after something goes wrong, and the rest of the time the system sits
            quiet — a sunk cost waiting to prove its worth. That model is being quietly
            dismantled.
          </p>
          <p>
            AI-equipped systems now identify operational events as they happen. A vehicle
            blocking a loading dock. A customer standing unattended at a counter for too
            long. A door propped open in an off-hours zone. Instead of producing a 24-hour
            recording for someone to scrub through later, the camera sends the right
            notification to the right person — usually before a human would have even
            noticed.
          </p>
          <p>
            For an installation business, this isn't a feature upgrade. It's a positioning
            shift. The cameras you sell are no longer passive insurance. They're an
            always-on operations layer that your customers will pay a premium for —
            when you know how to package and explain it.
          </p>
          <ul className="if-bullets">
            <li>Smart alerts that route by zone, time of day, and severity — without manual review.</li>
            <li>Object and behavior recognition that reduces false-alarm fatigue by an order of magnitude.</li>
            <li>Integrations with operational tools (POS, dispatch, access control) so events become workflow.</li>
            <li>Faster response when something actually matters — measured in seconds, not minutes.</li>
            <li>A clean upsell path from "we install cameras" to "we install operational awareness."</li>
          </ul>
          <p>
            The installers winning right now aren't competing on hardware specs or per-camera
            pricing. They're competing on what the system <em>does</em> after the install —
            and they're charging accordingly.
          </p>
        </div>
        <div className="if-foot">
          <a href="#contact" className="if-cta">Read the full breakdown →</a>
        </div>
      </article>

      {/* Categories */}
      <div className="insights-cats">
        <button
          className={`cat-chip ${activeCat === 'All' ? 'active' : ''}`}
          onClick={() => setActiveCat('All')}
        >All</button>
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`cat-chip ${activeCat === c ? 'active' : ''}`}
            onClick={() => setActiveCat(c)}
          >{c}</button>
        ))}
      </div>

      {/* Teaser grid */}
      <div className="insights-grid">
        {TEASERS.map(t => (
          <article className="insight-card" key={t.title}>
            <div className="ic-cat">{t.cat}</div>
            <h4>{t.title}</h4>
            <p>{t.blurb}</p>
            <div className="ic-foot">
              <span className="ic-read">{t.read}</span>
              <span className="ic-arrow">→</span>
            </div>
          </article>
        ))}
      </div>

      {/* Email capture */}
      <div className="insights-capture">
        <div className="ic-left">
          <div className="ic-eyebrow">// Subscribe · One insight per week</div>
          <h3>Operational intel for installers,<br/><span className="neon-italic">delivered weekly.</span></h3>
          <p>Practical breakdowns of automation, lead generation, and AI-tools for trade businesses. No fluff, no roundups — one tight piece per week.</p>
        </div>
        <form className="ic-form" onSubmit={subscribe}>
          {!subscribed ? (
            <>
              <div className="ic-input-wrap">
                <span className="ic-prompt">▸</span>
                <input
                  type="email"
                  required
                  placeholder="you@yourbusiness.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit">Subscribe →</button>
            </>
          ) : (
            <div className="ic-thanks">
              <span className="ic-check">✓</span>
              <span>Subscribed. First insight lands within a week.</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

/* ============================================================
   Final CTA band
   ============================================================ */
function FinalCTA({ onSpeak }) {
  return (
    <section className="section final-cta" id="final-cta">
      <div className="fc-inner">
        <div className="fc-eyebrow">// 07 · Next Step</div>
        <h2>Architect your <span className="neon">growth engine.</span></h2>
        <p>
          Book a 15-minute call. We'll map your current operations, identify the
          three highest-leverage systems to install first, and send back a scoped
          build plan within 24 hours — no pitch, no obligation.
        </p>
        <div className="cta-row">
          <button className="cta-primary" onClick={onSpeak}>
            Book a 15-min Call
            <span className="arrow"></span>
          </button>
          <a className="cta-ghost" href="tel:8634404145">
            Or call 863-440-4145
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Marquee — infrastructure language
   ============================================================ */
function Marquee() {
  const words = [
    'Lead Generation Engine', 'AI Response Infrastructure', 'Managed Ad Campaigns',
    'Operational Workflow', 'CRM Syncing', 'Calendar & Dispatch',
    'Missed-Call Text-Back', 'Voice AI', 'Multi-Channel Outreach',
    'Local Search Authority', 'Performance Reporting', '24/7 Monitoring',
  ];
  const all = [...words, ...words];
  return (
    <section className="marquee-section">
      <div className="label">// What we architect · End-to-end growth infrastructure</div>
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
   Contact
   ============================================================ */
function Contact() {
  const [tier, setTier] = useState('sentinel');
  const [stage, setStage] = useState('exploring');
  const [trade, setTrade] = useState('cctv');
  const stageLabel = {
    exploring: 'just exploring',
    planning: 'planning to install soon',
    urgent: 'need this set up ASAP',
  }[stage];

  return (
    <section className="section contact" id="contact">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 08 · Get Started</div>
          <h2>Book a call.</h2>
        </div>
        <div className="meta">
          REPLY WITHIN 4 HOURS<br/>
          <b>Real human, no funnel.</b>
        </div>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          <h3>Talk to a real architect.</h3>
          <p>
            Tell us about your business and what you're trying to scale. We'll send back
            a scoped recommendation within 4 hours — no slides, no upsell, no pressure.
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

        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Got it — we\'ll reply within 4 hours.'); }}>
          <div className="term-header">
            <div className="dots"><span></span><span></span><span></span></div>
            <span className="path">~ /book-call</span>
          </div>
          <div className="field">
            <label>your email <span className="req">*</span></label>
            <input type="email" required placeholder="you@yourcompany.com" />
          </div>
          <div className="field">
            <label>business name</label>
            <input type="text" placeholder="Your company" />
          </div>
          <div className="field">
            <label>your trade</label>
            <select value={trade} onChange={(e) => setTrade(e.target.value)}>
              <option value="cctv">CCTV / surveillance installer</option>
              <option value="lowvolt">Low-voltage contractor</option>
              <option value="access">Access control / integrator</option>
              <option value="residential">Residential security</option>
              <option value="field">Other field-service trade</option>
              <option value="local">Other local service business</option>
            </select>
          </div>
          <div className="field">
            <label>which tier interests you?</label>
            <select value={tier} onChange={(e) => setTier(e.target.value)}>
              <option value="ghost">Ghost — Foundation Lead Engine</option>
              <option value="sentinel">Sentinel — Operations + Growth</option>
              <option value="architect">Architect — Full Infrastructure</option>
              <option value="alacarte">Just an add-on</option>
              <option value="unsure">Not sure — help me pick</option>
            </select>
          </div>
          <div className="field">
            <label>where are you?</label>
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              <option value="exploring">just exploring</option>
              <option value="planning">planning to install soon</option>
              <option value="urgent">need this set up ASAP</option>
            </select>
          </div>
          <div className="severity-note">
            <span className="sev-dot"></span>
            <span>status: <b>{stageLabel}</b></span>
          </div>
          <div className="field">
            <label>what do you want the system to do?</label>
            <textarea placeholder="e.g. We're losing inbound calls after hours and our follow-up is inconsistent across the crew…"></textarea>
          </div>
          <button type="submit">▸ Send & Book My Call</button>
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
            AI growth infrastructure for security installers, low-voltage contractors,
            and service businesses. Lead generation, response systems, and operational
            workflow — installed, managed, owned.
          </p>
          <p style={{ color: 'var(--ink-3)', fontSize: 12, marginTop: 12, fontFamily: 'var(--font-mono)' }}>
            Lakeland, FL · USA-wide remote install
          </p>
        </div>
        <div className="col">
          <h4>Site</h4>
          <a href="#how">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#stories">Field Results</a>
          <a href="#insights">Insights</a>
        </div>
        <div className="col">
          <h4>Tiers</h4>
          <a href="#pricing">Ghost</a>
          <a href="#pricing">Sentinel</a>
          <a href="#pricing">Architect</a>
        </div>
        <div className="col">
          <h4>Get in touch</h4>
          <a href="tel:8634404145">863-440-4145</a>
          <a href="mailto:bluehippo.cyber@gmail.com">bluehippo.cyber@gmail.com</a>
          <a href="#contact">Book a 15-min call</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 BlueHippoCyber · AI Growth Infrastructure</div>
        <div className="socials">
          <a title="LinkedIn">in</a>
          <a title="Instagram">ig</a>
          <a title="YouTube">yt</a>
          <a title="Facebook">fb</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  SentinelBar, Nav, Hero, BuiltFor, WhatWeDo, HowItWorks, GrowthEngine,
  Pricing, Stories, Insights, FinalCTA, Marquee, Contact, Footer,
});
