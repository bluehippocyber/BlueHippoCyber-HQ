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
        <span>Lead System: <span className="span-neon">{active ? 'LIVE' : 'STANDBY'}</span></span>
        <span className="sep">/</span>
        <span>Follow-Up: <span className="span-neon">{bridge ? 'RUNNING' : 'PAUSED'}</span></span>
        <span className="sep">/</span>
        <span>Intake: <span className="span-neon">24 / 7</span></span>
      </div>
      <div className="right">
        <span>BHC · FLORIDA · USA</span>
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
      <button className="cta-mini" onClick={() => { window.location.href = '/free-audit'; }}>Free Audit →</button>
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
        <div className="tagline-mono">[ Automated Lead Systems for Service Businesses ]</div>
        <h1>
          Stop losing jobs to businesses<br/>
          that <span className="neon">answer faster.</span>
        </h1>
        <p className="slogan">
          We build automated lead systems for security installers, AV techs, and
          cybersecurity consultants — so you capture every lead, follow up on every
          quote, and book more jobs without hiring anyone.
        </p>
        <div className="trust-line">
          <span className="trust-flag">◆</span>
          <span><b>Built for security installers, AV techs &amp; cybersecurity consultants.</b></span>
          <span className="trust-sep">·</span>
          <span>Florida-based. Working USA-wide.</span>
          <span className="trust-sep">·</span>
          <a href="tel:8632097940" className="trust-phone">(863) 209-7940</a>
        </div>
        <div className="cta-row">
          <button className="cta-primary" onClick={onSpeak}>
            Get Your Free Growth Audit
            <span className="arrow"></span>
          </button>
          <button className="cta-ghost" onClick={onScroll}>
            See What We Build
          </button>
        </div>
        <div className="hero-subcta">No cost. No strings. We look at your whole setup and tell you exactly what&rsquo;s costing you money.</div>
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
    'Security Camera Installers',
    'TV Mount & AV Installers',
    'Cybersecurity Consultants',
    'Low-Voltage Techs',
    'Home Service Pros',
    'Local Contractors',
    'Field-Service Trades',
    'Any Service Business',
  ];
  return (
    <section className="built-for-band" id="built-for">
      <div className="bf-inner">
        <div className="bf-label">// Who we build for · Service businesses that live and die by fast follow-up</div>
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
      title: 'Capture Every Lead',
      body: 'Every call, form, text, and message gets captured the second it comes in — so nothing slips through while you\'re out on a job.',
    },
    {
      num: '02',
      title: 'Follow Up Automatically',
      body: 'The system texts and emails every lead until they book. No more quotes going cold because the week got busy and you forgot to call back.',
    },
    {
      num: '03',
      title: 'Never Miss a Job',
      body: 'Miss a call and the caller gets an instant text back. Customers book themselves online. You stop losing work to whoever answered first.',
    },
    {
      num: '04',
      title: 'Book More, Hire No One',
      body: 'Reminders, review requests, and reactivation all run on their own. You grow the business without adding a single person to payroll.',
    },
  ];
  return (
    <section className="section what-we-do" id="what">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 01 · What We Do</div>
          <h2>Four systems.<br/>One <span className="neon">simple result.</span></h2>
        </div>
        <div className="meta">
          AUTOMATED · DONE FOR YOU<br/>
          <b>Built for service businesses.</b>
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
      title: 'We map your business',
      body: 'It starts with a free audit. We look at how you get leads, how you follow up, and where you\'re losing money — then show you exactly what to fix first.',
      stat: 'Free', statLabel: 'business growth audit',
    },
    {
      num: '02',
      title: 'We build your system',
      body: 'We set up everything you need — website, follow-up, booking, reminders — all connected and working together. Most setups go live fast.',
      stat: '5–10 days', statLabel: 'to go live',
    },
    {
      num: '03',
      title: 'You book more jobs',
      body: 'Leads get captured, followed up, and booked automatically. You show up, do the work, and watch the calendar fill on its own.',
      stat: '24 / 7', statLabel: 'working for you',
    },
  ];
  return (
    <section className="section how" id="how">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 02 · How It Works</div>
          <h2>Map it.<br/><span className="neon">Build it.</span> Book more.</h2>
        </div>
        <div className="meta">
          DONE-FOR-YOU<br/>
          <b>We handle all of it.</b>
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
          Get My Free Audit
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
    { name: 'Instant Response', body: 'Every lead gets answered in seconds, day or night — even when you can\'t get to the phone.' },
    { name: 'Automatic Follow-Up', body: 'Texts and emails go out on their own until the customer books. No quote ever gets forgotten.' },
    { name: 'Self-Booking', body: 'Customers pick a time and book straight into your calendar. No phone tag, no back and forth.' },
    { name: 'Reviews & Repeat Work', body: 'After every job it asks for a review and brings old customers back for new work and upgrades.' },
  ];
  return (
    <section className="section growth-engine" id="growth-engine">
      <div className="ge-frame">
        <div className="ge-head">
          <div className="ge-eyebrow">// 03 · The System</div>
          <h2>Built to run<br/><span className="neon">without you.</span></h2>
          <p>
            Once it’s set up, the system works in the background — catching leads, following
            up, booking jobs, and asking for reviews while you’re out doing the work.
            You stop chasing people. The business keeps moving.
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
          <span className="ge-mono">// One-time setup · Pick what you need · Add more when you’re ready</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Pricing — itemized, one-time setup. Pick what you need.
   ============================================================ */
const PRICE_CATEGORIES = [
  {
    id: 'any',
    label: '// For any service business',
    items: [
      { name: 'Professional Website + Smart Chat Assistant', price: '$560', desc: 'A clean, fast website with a built-in smart assistant that answers questions and captures leads even when you\u2019re on the job.' },
      { name: 'Missed-Call Text-Back', price: '$297', desc: 'When you can\u2019t answer the phone, this automatically texts the caller back so you don\u2019t lose the job.' },
      { name: 'Booking & Scheduling Setup', price: '$347', desc: 'Lets customers book themselves online straight into your calendar \u2014 no back and forth.' },
      { name: 'Lead Capture Setup', price: '$397', desc: 'Grabs contact info from everyone who visits your site, fills out a form, or reaches out on social.' },
      { name: 'Follow-Up Automation', price: '$397', desc: 'Automatically texts and emails every lead until they book \u2014 so no opportunity slips through.' },
      { name: 'Quote Request & Auto-Reply', price: '$247', desc: 'A form that captures quote requests and instantly sends them a response so they know you\u2019re on it.' },
      { name: 'Appointment Reminder', price: '$247', desc: 'Sends automatic reminders before every appointment so customers actually show up.' },
      { name: 'No-Show Recovery', price: '$197', desc: 'When someone misses an appointment this automatically reaches out and gets them rescheduled.' },
      { name: 'Review Request Automation', price: '$297', desc: 'After every job it sends your customer a simple message asking them to leave you a review.' },
      { name: 'Customer Reactivation Campaign', price: '$347', desc: 'Sends a message to all your old customers to bring them back for new work or upgrades.' },
      { name: 'Referral Request Automation', price: '$247', desc: 'Automatically asks your happiest customers to send their friends and family your way.' },
      { name: 'Invoice & Payment Follow-Up', price: '$297', desc: 'Sends automatic reminders to customers who owe you money so you stop chasing people.' },
      { name: 'New Client Welcome Message', price: '$197', desc: 'Every new customer gets a professional welcome message that builds trust from day one.' },
      { name: 'Google Business Profile Setup', price: '$297', desc: 'Sets up and optimizes your Google listing so people searching nearby actually find and call you.' },
      { name: 'Local Search Build', price: '$397', desc: 'Gets your business ranking on Google Maps in the specific areas and neighborhoods you serve.' },
      { name: 'Social Media Auto-Posting', price: '$397', desc: 'Keeps your Facebook and Instagram active with regular posts so you always look open and busy.' },
      { name: 'Reputation Management Setup', price: '$347', desc: 'Monitors your reviews across Google and Facebook so you always know what people are saying.' },
      { name: 'Ad Campaign Setup', price: '$597', desc: 'We build and launch your Google or Facebook ads to bring in customers who are ready to hire.' },
      { name: 'Service Area Landing Page', price: '$297', desc: 'A dedicated page targeting a specific city so more people in that area find your business.' },
      { name: 'Lead Magnet Build', price: '$347', desc: 'A free tip sheet or checklist that attracts your ideal customer and gets them to hand over their contact info.' },
      { name: 'CRM Setup', price: '$497', desc: 'Organizes every lead and customer in one place so nothing falls through the cracks.' },
      { name: 'Full Lead Engine Build', price: '$1,500', desc: 'We build the whole system \u2014 capture, follow-up, booking, and reminders \u2014 all connected and ready to go.', flagship: true },
    ],
  },
  {
    id: 'av',
    label: '// For TV mount & AV installers',
    items: [
      { name: 'AV Installer Website + Smart Chat Assistant', price: '$560', desc: 'A professional site built specifically for mount and AV installers that gets visitors to request a quote.' },
      { name: 'Instant Quote Request System', price: '$247', desc: 'A simple form where customers describe their job and get an automatic reply with your next steps.' },
      { name: 'Job Estimate Follow-Up', price: '$347', desc: 'Automatically follows up on every quote you send until the customer says yes or no.' },
      { name: 'After-Install Review Request', price: '$297', desc: 'Right after the job is done it automatically asks your customer to leave you a 5-star review.' },
      { name: 'Local Google Maps Setup', price: '$397', desc: 'Gets your installation business showing up when people nearby search for someone to mount their TV.' },
    ],
  },
  {
    id: 'security',
    label: '// For security camera installers',
    items: [
      { name: 'Security Camera Installer Website + Smart Chat Assistant', price: '$560', desc: 'A sharp professional site for camera installers that builds trust and drives people to request a quote.' },
      { name: 'Camera Quote Request System', price: '$247', desc: 'Captures every quote request from your site and social and follows up automatically.' },
      { name: 'Estimate Follow-Up Automation', price: '$347', desc: 'Keeps following up on every camera quote you send until you get a yes or a no.' },
      { name: 'Upgrade & Expansion Campaign', price: '$347', desc: 'Reaches back out to past customers about adding more cameras or upgrading their current system.' },
      { name: 'Local Google Maps Setup', price: '$397', desc: 'Gets your camera business found on Google Maps when local homeowners and businesses are searching.' },
    ],
  },
  {
    id: 'cyber',
    label: '// For cybersecurity consultants',
    items: [
      { name: 'Cybersecurity Consultant Website + Smart Chat Assistant', price: '$560', desc: 'A polished professional site that positions you as the go-to expert and gets businesses to book a call.' },
      { name: 'Consultation Booking Setup', price: '$347', desc: 'Lets potential clients schedule a discovery call with you directly from your website with zero back and forth.' },
      { name: 'Lead Follow-Up Automation', price: '$397', desc: 'Automatically follows up with every person who reaches out so none of your potential clients go cold.' },
      { name: 'Lead Magnet Build', price: '$347', desc: 'A free security checklist or guide that attracts business owners and gets them into your pipeline.' },
      { name: 'Client Onboarding Sequence', price: '$297', desc: 'When you sign a new client they automatically get everything they need to get started \u2014 professionally and on time.' },
      { name: 'Google Business Profile Setup', price: '$297', desc: 'Gets your consulting business showing up on Google when local businesses search for security help.' },
      { name: 'Referral Request Automation', price: '$247', desc: 'Automatically asks satisfied clients to refer other businesses your way after a successful engagement.' },
    ],
  },
];

function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 04 · Pricing</div>
          <h2>What we build —<br/>and <span className="neon">what it costs.</span></h2>
        </div>
        <div className="meta">
          ONE-TIME SETUP<br/>
          <b>No subscriptions.</b> Pick what you need.
        </div>
      </div>

      <p className="price-intro">
        Every service below is a one-time setup. Pick what your business needs.
        Start with one, add more when you’re ready.
      </p>

      {/* Free audit highlight */}
      <div className="free-audit">
        <div className="fa-tag">// Free for every business</div>
        <div className="fa-row">
          <div className="fa-main">
            <div className="fa-name">Business Growth Audit</div>
            <div className="fa-desc">
              We look at your whole business — how you get leads, how you follow up, and where
              you’re losing money — then tell you exactly what to fix. No cost, no strings attached.
            </div>
          </div>
          <div className="fa-price">FREE</div>
        </div>
      </div>

      {/* Categorized service list */}
      <div className="price-cats">
        {PRICE_CATEGORIES.map((cat) => (
          <div className="price-cat" key={cat.id}>
            <div className="price-cat-label">{cat.label}</div>
            <div className="price-list">
              {cat.items.map((it) => (
                <div className={`price-row ${it.flagship ? 'flagship' : ''}`} key={it.name + it.price}>
                  <div className="pr-name">{it.name}</div>
                  <div className="pr-desc">{it.desc}</div>
                  <div className="pr-price">{it.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="retainer-note">
        <span className="rn-mono">// Start with one. Add more when you’re ready. Every build is a one-time setup.</span>
      </div>
    </section>
  );
}

/* ============================================================
   Stories
   ============================================================ */
const STORIES = [
  {
    tag: 'Case 01 · Security Camera Installer · Tampa Bay',
    title: 'A camera installer stopped losing after-hours leads — and added a second crew.',
    body: 'We set up missed-call text-back, instant quote replies, and automatic follow-up on every estimate. Leads that used to go cold overnight started booking themselves. The phone stopped being the bottleneck.',
    stats: [
      { num: '+62%', lbl: 'Booked jobs' },
      { num: '< 60s', lbl: 'Lead reply' },
      { num: '2nd', lbl: 'Crew added' },
    ],
    mock: (
      <div className="story-mock">
        <div className="mock-header">
          <span></span><span></span><span></span>
          <span className="url">lead-inbox · live</span>
        </div>
        <div style={{ color: 'var(--neon)', marginBottom: 6 }}>// inbound lead · 8:47 PM</div>
        <div style={{ color: 'var(--ink-2)' }}>"Need 8 cameras for my warehouse"</div>
        <div style={{ color: 'var(--neon)', marginTop: 6 }}>↳ Auto-reply sent · site visit booked Tue 9am</div>
        <div style={{ color: 'var(--ink-2)', marginTop: 4 }}>{'>'} contact saved · owner notified</div>
        <div style={{ color: 'var(--ink-2)' }}>{'>'} follow-up scheduled</div>
        <div style={{ color: 'var(--ok)', marginTop: 8 }}>BOOKED · est. $11,400</div>
      </div>
    ),
  },
  {
    tag: 'Case 02 · TV Mount & AV Installer · GA',
    title: 'A two-truck AV installer went from chasing quotes to booked weeks out.',
    body: 'Every quote request now gets an instant reply and automatic follow-up until the customer says yes or no. After each install, a review request goes out on its own. The owner stopped quoting at 11pm and the calendar filled up.',
    stats: [
      { num: '0', lbl: 'Quotes left cold' },
      { num: '9', lbl: 'Jobs / week' },
      { num: '4.9★', lbl: 'Google rating' },
    ],
    mock: (
      <div className="story-mock">
        <div className="mock-header">
          <span></span><span></span><span></span>
          <span className="url">job-board · live</span>
        </div>
        <div style={{ color: 'var(--neon)', marginBottom: 6 }}>// last 30 days</div>
        <div style={{ color: 'var(--ink-2)' }}>Quote requests · <span style={{ color: 'var(--neon)' }}>142</span></div>
        <div style={{ color: 'var(--ink-2)' }}>Auto follow-ups sent · <span style={{ color: 'var(--neon)' }}>388</span></div>
        <div style={{ color: 'var(--ink-2)' }}>Jobs booked · <span style={{ color: 'var(--neon)' }}>36</span></div>
        <div style={{ color: 'var(--ink-2)' }}>New 5-star reviews · <span style={{ color: 'var(--neon)' }}>29</span></div>
        <div style={{ color: 'var(--ok)', marginTop: 8 }}>BOOKED OUT · 3 weeks</div>
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
          <div className="eyebrow">// 05 · Results</div>
          <h2>Real businesses.<br/>Real <span className="neon">results.</span></h2>
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
  'Lead Generation',
  'Follow-Up & Automation',
  'Booking & Scheduling',
  'Reviews & Reputation',
  'Local Search',
  'Small Business Growth',
];

const TEASERS = [
  {
    cat: 'Lead Generation',
    title: 'The 4 automations every service business should set up before hiring anyone',
    blurb: 'Most missed-revenue problems aren\u2019t a sales problem — they\u2019re a follow-up problem. Here\u2019s what to set up first so leads stop slipping through.',
    read: '6 min read',
  },
  {
    cat: 'Follow-Up & Automation',
    title: 'Why missed-call text-back is the highest-return thing you can set up',
    blurb: 'If most of your work comes in by phone, a 30-second automation often beats thousands in ad spend. Here\u2019s why it works — and how to do it right.',
    read: '4 min read',
  },
  {
    cat: 'Local Search',
    title: 'Local search in 2026: what actually still gets you booked',
    blurb: 'Google looks nothing like it did 18 months ago. Here\u2019s the short list of things that still consistently put booked jobs on the calendar for local businesses.',
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
          <h2>Tips & Playbooks.</h2>
        </div>
        <div className="meta">
          PLAIN, USEFUL, NO FLUFF<br/>
          <b>For service business owners.</b>
        </div>
      </div>

      {/* Featured article */}
      <article className="insights-featured">
        <div className="if-meta">
          <span className="if-cat">// Follow-Up & Automation</span>
          <span className="if-date">FEATURED · 9 min read</span>
        </div>
        <h3 className="if-title">
          Why the Business That<br/>
          <span className="neon-italic">Answers First</span> Wins the Job.
        </h3>
        <div className="if-sub">
          The customer who calls three installers almost always hires the first one who
          gets back to them. Speed beats price more often than you’d think.
        </div>
        <div className="if-body">
          <p>
            Here’s the thing most owners don’t want to hear: the job usually doesn’t go to
            the best installer. It goes to the one who answered first. A customer with a
            problem wants it solved today, and the moment someone responds and sounds like
            they’ve got it handled, the search is over.
          </p>
          <p>
            That’s a problem when you’re up a ladder, under a desk, or driving between jobs.
            The phone rings, you can’t grab it, and by the time you call back that evening
            the customer already booked someone else. It wasn’t a pricing loss. It was a
            speed loss — and those add up fast.
          </p>
          <p>
            The fix isn’t hiring a receptionist or working later. It’s setting up a system
            that responds the second a lead comes in, whether you’re free or not. A missed
            call gets an instant text back. A form fill gets an immediate reply. The
            customer feels taken care of before your competitor has even checked his phone.
          </p>
          <ul className="if-bullets">
            <li>Missed calls get an automatic text back within seconds — day or night.</li>
            <li>Quote requests get an instant reply so the customer knows you’re on it.</li>
            <li>Every lead gets followed up automatically until they book or say no.</li>
            <li>Reminders cut no-shows so the jobs you book actually happen.</li>
            <li>Review requests go out after each job to bring in the next customer.</li>
          </ul>
          <p>
            The businesses winning right now aren’t the cheapest or the flashiest. They’re
            the ones that never leave a customer waiting — because a system has their back.
          </p>
        </div>
        <div className="if-foot">
          <a href="#contact" className="if-cta">Get your free audit →</a>
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
          <div className="ic-eyebrow">// Subscribe · One tip per week</div>
          <h3>Practical tips for service businesses,<br/><span className="neon-italic">delivered weekly.</span></h3>
          <p>Short, plain breakdowns of automation, follow-up, and lead capture for service businesses. No fluff, no roundups — one tight piece per week.</p>
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
        <h2>Ready to stop losing jobs to businesses that <span className="neon">answer faster?</span></h2>
        <p>
          Start with a free Business Growth Audit. We’ll look at exactly how your
          business gets leads, what happens to them after, and where you’re losing
          money. No pitch. No pressure. Just clarity.
        </p>
        <div className="cta-row">
          <button className="cta-primary" onClick={onSpeak}>
            Book Your Free Audit
            <span className="arrow"></span>
          </button>
          <a className="cta-ghost" href="tel:8632097940">
            Or call (863) 209-7940
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
    'Lead Capture', 'Missed-Call Text-Back', 'Automatic Follow-Up',
    'Online Booking', 'Appointment Reminders', 'Review Requests',
    'Customer Reactivation', 'Referral Requests', 'Smart Chat Assistant',
    'Google Business Profile', 'Local Search', 'Quote Auto-Reply',
  ];
  const all = [...words, ...words];
  return (
    <section className="marquee-section">
      <div className="label">// What we build · Automated systems for service businesses</div>
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
  const [tier, setTier] = useState('audit');
  const [stage, setStage] = useState('exploring');
  const [trade, setTrade] = useState('security');
  const stageLabel = {
    exploring: 'just exploring',
    planning: 'planning to set this up soon',
    urgent: 'need this running ASAP',
  }[stage];

  return (
    <section className="section contact" id="contact">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 08 · Get Started</div>
          <h2>Book your free audit.</h2>
        </div>
        <div className="meta">
          REPLY WITHIN 4 HOURS<br/>
          <b>Real human. No funnel.</b>
        </div>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          <h3>Talk to Keenan directly.</h3>
          <p>
            Tell us about your business and what you’re trying to fix. We’ll get back to
            you within 4 hours with exactly where you’re losing money and what to set up
            first — no slides, no upsell, no pressure.
          </p>
          <div className="channels">
            <div className="channel">
              <div className="icon">☎</div>
              <div className="name">Call or Text</div>
              <div className="val"><a href="tel:8632097940" style={{ color: 'inherit', textDecoration: 'none' }}>(863) 209-7940</a></div>
            </div>
            <div className="channel">
              <div className="icon">@</div>
              <div className="name">Email</div>
              <div className="val">keenan@bluehippocyber.com</div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Got it — we\'ll reply within 4 hours.'); }}>
          <div className="term-header">
            <div className="dots"><span></span><span></span><span></span></div>
            <span className="path">~ /free-audit</span>
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
            <label>what kind of business?</label>
            <select value={trade} onChange={(e) => setTrade(e.target.value)}>
              <option value="security">Security camera installer</option>
              <option value="av">TV mount & AV installer</option>
              <option value="cyber">Cybersecurity consultant</option>
              <option value="other">Other service business</option>
            </select>
          </div>
          <div className="field">
            <label>what are you most interested in?</label>
            <select value={tier} onChange={(e) => setTier(e.target.value)}>
              <option value="audit">Free Business Growth Audit</option>
              <option value="website">A new website + smart chat assistant</option>
              <option value="followup">Lead capture & follow-up</option>
              <option value="booking">Booking & scheduling</option>
              <option value="engine">The full lead engine build</option>
              <option value="unsure">Not sure — help me pick</option>
            </select>
          </div>
          <div className="field">
            <label>where are you?</label>
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              <option value="exploring">just exploring</option>
              <option value="planning">planning to set this up soon</option>
              <option value="urgent">need this running ASAP</option>
            </select>
          </div>
          <div className="severity-note">
            <span className="sev-dot"></span>
            <span>status: <b>{stageLabel}</b></span>
          </div>
          <div className="field">
            <label>what do you want the system to do?</label>
            <textarea placeholder="e.g. We keep missing calls when we're on a job, and our follow-up is all over the place…"></textarea>
          </div>
          <button type="submit">▸ Send & Book My Free Audit</button>
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
            Automated lead systems for security camera installers, TV mount & AV techs,
            and cybersecurity consultants. Capture every lead, follow up on every quote,
            and book more jobs — without hiring anyone.
          </p>
          <p style={{ color: 'var(--ink-3)', fontSize: 12, marginTop: 12, fontFamily: 'var(--font-mono)' }}>
            Florida · Working with businesses USA-wide
          </p>
        </div>
        <div className="col">
          <h4>Site</h4>
          <a href="#how">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#stories">Results</a>
          <a href="#insights">Insights</a>
        </div>
        <div className="col">
          <h4>Who It's For</h4>
          <a href="#built-for">Security Installers</a>
          <a href="#built-for">TV & AV Installers</a>
          <a href="#built-for">Cybersecurity Consultants</a>
        </div>
        <div className="col">
          <h4>Get in touch</h4>
          <a href="tel:8632097940">(863) 209-7940</a>
          <a href="mailto:keenan@bluehippocyber.com">keenan@bluehippocyber.com</a>
          <a href="#contact">Book a free audit</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 BlueHippoCyber · Automated Lead Systems</div>
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
