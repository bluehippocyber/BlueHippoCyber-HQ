/* global React */
const { useState: useStateChat, useEffect: useEffectChat, useRef: useRefChat } = React;

/* ============================================================
   Hippo-Chat — live Claude with scripted fallback
   ============================================================ */
const SYSTEM_PROMPT = `You are Hippo-Chat, the on-site AI assistant for BlueHippoCyber.

THE FOUNDER: BlueHippoCyber was founded by Keenan McGriff, a professional from Lakeland, Florida, with over 8 years of experience in high-stakes technical trades. Never say it was founded by a "collective" or a "team" — it's Keenan's shop.

DEPLOYMENT TIMELINE: A Sentinel Light setup (Lead Bot / AI Receptionist) takes 24 to 48 hours, not weeks. We move at the speed of the modern trades. Full Sentinel and Architect deployments take 5–10 business days.

PERSONALITY: Friendly but protective. Think guardian — warm and approachable to clients, absolute dead-weight against security threats and missed leads. Direct and helpful. No corporate fluff. No marketing-speak. Talk like a senior tech who actually builds things.

THE GOAL: Prove that BlueHippoCyber builds "Digital Fortresses" that make local businesses more money and save them time. Every answer should connect back to: more leads captured, less time wasted, less risk exposed.

Stack & doctrine you can reference:
- HIPPO Framework: Hardening, Intelligence, Privacy, Protection, Orchestration.
- Tools: OSINTOrchestrator, WebScanner (OWASP Top 10), PcapAnalyzer, DesktopScanner, SolidityParser, DeFiHackLabsDB, ExifTool pipeline, AgenticCore, Sentinel-Bridge, n8n, Vapi voice, Hardened-SQL.
- AI providers: Claude, Gemini, OpenAI, Ollama (local-first preferred — Mistral-7B running on hardened SQL infrastructure).
- Tiers:
  · Ghost: $997 setup, $497/mo — privacy/footprint cleanup.
  · Sentinel: $2,497 setup, $1,497/mo — active defense + lead automation. Recommended growth driver.
  · Architect: $12,500 one-time, $0/mo — Sovereign Build. Custom local AI PC, 100% on-site privacy, on-call service & maintenance (no subscription).
  · Sentinel Light: one-time flat fees — AI Receptionist $750, Lead-Gen Website $900, Speed-to-Lead $500. No monthly.
- Philosophy: private-first, local AI, hardened SQL, no public/data-leaking platforms, weapon-free Blue Team.

You can navigate the user. If they ask to see pricing, the HIPPO framework, contact, stories, etc., respond briefly AND end your message with one of these tokens on its own line:
[NAV:hippo]   [NAV:vault-section]   [NAV:contact]   [NAV:stories]   [NAV:home]   [NAV:solutions]

Keep responses tight — 2-4 sentences. No markdown bold/italic, no headers. Capture the user's email or org if naturally possible.`;

function HippoChat({ open, setOpen, navigate }) {
  const [messages, setMessages] = useStateChat([
    { role: 'system', text: 'Sentinel handshake established · TLS 1.3 · Local routing' },
    { role: 'bot', text: 'Hey — I\'m Hippo. Keenan built me to handle the front door so he can keep building fortresses out back. Ask about pricing, the HIPPO framework, or tell me what your shop needs locked down.' },
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

    // Build conversation history for Claude
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
          history.map(m => `${m.role === 'assistant' ? 'Hippo-Chat' : 'User'}: ${m.content}`).join('\n') +
          `\nHippo-Chat:`;
        reply = await window.claude.complete(promptText);
      } else {
        reply = scriptedFallback(text);
      }
    } catch (e) {
      reply = scriptedFallback(text);
    }

    // Parse [NAV:xxx] tokens
    const navMatch = reply.match(/\[NAV:([a-z-]+)\]/i);
    let cleanReply = reply.replace(/\[NAV:[a-z-]+\]/gi, '').trim();
    if (!cleanReply) cleanReply = 'Routing you there now.';

    setMessages(prev => [...prev, { role: 'bot', text: cleanReply }]);
    setThinking(false);

    if (navMatch && navigate) {
      const dest = navMatch[1].toLowerCase();
      setTimeout(() => {
        if (dest === 'solutions') navigate('solutions');
        else if (dest === 'home') navigate('home');
        else navigate('home', dest);
      }, 600);
    }
  };

  const scripted = {
    pricing: 'Four tiers: Ghost $497/mo ($997 setup), Sentinel $1,497/mo ($2,497 setup), Architect $12,500 one-time/no monthly (sovereign build), Sentinel Light flat-fee assets. Routing you to The Vault.',
    osint: 'Our OSINT stack runs OSINTOrchestrator across 42+ sources, including 18 dark-web feeds. Inference is local — Ollama / Mistral-7B on hardened SQL. Nothing leaves your perimeter.',
    hippo: 'HIPPO = Hardening, Intelligence, Privacy, Protection, Orchestration. Five pillars, one doctrine. Want me to show you the framework?',
    contact: 'Call or text Keenan: 863-440-4145. Email: bluehippo.cyber@gmail.com. Acknowledged within 4 hours.',
    default: 'I\'m running on a scripted fallback right now — live Claude routing is briefly offline. Try asking about pricing, the HIPPO framework, or our OSINT stack.',
  };

  function scriptedFallback(t) {
    const q = t.toLowerCase();
    if (/(price|pricing|cost|tier|plan)/.test(q)) return scripted.pricing + '\n[NAV:vault-section]';
    if (/(osint|recon|intelligence)/.test(q)) return scripted.osint;
    if (/(hippo|framework|doctrine|pillar)/.test(q)) return scripted.hippo + '\n[NAV:hippo]';
    if (/(contact|email|telegram|reach)/.test(q)) return scripted.contact + '\n[NAV:contact]';
    return scripted.default;
  }

  const quickActions = [
    { label: 'show pricing', prompt: 'Show me pricing.' },
    { label: 'HIPPO framework', prompt: 'Explain the HIPPO framework.' },
    { label: 'tools you use', prompt: 'What tools do you use for OSINT and threat intel?' },
    { label: 'speak to architect', prompt: 'I want to speak to an architect.' },
  ];

  return (
    <>
      {!open && (
        <div className="chat-bubble" onClick={() => setOpen(true)} title="Hippo-Chat">
          <div className="pulse"></div>
          <div className="mark"></div>
        </div>
      )}
      <div className={`chat-window ${open ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="mark"></div>
          <div className="title-block">
            <div className="title">HIPPO-CHAT · v2.1</div>
            <div className="sub">online · local-AI routed</div>
          </div>
          <button className="close" onClick={() => setOpen(false)} title="Close">×</button>
        </div>
        <div className="chat-messages" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="author">
                {m.role === 'system' ? '// system' : m.role === 'bot' ? 'Hippo-Chat' : 'you'}
              </div>
              <div className="bubble">{m.text}</div>
            </div>
          ))}
          {thinking && (
            <div className="msg bot">
              <div className="author">Hippo-Chat</div>
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
            placeholder="ask the sentinel..."
            autoFocus
          />
          <button onClick={() => send(input)}>↵</button>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   Solutions page
   ============================================================ */
function SolutionsPage() {
  return (
    <div className="solutions-inner" style={{ position: 'relative' }}>
      <video className="hero-video" src="assets/hero-loop.mp4" autoPlay muted loop playsInline
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, zIndex: 0 }}></video>
      <div className="solutions-bg-watermark"></div>

      <section className="solutions-hero" style={{ position: 'relative', zIndex: 2 }}>
        <div className="eyebrow">// Tier 2 + Tier 3 · Deep architecture</div>
        <h1>Solutions, <span style={{ color: 'var(--neon)', fontStyle: 'italic' }}>architected</span>.</h1>
        <p className="lead">
          Four service surfaces, four hardened defaults. OWASP, MITRE ATT&CK, smart-contract bytecode, and
          autonomous orchestration — wired together by the Sentinel-Bridge so threats route to humans
          before they route to your customers.
        </p>
      </section>

      <div className="solutions-grid" style={{ position: 'relative', zIndex: 2 }}>
        <div className="solution-card">
          <div className="card-num">// SOL · 01</div>
          <h3>OWASP Top-10 Continuous Scan</h3>
          <p className="body">
            Weekly authenticated WebScanner runs against staging + prod. Findings auto-triaged by Claude into
            CVSS-weighted tickets, dispatched to your Sentinel-Bridge. Zero noise; only signal.
          </p>
          <div className="stack">
            <span>WebScanner</span><span>Burp / ZAP shims</span><span>CSP audit</span>
            <span>HSTS</span><span>SameSite</span><span>CSRF probe</span>
          </div>
          <div className="severity-row">
            <div className="sev crit"><div className="num">0</div><div className="lbl">crit</div></div>
            <div className="sev high"><div className="num">2</div><div className="lbl">high</div></div>
            <div className="sev med"><div className="num">7</div><div className="lbl">med</div></div>
            <div className="sev low"><div className="num">14</div><div className="lbl">low</div></div>
          </div>
        </div>

        <div className="solution-card">
          <div className="card-num">// SOL · 02</div>
          <h3>MITRE ATT&CK Mapping + PDF Reports</h3>
          <p className="body">
            Every monthly Architect-tier report cross-references your incidents to MITRE TTPs. Board-ready
            PDFs. Auditor-friendly. Generated by Claude, validated by a human Sentinel before send.
          </p>
          <div className="stack">
            <span>MITRE TTP</span><span>Claude Sonnet</span><span>Validator pipeline</span>
            <span>n8n</span><span>PDF render</span>
          </div>
          <div className="severity-row">
            <div className="sev crit"><div className="num">14</div><div className="lbl">tactics</div></div>
            <div className="sev high"><div className="num">183</div><div className="lbl">techniques</div></div>
            <div className="sev med"><div className="num">42</div><div className="lbl">mappings</div></div>
            <div className="sev low"><div className="num">100%</div><div className="lbl">human-verified</div></div>
          </div>
        </div>

        <div className="solution-card">
          <div className="card-num">// SOL · 03</div>
          <h3>Web3 Smart-Contract Audit</h3>
          <p className="body">
            SolidityParser + DeFiHackLabsDB cross-reference your bytecode against 14 years of public exploits.
            Reentrancy, oracle manipulation, integer overflow — surfaced before deploy. Once it's on-chain, it's permanent.
          </p>
          <div className="stack">
            <span>SolidityParser</span><span>DeFiHackLabsDB</span><span>Slither</span>
            <span>Mythril</span><span>Echidna fuzz</span>
          </div>
          <div className="severity-row">
            <div className="sev crit"><div className="num">3</div><div className="lbl">crit</div></div>
            <div className="sev high"><div className="num">5</div><div className="lbl">high</div></div>
            <div className="sev med"><div className="num">9</div><div className="lbl">med</div></div>
            <div className="sev low"><div className="num">22</div><div className="lbl">info</div></div>
          </div>
        </div>

        <div className="solution-card">
          <div className="card-num">// SOL · 04</div>
          <h3>Autonomous Orchestration · AgenticCore</h3>
          <p className="body">
            AgenticCore plans, executes, validates. Cold outreach, lead enrichment, speed-to-lead under 60s.
            Vapi voice handles inbound. The architect sleeps. The fortress doesn't.
          </p>
          <div className="stack">
            <span>AgenticCore</span><span>Vapi voice</span><span>n8n</span>
            <span>Sentinel-Bridge</span><span>Telegram alerts</span>
          </div>
          <div className="severity-row">
            <div className="sev crit"><div className="num">&lt;60s</div><div className="lbl">s2l</div></div>
            <div className="sev high"><div className="num">99.4%</div><div className="lbl">uptime</div></div>
            <div className="sev med"><div className="num">24/7</div><div className="lbl">autonomous</div></div>
            <div className="sev low"><div className="num">∞</div><div className="lbl">scale</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HippoChat, SolutionsPage });
