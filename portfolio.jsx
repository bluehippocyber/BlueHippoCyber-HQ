/* global React */

/* ============================================================
   Portfolio — shipped sites & apps
   Client identities are never shown here (no business names, no
   owner names) — described by industry + location + outcome only.
   ============================================================ */
const PORTFOLIO_ITEMS = [
  {
    tag: '// BHC Product',
    name: 'Cybersecurity Risk-Assessment Funnel',
    body: 'A self-serve risk assessment for cybersecurity consultants — visitors answer a short question set and get a scored report that drops them straight into a booked call.',
    stats: [
      { num: '10', lbl: 'question set' },
      { num: 'auto', lbl: 'scored report' },
    ],
    href: 'https://bhc-wedge-funnel.vercel.app',
  },
  {
    tag: '// Retail · Tampa, FL',
    name: 'Custom Jewelry Brand Site',
    body: 'A dual-market site for a custom jewelry maker with a live 3D product viewer, built from a photo-to-render pipeline that turns a single reference photo into a print-ready design.',
    stats: [
      { num: '3D', lbl: 'live viewer' },
      { num: 'dual', lbl: 'market design' },
    ],
    href: 'https://heem-kustomz.vercel.app',
  },
  {
    tag: '// Home Services · Lakeland, FL',
    name: 'Home Remodeling Lead Site',
    body: 'A clean lead-capture site with a built-in smart chat assistant, built so renovation consultations get booked even when the phone can’t be answered.',
    stats: [
      { num: '24/7', lbl: 'lead capture' },
      { num: 'smart', lbl: 'chat assistant' },
    ],
    href: 'https://home-remodel-web-demo-1.vercel.app',
  },
  {
    tag: '// Our Own Site',
    name: 'BlueHippoCyber HQ',
    body: 'The site you’re on right now — built and run with the exact same automated lead-system playbook we sell to clients.',
    stats: [
      { num: 'live', lbl: 'production site' },
      { num: 'self', lbl: 'built & run' },
    ],
    href: 'https://bluehippocyber.com',
  },
];

function PortfolioPage({ navigate }) {
  return (
    <div className="solutions-inner" style={{ position: 'relative' }}>
      <div className="solutions-bg-watermark"></div>

      <section className="solutions-hero" style={{ position: 'relative', zIndex: 2 }}>
        <div className="eyebrow">// Portfolio · What we've shipped</div>
        <h1>Real builds,<br/><span style={{ color: 'var(--neon)', fontStyle: 'italic' }}>live right now.</span></h1>
        <p className="lead">
          A running list of sites and apps we've built and deployed. Client names stay
          private — what's shown here is the work itself: live, working, and running
          the same systems we sell.
        </p>
        <div className="cta-row" style={{ marginTop: 28 }}>
          <button className="cta-primary" onClick={() => navigate('home', 'contact')}>
            Get Your Free Audit
            <span className="arrow"></span>
          </button>
        </div>
      </section>

      <div className="portfolio-grid" style={{ position: 'relative', zIndex: 2 }}>
        {PORTFOLIO_ITEMS.map((p) => (
          <div className="portfolio-card" key={p.name}>
            <div className="pf-tag">{p.tag}</div>
            <h3>{p.name}</h3>
            <p className="pf-body">{p.body}</p>
            <div className="pf-stats">
              {p.stats.map((s) => (
                <div key={s.lbl}>
                  <div className="num">{s.num}</div>
                  <div className="lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
            <a className="pf-link" href={p.href} target="_blank" rel="noopener noreferrer">
              View Live Site →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { PortfolioPage });
