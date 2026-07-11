/* global React */
const { useState, useEffect, useRef, useCallback } = React;

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
        <a href="#" className={route === 'pricing' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('pricing'); close(); }}>Pricing</a>
        <a href="#" className={route === 'solutions' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('solutions'); close(); }}>Services</a>
        <a href="#" className={route === 'portfolio' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('portfolio'); close(); }}>Portfolio</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); navigate('home', 'contact'); close(); }}>Contact</a>
      </div>
      <button className="cta-mini" onClick={() => { window.location.href = '/free-audit'; }}>Free Audit →</button>
    </nav>
  );
}

/* ============================================================
   Inline audit capture — no navigation, no new tab. Click the
   button, an email field opens right where you're standing.
   ============================================================ */
function InlineAudit({ label }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    fetch('https://n8n-jtbg.srv1669998.hstgr.cloud/webhook/bhc-website-lead', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), page: label }),
    }).catch(() => {}); // ponytail: fire-and-forget, UI already confirmed to the visitor
  };

  if (done) {
    return (
      <div className="ic-thanks">
        <span className="ic-check">✓</span>
        <span>Got it — we'll reach out within 4 hours with your audit.</span>
      </div>
    );
  }
  if (!open) {
    return (
      <button className="cta-primary" onClick={() => setOpen(true)}>
        {label}
        <span className="arrow"></span>
      </button>
    );
  }
  return (
    <form className="ic-form inline-audit-form" onSubmit={submit}>
      <div className="ic-input-wrap">
        <span className="ic-prompt">▸</span>
        <input
          type="email"
          required
          autoFocus
          placeholder="you@yourbusiness.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Send My Audit →</button>
    </form>
  );
}

/* ============================================================
   Hero
   ============================================================ */
function Hero({ onSpeak }) {
  return (
    <section className="hero" id="hero">
      <video className="hero-video" src="assets/hero-loop.mp4" poster="assets/hero-poster.jpg" autoPlay muted loop playsInline></video>
      <div className="hero-grid"></div>
      <div className="hero-scrim"></div>
      <div className="hero-content">
        <div className="tagline-mono reveal reveal-1">[ Automated Systems. Real Oversight. ]</div>
        <h1 className="reveal reveal-2">
          Stop being the bottleneck<br/>
          in your <span className="neon">own business.</span>
        </h1>
        <p className="slogan reveal reveal-3">
          Every call, quote, and follow-up runs through a system now — not just you.
        </p>
        <div className="cta-row reveal reveal-4">
          <InlineAudit label="Book a Free Audit" />
        </div>
      </div>
      <div className="scroll-hint reveal reveal-5">
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
    'Cybersecurity Consultants',
    'Home Service Pros',
    'Barbershops & Salons',
    'Lawn Care & Landscaping',
    'Med Spas & Clinics',
    'Tattoo Studios',
    'Local Contractors',
    'Any Business Without a Website',
  ];
  return (
    <section className="built-for-band" id="built-for">
      <div className="bf-inner">
        <div className="bf-label">// Who we build for · Any business that's losing jobs to slow follow-up</div>
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
   Before / After — same missed call, two outcomes
   ============================================================ */
function WhatWeDo() {
  return (
    <section className="section what-we-do" id="what">
      <div className="section-header">
        <div>
          <div className="eyebrow">// 01 · The Difference</div>
          <h2>Same missed call.<br/>Two <span className="neon">different outcomes.</span></h2>
        </div>
        <div className="meta">
          ONE SYSTEM<br/>
          <b>All the difference.</b>
        </div>
      </div>
      <div className="compare-grid">
        <div className="compare-col">
          <div className="compare-label without">Without BHC</div>
          <div className="story-mock">
            <div className="mock-header"><span></span><span></span><span></span><span className="url">9:42pm</span></div>
            <div style={{ color: 'var(--ink-2)' }}>Customer calls, nobody picks up.</div>
            <div style={{ color: 'var(--ink-2)', marginTop: 4 }}>{'>'} no text sent</div>
            <div style={{ color: 'var(--ink-2)' }}>{'>'} no follow-up</div>
            <div style={{ color: 'var(--ink-2)', marginTop: 4 }}>Customer calls the next name on Google.</div>
            <div style={{ color: 'var(--crit)', marginTop: 8 }}>LOST · never heard back</div>
          </div>
        </div>
        <div className="compare-col">
          <div className="compare-label with">With BHC</div>
          <div className="story-mock">
            <div className="mock-header"><span></span><span></span><span></span><span className="url">9:42pm</span></div>
            <div style={{ color: 'var(--ink-2)' }}>Customer calls, nobody picks up.</div>
            <div style={{ color: 'var(--neon)', marginTop: 4 }}>{'>'} text-back sent · 8 seconds</div>
            <div style={{ color: 'var(--neon)' }}>{'>'} booking link + follow-up queued</div>
            <div style={{ color: 'var(--ink-2)', marginTop: 4 }}>Customer books herself, no callback needed.</div>
            <div style={{ color: 'var(--ok)', marginTop: 8 }}>BOOKED · Tues 10am</div>
          </div>
        </div>
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
   Pricing Teaser — compact, homepage-only. Full list lives on
   its own page so the home scroll stays short.
   ============================================================ */
function PricingTeaser({ onSpeak, navigate }) {
  return (
    <section className="section pricing-teaser" id="pricing-teaser">
      <div className="free-audit">
        <div className="fa-tag">// Pricing</div>
        <div className="fa-row">
          <div className="fa-main">
            <div className="fa-name">One-time setups, starting at $197.</div>
            <div className="fa-desc">
              One missed job usually costs more than that. No subscriptions — pick what
              you need, add more later. Curious what fits your business? Ask Origin, or
              see the full list.
            </div>
          </div>
        </div>
        <div className="cta-row" style={{ marginTop: 20 }}>
          <button className="cta-primary" onClick={onSpeak}>
            Ask Our Assistant
            <span className="arrow"></span>
          </button>
          <button className="cta-ghost" onClick={() => navigate('pricing')}>
            See Full Pricing
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Pricing — itemized, one-time setup. Pick what you need.
   ============================================================ */
const FLAGSHIP_ITEM = { name: 'Full Lead Engine Build', price: '$1,500', desc: 'We build the whole system \u2014 capture, follow-up, booking, and reminders \u2014 all connected and ready to go.', flagship: true };

const PRICE_CATEGORIES = [
  {
    id: 'any',
    label: '// For any business without a solid website',
    groups: [
      {
        label: 'Website & Lead Capture',
        items: [
          { name: 'Professional Website + Smart Chat Assistant', price: '$560', desc: 'A clean, fast website with a built-in smart assistant that answers questions and captures leads even when you\u2019re on the job.' },
          { name: 'Lead Capture Setup', price: '$397', desc: 'Grabs contact info from everyone who visits your site, fills out a form, or reaches out on social.' },
          { name: 'Missed-Call Text-Back', price: '$297', desc: 'When you can\u2019t answer the phone, this automatically texts the caller back so you don\u2019t lose the job.' },
          { name: 'Quote Request & Auto-Reply', price: '$247', desc: 'A form that captures quote requests and instantly sends them a response so they know you\u2019re on it.' },
        ],
      },
      {
        label: 'Booking & Follow-Up',
        items: [
          { name: 'Booking & Scheduling Setup', price: '$347', desc: 'Lets customers book themselves online straight into your calendar \u2014 no back and forth.' },
          { name: 'Follow-Up Automation', price: '$397', desc: 'Automatically texts and emails every lead until they book \u2014 so no opportunity slips through.' },
          { name: 'Appointment Reminder', price: '$247', desc: 'Sends automatic reminders before every appointment so customers actually show up.' },
          { name: 'No-Show Recovery', price: '$197', desc: 'When someone misses an appointment this automatically reaches out and gets them rescheduled.' },
          { name: 'New Client Welcome Message', price: '$197', desc: 'Every new customer gets a professional welcome message that builds trust from day one.' },
        ],
      },
      {
        label: 'Retention & Reputation',
        items: [
          { name: 'Review Request Automation', price: '$297', desc: 'After every job it sends your customer a simple message asking them to leave you a review.' },
          { name: 'Reputation Management Setup', price: '$347', desc: 'Monitors your reviews across Google and Facebook so you always know what people are saying.' },
          { name: 'Customer Reactivation Campaign', price: '$347', desc: 'Sends a message to all your old customers to bring them back for new work or upgrades.' },
          { name: 'Referral Request Automation', price: '$247', desc: 'Automatically asks your happiest customers to send their friends and family your way.' },
          { name: 'Invoice & Payment Follow-Up', price: '$297', desc: 'Sends automatic reminders to customers who owe you money so you stop chasing people.' },
        ],
      },
      {
        label: 'Visibility & Growth',
        items: [
          { name: 'Google Business Profile Setup', price: '$297', desc: 'Sets up and optimizes your Google listing so people searching nearby actually find and call you.' },
          { name: 'Local Search Build', price: '$397', desc: 'Gets your business ranking on Google Maps in the specific areas and neighborhoods you serve.' },
          { name: 'Service Area Landing Page', price: '$297', desc: 'A dedicated page targeting a specific city so more people in that area find your business.' },
          { name: 'Social Media Auto-Posting', price: '$397', desc: 'Keeps your Facebook and Instagram active with regular posts so you always look open and busy.' },
          { name: 'Ad Campaign Setup', price: '$597', desc: 'We build and launch your Google or Facebook ads to bring in customers who are ready to hire.' },
          { name: 'Lead Magnet Build', price: '$347', desc: 'A free tip sheet or checklist that attracts your ideal customer and gets them to hand over their contact info.' },
          { name: 'CRM Setup', price: '$497', desc: 'Organizes every lead and customer in one place so nothing falls through the cracks.' },
        ],
      },
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

function PriceRow({ it }) {
  return (
    <div className={`price-row ${it.flagship ? 'flagship' : ''}`}>
      <div className="pr-name">{it.name}</div>
      <div className="pr-desc">{it.desc}</div>
      <div className="pr-price">{it.price}</div>
    </div>
  );
}

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

      {/* Flagship — the full build */}
      <div className="price-cat">
        <div className="price-cat-label">// The whole system, connected</div>
        <div className="price-list">
          <PriceRow it={FLAGSHIP_ITEM} />
        </div>
      </div>

      {/* Categorized service list */}
      <div className="price-cats">
        {PRICE_CATEGORIES.map((cat) => (
          <div className="price-cat" key={cat.id}>
            <div className="price-cat-label">{cat.label}</div>
            {cat.groups ? (
              cat.groups.map((g) => (
                <div className="price-group" key={g.label}>
                  <div className="price-group-label">{g.label}</div>
                  <div className="price-list">
                    {g.items.map((it) => <PriceRow it={it} key={it.name} />)}
                  </div>
                </div>
              ))
            ) : (
              <div className="price-list">
                {cat.items.map((it) => <PriceRow it={it} key={it.name} />)}
              </div>
            )}
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
   Galaxy Panels — every business runs its own AI Operating
   System. Scroll sideways through examples. One color per
   industry. Every panel is generic education, never a named
   real client — priced against what that business type loses
   by not having one.
   ============================================================ */
const GALAXIES = [
  {
    id: 'blue',
    img: 'assets/galaxy-blue.jpg',
    label: 'AIOS · BlueHippoCyber',
    intro: 'This one’s real — it’s the exact system running this site, right now.',
    bullets: [
      'Every visitor gets a live chat that qualifies them and can book the call, automatically.',
      'A missed lead triggers an instant alert and same-day follow-up — nobody’s checking a form by hand.',
      'Every deal and every touch lives in one system: one CRM, one calendar, one dashboard.',
      'Content, outreach, and reporting run on a fixed daily rhythm without someone driving it manually.',
    ],
  },
  {
    id: 'red',
    img: 'assets/galaxy-red.jpg',
    label: 'AIOS · Cybersecurity',
    intro: 'Imagine a security consulting firm running its own AIOS.',
    bullets: [
      'New leads get triaged and routed the second they hit the inbox.',
      'Incident intake runs on autopilot, so nothing sits overnight.',
      'Follow-up keeps going even when a ransomware-worried prospect goes quiet for a week.',
      'Priced against what one breached client would have cost them.',
    ],
  },
  {
    id: 'yellow',
    img: 'assets/galaxy-yellow.jpg',
    label: 'AIOS · Jewelry',
    intro: 'Imagine a jewelry business running its own AIOS.',
    bullets: [
      'Custom orders tracked automatically from deposit to delivery.',
      'A text goes out the moment a piece is ready for pickup.',
      'Reviews requested right after the customer walks out with it.',
      'Priced against what one missed high-ticket order costs.',
    ],
  },
  {
    id: 'pink',
    img: 'assets/galaxy-pink.jpg',
    label: 'AIOS · Beauty',
    intro: 'Imagine a salon running its own AIOS.',
    bullets: [
      'No-show reminders fire on their own — no receptionist required.',
      'Rebooking texts go out the week a client’s due back.',
      'Reviews requested automatically right after checkout.',
      'Priced against what one empty chair costs per hour.',
    ],
  },
  {
    id: 'green',
    img: 'assets/galaxy-green.jpg',
    label: 'AIOS · Construction & Landscaping',
    intro: 'Imagine a landscaping crew running its own AIOS.',
    bullets: [
      'Quote requests answered in minutes, not days.',
      'Jobs scheduled automatically the moment a quote’s accepted.',
      'Follow-up sent before the competitor even calls back.',
      'Priced against what one lost bid costs.',
    ],
  },
  {
    id: 'neonblue',
    img: 'assets/galaxy-neonblue.jpg',
    label: 'AIOS · Medical',
    intro: 'Imagine a medical practice running its own AIOS.',
    bullets: [
      'Appointment reminders that actually cut no-shows.',
      'Intake forms sent automatically before the visit.',
      'Follow-up care texts triggered without staff lifting a finger.',
      'Priced against what one missed appointment costs the schedule.',
    ],
  },
  {
    id: 'white',
    img: 'assets/galaxy-white.jpg',
    label: 'AIOS · Smart Home & Electrical',
    intro: 'Imagine an electrician running its own AIOS.',
    bullets: [
      'After-hours calls get answered instead of missed.',
      'Quotes sent same-day, before the homeowner calls someone else.',
      'Install reminders keep the calendar full automatically.',
      'Priced against what one missed emergency call costs.',
    ],
  },
  {
    id: 'purple',
    img: 'assets/galaxy-purple.jpg',
    label: 'AIOS · Restaurants & Hospitality',
    intro: 'Imagine a restaurant running its own AIOS.',
    bullets: [
      'Reservations booked automatically, even after close.',
      'No-shows cut with an automatic reminder text.',
      'Reviews requested right after a great table turn.',
      'Priced against what one empty table costs on a Friday night.',
    ],
  },
];

function GalaxyParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const count = Math.floor((canvas.width * canvas.height) / 16000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.3 + 0.4,
        opacity: Math.random() * 0.5 + 0.15,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas className="galaxies-particles" ref={canvasRef}></canvas>;
}

function GalaxyPanel({ g }) {
  const panelRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { root: el.closest('.galaxies-track'), threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="galaxy-panel" ref={panelRef} style={{ backgroundImage: `url(${g.img})` }}>
      <div className={`galaxy-caption ${visible ? 'visible' : ''}`}>
        <div className="galaxy-label">{g.label}</div>
        <p className="galaxy-intro">{g.intro}</p>
        <ul className="galaxy-bullets">
          {g.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </div>
  );
}

function GalaxyPanels() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [hintShown, setHintShown] = useState(true);

  const scrollToIndex = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(GALAXIES.length - 1, i));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
    setHintShown(false);
  };

  const onWheel = (e) => {
    const track = trackRef.current;
    if (!track) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    }
    setHintShown(false);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
    setHintShown(false);
  };

  return (
    <section className="galaxies" id="galaxies">
      <GalaxyParticles />
      <div className="galaxies-head">
        <div className="eyebrow">// 06 · Different Businesses, Different Galaxies</div>
        <h2>Every business runs<br/>its own <span className="neon">AI Operating System.</span></h2>
        <p>Scroll sideways. Each galaxy is a different business wired its own way — same idea, never the same system twice.</p>
      </div>
      <div className="galaxies-track" ref={trackRef} onWheel={onWheel} onScroll={onScroll} onTouchMove={() => setHintShown(false)}>
        {GALAXIES.map((g) => <GalaxyPanel g={g} key={g.id} />)}
      </div>
      <div className={`galaxy-scroll-hint ${hintShown ? '' : 'hidden'}`}>
        <span>scroll sideways</span>
        <span className="arrow">→</span>
      </div>
      <div className="story-nav galaxies-nav">
        <div className="dots">
          {GALAXIES.map((_, i) => (
            <div key={i} className={`dot ${i === active ? 'active' : ''}`} onClick={() => scrollToIndex(i)}></div>
          ))}
        </div>
        <button onClick={() => scrollToIndex(active - 1)}>‹</button>
        <button onClick={() => scrollToIndex(active + 1)}>›</button>
      </div>
    </section>
  );
}

/* ============================================================
   Insights — operational intelligence blog section
   ============================================================ */

const TEASERS = [
  {
    cat: 'Follow-Up & Automation',
    title: 'Why the business that answers first wins the job',
    blurb: 'The customer who calls three businesses almost always hires the first one who gets back to them. Speed beats price more often than you’d think.',
    read: '9 min read',
  },
  {
    cat: 'Lead Generation',
    title: 'The 4 automations every business should set up before hiring anyone',
    blurb: 'Most missed-revenue problems aren’t a sales problem — they’re a follow-up problem. Here’s what to set up first so leads stop slipping through.',
    read: '6 min read',
  },
  {
    cat: 'Follow-Up & Automation',
    title: 'Why missed-call text-back is the highest-return thing you can set up',
    blurb: 'If most of your work comes in by phone, a 30-second automation often beats thousands in ad spend. Here’s why it works — and how to do it right.',
    read: '4 min read',
  },
  {
    cat: 'Local Search',
    title: 'Local search in 2026: what actually still gets you booked',
    blurb: 'Google looks nothing like it did 18 months ago. Here’s the short list of things that still consistently put booked jobs on the calendar for local businesses.',
    read: '7 min read',
  },
];

function Insights() {
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
          <b>For any business owner.</b>
        </div>
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
          <h3>Practical tips for any business,<br/><span className="neon-italic">delivered weekly.</span></h3>
          <p>Short, plain breakdowns of automation, follow-up, and lead capture for any business. No fluff, no roundups — one tight piece per week.</p>
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
          <InlineAudit label="Book Your Free Audit" />
          <a className="cta-ghost" href="https://calendar.app.google/ikEVkrWRQRKCw77V7" target="_blank" rel="noopener">
            Or book a time directly →
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
  const [trade, setTrade] = useState('cyber');
  const [sent, setSent] = useState(false);
  const stageLabel = {
    exploring: 'just exploring',
    planning: 'planning to set this up soon',
    urgent: 'need this running ASAP',
  }[stage];

  const submit = (e) => {
    e.preventDefault();
    const f = e.target;
    const payload = {
      email: f.email.value.trim(),
      business: f.business.value.trim(),
      trade, tier, stage,
      notes: f.notes.value.trim(),
      page: 'contact-form',
    };
    setSent(true);
    fetch('https://n8n-jtbg.srv1669998.hstgr.cloud/webhook/bhc-website-lead', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {}); // ponytail: fire-and-forget, UI already confirmed
  };

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
              <div className="name">Call</div>
              <div className="val"><a href="tel:8632097940" style={{ color: 'inherit', textDecoration: 'none' }}>(863) 209-7940</a></div>
            </div>
            <div className="channel">
              <div className="icon">✉</div>
              <div className="name">Text</div>
              <div className="val"><a href="sms:8638252215" style={{ color: 'inherit', textDecoration: 'none' }}>(863) 825-2215</a></div>
            </div>
            <div className="channel">
              <div className="icon">@</div>
              <div className="name">Email</div>
              <div className="val">keenan@bluehippocyber.com</div>
            </div>
          </div>
        </div>

        {sent ? (
          <div className="contact-form">
            <div className="term-header">
              <div className="dots"><span></span><span></span><span></span></div>
              <span className="path">~ /free-audit</span>
            </div>
            <p style={{ padding: 20 }}>✓ Got it — we'll reply within 4 hours. Want to skip the wait?{' '}
              <a href="https://calendar.app.google/ikEVkrWRQRKCw77V7" target="_blank" rel="noopener" style={{ color: 'var(--neon, #00A3FF)' }}>
                Book a time on Keenan's calendar →
              </a>
            </p>
          </div>
        ) : (
        <form className="contact-form" onSubmit={submit}>
          <div className="term-header">
            <div className="dots"><span></span><span></span><span></span></div>
            <span className="path">~ /free-audit</span>
          </div>
          <div className="field">
            <label>your email <span className="req">*</span></label>
            <input type="email" name="email" required placeholder="you@yourcompany.com" />
          </div>
          <div className="field">
            <label>business name</label>
            <input type="text" name="business" placeholder="Your company" />
          </div>
          <div className="field">
            <label>what kind of business?</label>
            <select value={trade} onChange={(e) => setTrade(e.target.value)}>
              <option value="cyber">Cybersecurity consultant</option>
              <option value="home-service">Home service business</option>
              <option value="local">Local business without a website</option>
              <option value="other">Other</option>
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
            <textarea name="notes" placeholder="e.g. We keep missing calls when we're on a job, and our follow-up is all over the place…"></textarea>
          </div>
          <button type="submit">▸ Send & Book My Free Audit</button>
        </form>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer({ navigate } = {}) {
  return (
    <footer className="footer">
      <div className="footer-mark"></div>
      <div className="footer-inner">
        <div className="col">
          <h4>// BlueHippoCyber</h4>
          <p style={{ color: 'var(--ink)', fontSize: 14, lineHeight: 1.6, maxWidth: 360 }}>
            Automated lead systems for cybersecurity consultants and any local business
            without a solid website. Capture every lead, follow up on every quote,
            and book more jobs — without hiring anyone.
          </p>
          <p style={{ color: 'var(--ink-3)', fontSize: 12, marginTop: 12, fontFamily: 'var(--font-mono)' }}>
            Florida · Working with businesses USA-wide
          </p>
        </div>
        <div className="col">
          <h4>Site</h4>
          <a href="#how">How It Works</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate && navigate('pricing'); }}>Pricing</a>
        </div>
        <div className="col">
          <h4>Who It's For</h4>
          <a href="#built-for">Cybersecurity Consultants</a>
          <a href="#built-for">Home Service Pros</a>
          <a href="#built-for">Any Local Business</a>
        </div>
        <div className="col">
          <h4>Get in touch</h4>
          <a href="tel:8632097940">Call (863) 209-7940</a>
          <a href="sms:8638252215">Text (863) 825-2215</a>
          <a href="mailto:keenan@bluehippocyber.com">keenan@bluehippocyber.com</a>
          <a href="#contact">Book a free audit</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 BlueHippoCyber · Automated Lead Systems</div>
        <div className="socials">
          <a href="https://www.linkedin.com/in/keenanmcgriff" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/>
            </svg>
          </a>
          <a href="https://github.com/keenan371" target="_blank" rel="noopener" title="GitHub" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.45-1.17-1.11-1.48-1.11-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Hero, BuiltFor, WhatWeDo, HowItWorks, PricingTeaser,
  Pricing, Insights, FinalCTA, Marquee, Contact, Footer,
});
