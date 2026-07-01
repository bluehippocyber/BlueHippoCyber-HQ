# BHC Website — Pending Update Report
**Created:** 2026-06-10 at 10:53 AM

---

## 🔴 HIGH PRIORITY — Do Tonight

### 1. Wire All FREE AUDIT CTAs to /free-audit Page
Right now only the top-right nav button goes to `/free-audit`. Every other FREE AUDIT call-to-action on the main site still points to the contact section or chat widget. All of these need to redirect to `/free-audit` instead:

| Location in `components.jsx` | Current Behavior | Fix |
|---|---|---|
| Hero — "GET YOUR FREE GROWTH AUDIT →" button (line ~247) | Scrolls to `#contact` | `window.location.href = '/free-audit'` |
| Insights section — "Get your free audit →" link (line ~626) | `href="#contact"` | `href="/free-audit"` |
| Contact section header — "Book Your Free Audit" (line ~710) | Stays on page | `window.location.href = '/free-audit'` |
| Chat widget (`chat-and-solutions.jsx`, line ~128) | Opens chat flow | Keep as-is (chat handles it) |

### 2. Connect the /free-audit Form to a Real Backend
The form on `/free-audit` currently has a **fake client-side success state only** — no submissions go anywhere. Leads are being lost.

**Fix:**
1. Create a free Formspree account at formspree.io
2. Create a new form → copy the ID (format: `xabcdefg`)
3. In `free-audit.html`, find the `<form>` tag and add: `action="https://formspree.io/f/YOUR_ID" method="POST"`
4. Push to GitHub → Vercel auto-deploys
5. All form submissions will arrive at `keenan@bluehippocyber.com`

---

## ✅ Already Done (Session 2026-06-10)
- FREE AUDIT nav button (top-right) → now correctly routes to `/free-audit`
- `/free-audit` page live at https://blue-hippo-cyber-hq.vercel.app/free-audit
- Real BHC logo (hippo + shield) deployed from Claude Design export
- `cleanUrls: true` in `vercel.json` so `/free-audit` works (no `.html` needed)
