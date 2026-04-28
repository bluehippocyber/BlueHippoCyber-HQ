/* global React */
const { useState: useStateVault, useEffect: useEffectVault, useRef: useRefVault } = React;

/* ============================================================
   /Vault — login + dashboard
   ============================================================ */
function VaultPage({ tweaks, setTweaks }) {
  const [authed, setAuthed] = useStateVault(false);
  const [pwd, setPwd] = useStateVault('');
  const [err, setErr] = useStateVault('');
  const [shake, setShake] = useStateVault(false);
  const inputRef = useRefVault(null);

  useEffectVault(() => {
    if (!authed && inputRef.current) inputRef.current.focus();
  }, [authed]);

  const submit = (e) => {
    e.preventDefault();
    if (pwd === '385378') {
      setErr('');
      setAuthed(true);
    } else {
      setErr('AUTH FAIL · attempt logged · sentinel notified');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPwd('');
    }
  };

  if (!authed) {
    return (
      <div className="vault-page">
        <div className="vault-login">
          <div className="term-box" style={shake ? { animation: 'shakeX 0.5s' } : {}}>
            <div className="term-bar">
              <div className="dots"><span></span><span></span><span></span></div>
              <span className="path">~ /vault/auth</span>
            </div>
            <div className="term-body">
              <div className="ascii">{`
   ╔══════════════════════════════════╗
   ║  BLUEHIPPOCYBER · PRIVATE VAULT  ║
   ║  Authorized Sentinels Only       ║
   ╚══════════════════════════════════╝
`}</div>
              <div className="line">{'>'} initializing secure shell...</div>
              <div className="line">{'>'} TLS handshake <span className="ok">OK</span></div>
              <div className="line">{'>'} bridge: <span style={{ color: 'var(--neon)' }}>online</span></div>
              <div className="line">{'>'} sentinels active: <span style={{ color: 'var(--neon)' }}>7</span></div>
              <div className="line" style={{ marginTop: 12 }}>This vault is restricted. Unauthorized access is logged, traced, and prosecuted.</div>
              <form onSubmit={submit} className="prompt-line">
                <span className="arrow">▸</span>
                <span>passcode:</span>
                <input
                  ref={inputRef}
                  type="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  autoComplete="off"
                  placeholder="······"
                />
                <span className="blink"></span>
              </form>
              {err && <div className="err">{err}</div>}
              <div className="line" style={{ marginTop: 18, fontSize: 11, color: 'var(--ink-3)' }}>
                hint: 6-digit numeric · provided to onboarded clients only
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <VaultDashboard tweaks={tweaks} setTweaks={setTweaks} onLogout={() => { setAuthed(false); setPwd(''); }} />;
}

/* ============================================================
   Vault dashboard
   ============================================================ */
function VaultDashboard({ tweaks, setTweaks, onLogout }) {
  const [logs, setLogs] = useStateVault(initialLogs());
  const [scanRunning, setScanRunning] = useStateVault(false);
  const [containers, setContainers] = useStateVault(initialContainers());

  useEffectVault(() => {
    const id = setInterval(() => {
      setLogs(prev => {
        const newLog = randomLog();
        return [newLog, ...prev].slice(0, 60);
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const triggerScan = () => {
    if (scanRunning) return;
    setScanRunning(true);
    const stages = [
      { lvl: 'info', msg: '[ghost-scan] orchestrator spinning up' },
      { lvl: 'info', msg: '[ghost-scan] hitting 42 OSINT sources' },
      { lvl: 'warn', msg: '[ghost-scan] PII match · spokeo.com · 1 record' },
      { lvl: 'warn', msg: '[ghost-scan] PII match · whitepages · 2 records' },
      { lvl: 'info', msg: '[ghost-scan] takedown queue · 3 dispatched' },
      { lvl: 'ok', msg: '[ghost-scan] complete · 11s · 3 records flagged' },
    ];
    stages.forEach((s, i) => {
      setTimeout(() => {
        setLogs(prev => [{
          ts: nowTs(), lvl: s.lvl, msg: s.msg,
        }, ...prev].slice(0, 60));
        if (i === stages.length - 1) setScanRunning(false);
      }, (i + 1) * 1100);
    });
  };

  return (
    <div className="vault-page">
      <div className="dash">
        {/* top header bar */}
        <div className="dash-panel span-3" style={{ flexDirection: 'row', alignItems: 'center', padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
            <div style={{ width: 34, height: 34, backgroundImage: 'url(assets/hippo-logo.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', filter: 'drop-shadow(0 0 6px var(--neon))' }}></div>
            <div>
              <div style={{ font: '600 14px/1 var(--font-mono)', color: 'var(--ink)' }}>SENTINEL · COMMAND VAULT</div>
              <div style={{ font: '400 10px/1 var(--font-mono)', color: 'var(--ink-3)', marginTop: 4 }}>
                NODE BHC-001 · authenticated as <span style={{ color: 'var(--neon)' }}>operator@bluehippo</span>
              </div>
            </div>
          </div>
          <button className="btn-trigger" style={{ background: 'transparent', color: 'var(--ink-2)', border: '1px solid var(--line-strong)' }} onClick={onLogout}>
            ▸ Sever Connection
          </button>
        </div>

        {/* metrics */}
        <div className="dash-panel span-3">
          <div className="panel-head">
            <div className="title">// Live Metrics · last 24h</div>
            <div className="meta"><span className="dot-on"></span>realtime</div>
          </div>
          <div className="panel-body">
            <div className="metric-strip">
              <div className="cell">
                <div className="lbl">Active Leads</div>
                <div className="val neon">23</div>
                <div className="delta up">+7 vs yesterday</div>
              </div>
              <div className="cell">
                <div className="lbl">Threat Alerts</div>
                <div className="val">4</div>
                <div className="delta dn">-2 vs yesterday</div>
              </div>
              <div className="cell">
                <div className="lbl">Speed-to-Lead</div>
                <div className="val">42s</div>
                <div className="delta up">−18s vs avg</div>
              </div>
              <div className="cell">
                <div className="lbl">PII Removed (90d)</div>
                <div className="val">11,402</div>
                <div className="delta up">+128 today</div>
              </div>
            </div>
          </div>
        </div>

        {/* logs */}
        <div className="dash-panel span-2">
          <div className="panel-head">
            <div className="title">// n8n Execution Stream</div>
            <div className="meta"><span className="dot-on"></span>tailing · 3.5s interval</div>
          </div>
          <div className="panel-body">
            <div className="log-stream">
              {logs.map((l, i) => (
                <div className="row" key={i}>
                  <div className="ts">{l.ts}</div>
                  <div className={`lvl ${l.lvl}`}>{l.lvl.toUpperCase()}</div>
                  <div>{l.msg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* controls */}
        <div className="dash-panel">
          <div className="panel-head">
            <div className="title">// Sentinel Controls</div>
            <div className="meta">operator-only</div>
          </div>
          <div className="panel-body">
            <div className="dash-controls">
              <div className="dash-control">
                <div>
                  <div className="ctl-name">Sentinel Active</div>
                  <div className="ctl-sub">live monitoring across all surfaces</div>
                </div>
                <div className={`toggle ${tweaks.sentinelActive ? 'on' : ''}`} onClick={() => setTweaks({ sentinelActive: !tweaks.sentinelActive })}></div>
              </div>
              <div className="dash-control">
                <div>
                  <div className="ctl-name">Bridge Status</div>
                  <div className="ctl-sub">sentinel_bridge.py · alert routing</div>
                </div>
                <div className={`toggle ${tweaks.bridgeOnline ? 'on' : ''}`} onClick={() => setTweaks({ bridgeOnline: !tweaks.bridgeOnline })}></div>
              </div>
              <div className="dash-control">
                <div>
                  <div className="ctl-name">Manual Trigger</div>
                  <div className="ctl-sub">run a Ghost Scan on new leads</div>
                </div>
                <button className={`btn-trigger ${scanRunning ? 'running' : ''}`} onClick={triggerScan}>
                  {scanRunning ? '◉ Running…' : '▸ Ghost Scan'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* docker */}
        <div className="dash-panel">
          <div className="panel-head">
            <div className="title">// Container Status</div>
            <div className="meta">docker · healthy/{containers.length}</div>
          </div>
          <div className="panel-body">
            <div className="container-list">
              {containers.map(c => (
                <div key={c.name} className={`container ${c.status}`}>
                  <div className="ind"></div>
                  <div className="name">{c.name}</div>
                  <div className="status">{c.statusText}</div>
                  <div className="uptime">{c.uptime}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* leads */}
        <div className="dash-panel span-2">
          <div className="panel-head">
            <div className="title">// Lead Dossiers · Ollama-analyzed</div>
            <div className="meta">7 active · 23 last 24h</div>
          </div>
          <div className="panel-body">
            <table className="lead-table">
              <thead>
                <tr>
                  <th>Handle</th>
                  <th>Org</th>
                  <th>Tier</th>
                  <th>Score</th>
                  <th>AI Note</th>
                </tr>
              </thead>
              <tbody>
                {LEADS.map(l => (
                  <tr key={l.handle}>
                    <td style={{ color: 'var(--ink)' }}>{l.handle}</td>
                    <td>{l.org}</td>
                    <td>{l.tier}</td>
                    <td><span className={`score ${l.score}`}>{l.score.toUpperCase()}</span></td>
                    <td><span className="ai-tag">{l.note}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>{`@keyframes shakeX { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`}</style>
    </div>
  );
}

function nowTs() {
  const d = new Date();
  const z = (n) => String(n).padStart(2, '0');
  return `${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}`;
}

function randomLog() {
  const pool = [
    { lvl: 'ok', msg: '[sentinel] heartbeat · all sectors green' },
    { lvl: 'info', msg: '[osint] crawl complete · 42 sources · 0 new exposures' },
    { lvl: 'info', msg: '[ollama] inference · mistral-7b · 14 tokens/s' },
    { lvl: 'warn', msg: '[webscan] cookie · SameSite=None · client/staging' },
    { lvl: 'ok', msg: '[bridge] alert dispatched → telegram · 38ms' },
    { lvl: 'info', msg: '[agentic] outreach batch · 12 prospects enriched' },
    { lvl: 'ok', msg: '[hardened-sql] backup complete · 2.4GB · encrypted' },
    { lvl: 'warn', msg: '[exiftool] metadata stripped · 14 assets · client/treehouse' },
    { lvl: 'info', msg: '[mitre] TTP T1566.002 detected · spearphishing link' },
    { lvl: 'crit', msg: '[sentinel] impersonator domain registered · auto-flag' },
  ];
  const p = pool[Math.floor(Math.random() * pool.length)];
  return { ts: nowTs(), ...p };
}

function initialLogs() {
  return [
    { ts: nowTs(), lvl: 'ok', msg: '[sentinel] dashboard authenticated' },
    { ts: nowTs(), lvl: 'info', msg: '[bridge] sentinel_bridge.py · pid 4821 · uptime 14d' },
    { ts: nowTs(), lvl: 'ok', msg: '[ollama] mistral-7b loaded · 3.8GB · vram 6.2GB' },
    { ts: nowTs(), lvl: 'info', msg: '[n8n] 14 workflows active · 0 in error state' },
    { ts: nowTs(), lvl: 'warn', msg: '[webscan] HSTS missing · client/deli3d/staging' },
    { ts: nowTs(), lvl: 'ok', msg: '[hardened-sql] row-level encryption · audit pass' },
    { ts: nowTs(), lvl: 'info', msg: '[osint] background crawl · spokeo, whitepages, beenverified' },
  ];
}

function initialContainers() {
  return [
    { name: 'sentinel-bridge',  status: 'ok',   statusText: 'HEALTHY', uptime: '14d 3h' },
    { name: 'ollama-mistral',   status: 'ok',   statusText: 'HEALTHY', uptime: '14d 3h' },
    { name: 'n8n-orchestrator', status: 'ok',   statusText: 'HEALTHY', uptime: '14d 3h' },
    { name: 'osint-crawler',    status: 'ok',   statusText: 'HEALTHY', uptime: '6d 14h' },
    { name: 'webscan-runner',   status: 'warn', statusText: 'BACKLOG', uptime: '14d 3h' },
    { name: 'hardened-sql',     status: 'ok',   statusText: 'HEALTHY', uptime: '47d 2h' },
    { name: 'agentic-core',     status: 'ok',   statusText: 'HEALTHY', uptime: '6d 14h' },
    { name: 'vapi-voice',       status: 'ok',   statusText: 'HEALTHY', uptime: '14d 3h' },
  ];
}

const LEADS = [
  { handle: 'ada@stratoslabs.io', org: 'Stratos Labs', tier: 'Architect', score: 'hot',  note: 'series-A · web3 · 38 employees' },
  { handle: 'm.choi@treehouse.fl', org: 'FL Treehouse', tier: 'Light',     score: 'warm', note: 'expansion · 2nd property' },
  { handle: 'devs@coldsteel.app',  org: 'Coldsteel',     tier: 'Sentinel',  score: 'hot',  note: 'breach last quarter · urgent' },
  { handle: 'paula@deli3d.io',     org: 'Deli3D',        tier: 'Ghost',     score: 'cold', note: 'evaluating · 14d in funnel' },
  { handle: 'r@onyx.systems',      org: 'Onyx Systems',  tier: 'Architect', score: 'hot',  note: 'CTO direct · referred by Stratos' },
  { handle: 'team@northtide.co',   org: 'Northtide',     tier: 'Sentinel',  score: 'warm', note: 'OWASP audit requested' },
  { handle: 'k@meadow.run',        org: 'Meadow Run',    tier: 'Light',     score: 'cold', note: 'small-biz · price-sensitive' },
];

Object.assign(window, { VaultPage });
