import { useNavigate } from "react-router-dom";
import "./Landing.css";

const FEATURES = [
  { icon: "🔍", bg: "#eff6ff", title: "Discover Tenders Freely",     desc: "Search across GeM, CPPP, IREPS, DPSU and state portals — all in one unified search." },
  { icon: "📊", bg: "#f0fdf4", title: "Understand Bid Behavior",      desc: "Analytics on win rates, competitor patterns, and deadline trends to sharpen your strategy." },
  { icon: "⚡", bg: "#fefce8", title: "Act with Confidence",          desc: "AI-powered match scores tell you which tenders fit your profile before you spend time bidding." },
  { icon: "🔔", bg: "#fdf4ff", title: "Smart Alert System",           desc: "Get notified instantly when new tenders match your saved categories, keywords, or portals." },
  { icon: "🏢", bg: "#fff1f2", title: "Multi-Tenant Workspaces",      desc: "Each company gets an isolated workspace — separate users, bids, documents, and reports." },
  { icon: "📋", bg: "#f0fdfa", title: "Bid Document Management",      desc: "Upload, version and share RFP documents within your team. Never miss a submission deadline." },
];

const STEPS = [
  { num: "01", title: "Create your workspace",        desc: "Register your company and invite team members. Set up roles and notification preferences." },
  { num: "02", title: "Connect your portals",         desc: "Link GeM, CPPP, IREPS or state portals. We sync new tenders automatically every hour." },
  { num: "03", title: "Discover & save tenders",      desc: "Use filters, search, and AI match scores to shortlist the most relevant opportunities." },
  { num: "04", title: "Bid and track outcomes",       desc: "Submit bids, track deadlines, and analyse your win/loss record from your dashboard." },
];

const INSIGHTS = [
  { icon: "🎯", title: "Acquire New Customers",       desc: "Reach new government buyers by tracking procurement patterns and emerging categories.", cta: "Book a Demo" },
  { icon: "📈", title: "Drive Engagement",            desc: "Surface the highest-value tenders for your team and reduce time spent on manual search.", cta: "Learn More" },
  { icon: "🌱", title: "Grow Your User Base",         desc: "Invite teammates, assign roles, and scale your tender operations without extra overhead.", cta: "Start Free" },
];

const PREVIEW_STATS = [
  { lbl: "Total Bids",    val: "₹16.7 Cr", change: "+4%",  up: true  },
  { lbl: "Bids Won",      val: "₹5.9 Cr",  change: "-2.8%",up: false },
  { lbl: "Active Tenders",val: "₹9.1 Cr",  change: "+1.8%",up: true  },
];

const BAR_HEIGHTS = [30, 50, 45, 65, 55, 80, 70, 90, 75, 60, 85, 95];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="lp-hero">
        <div className="container-xl">
          <div className="lp-tag">✨ Now with AI-powered tender matching</div>
          <h1 className="lp-headline">Analytics that drive<br />tender decisions</h1>
          <p className="lp-sub">
            ProcureBrain helps procurement teams turn government tender data into clear next steps —
            without delays or portal-hopping.
          </p>
          <div className="lp-cta-wrap">
            <button className="btn-lp-primary" onClick={() => navigate("/signup")}>
              Get Started Free →
            </button>
            <button className="btn-lp-secondary" onClick={() => navigate("/tenders")}>
              Book A Demo ↗
            </button>
          </div>

          {/* Logo strip */}
          <div className="logo-strip">
            <div className="logo-strip-label">Trusted by procurement teams at</div>
            {["CPWD", "NHPC", "ONGC", "IRCON", "BHEL", "NTPC"].map(l => (
              <span key={l} className="logo-item">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DASHBOARD PREVIEW ══════════ */}
      <div className="lp-preview-wrap">
        <div className="container-xl">
          <div className="lp-preview-inner">
            {/* Browser chrome */}
            <div className="lp-preview-bar">
              <div className="lp-preview-dot" style={{ background: "#ff5f57" }} />
              <div className="lp-preview-dot" style={{ background: "#ffbd2e" }} />
              <div className="lp-preview-dot" style={{ background: "#28c840" }} />
              <div className="lp-preview-url">https://procurebrain.in/dashboard</div>
            </div>

            {/* Mini dashboard */}
            <div className="lp-preview-content">
              {/* Top alert */}
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "8px 16px", fontSize: ".82rem", color: "#1d4ed8", marginBottom: 20, fontWeight: 500 }}>
                🔵 Unlock the full potential — 3 new tenders match your profile today!
              </div>

              {/* Stat cards */}
              <div className="row g-3 mb-4">
                {PREVIEW_STATS.map(s => (
                  <div key={s.lbl} className="col-4">
                    <div className="preview-stat-card">
                      <div className="preview-stat-lbl">{s.lbl}</div>
                      <div className="preview-stat-val">{s.val}</div>
                      <div className={`preview-stat-change ${s.up ? "up" : "down"}`}>
                        {s.change} vs last month
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart row */}
              <div className="row g-3">
                <div className="col-md-6">
                  <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: ".8rem", fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Cash Flow Analytics</div>
                    <div className="preview-chart-bar">
                      {BAR_HEIGHTS.map((h, i) => (
                        <div key={i} className={`preview-bar${i === 7 ? " accent" : ""}`} style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: ".72rem", color: "#64748b" }}>
                      <span>● Income</span><span>● Expenses</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0", height: "100%" }}>
                    <div style={{ fontSize: ".8rem", fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Financial Balance</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {[
                        { lbl: "Active Bids", w: "75%", c: "#2f80ed" },
                        { lbl: "Won", w: "48%", c: "#0e9f85" },
                        { lbl: "Pending", w: "30%", c: "#f59e0b" },
                      ].map(r => (
                        <div key={r.lbl}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".75rem", color: "#64748b", marginBottom: 4 }}><span>{r.lbl}</span><span>{r.w}</span></div>
                          <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: r.w, background: r.c, borderRadius: 4 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ FEATURES ══════════ */}
      <section className="lp-features">
        <div className="container-xl">
          <div className="text-center mb-5">
            <div className="lp-tag" style={{ margin: "0 auto 10px" }}>Everything you need</div>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.4rem)", color: "#0f172a", letterSpacing: "-0.5px", marginBottom: 12 }}>
              Built for serious tender teams
            </h2>
            <p style={{ color: "#64748b", maxWidth: 480, margin: "0 auto", fontSize: ".97rem" }}>
              From discovery to award — ProcureBrain covers every step of your procurement workflow.
            </p>
          </div>
          <div className="row g-3">
            {FEATURES.map(f => (
              <div key={f.title} className="col-sm-6 col-lg-4">
                <div className="feature-card">
                  <div className="feature-icon" style={{ background: f.bg }}>{f.icon}</div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ INSIGHTS SECTION (Image 1 right-side layout) ══════════ */}
      <section style={{ background: "#fff", padding: "50px 0" }}>
        <div className="container-xl">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <div className="lp-tag" style={{ marginBottom: 16 }}>Turn insights into action</div>
              <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "#0f172a", letterSpacing: "-0.5px", marginBottom: 16, lineHeight: 1.2 }}>
                Turn Insights into action —<br />at every Stage
              </h2>
              <p style={{ color: "#64748b", fontSize: ".93rem", lineHeight: 1.7, marginBottom: 28 }}>
                ProcureBrain helps teams find tenders, understand bid patterns, optimise submissions, and make better decisions.
              </p>
              <button className="btn-lp-secondary" onClick={() => navigate("/signup")}>Book a Demo →</button>
            </div>
            <div className="col-lg-7">
              {INSIGHTS.map(i => (
                <div key={i.title} className="insight-row">
                  <div className="insight-icon-wrap">{i.icon}</div>
                  <div>
                    <div className="insight-title">{i.title}</div>
                    <div className="insight-desc">{i.desc}</div>
                    <button className="btn-insight-cta">{i.cta} →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="lp-steps">
        <div className="container-xl">
          <div className="text-center mb-5">
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "#0f172a", letterSpacing: "-0.5px", marginBottom: 12 }}>
              The engine for continuous growth
            </h2>
            <p style={{ color: "#64748b", maxWidth: 440, margin: "0 auto", fontSize: ".95rem" }}>
              Four simple steps to transform your tender operations.
            </p>
          </div>
          <div className="row g-4">
            {STEPS.map((s, i) => (
              <div key={s.num} className="col-sm-6 col-lg-3">
                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 28, height: "100%", position: "relative" }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "2rem", fontWeight: 900, marginBottom: 12, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontWeight: 700, color: "#0f172a", fontSize: ".97rem", marginBottom: 8 }}>{s.title}</div>
                  <div style={{ color: "#64748b", fontSize: ".86rem", lineHeight: 1.6 }}>{s.desc}</div>
                  {i < STEPS.length - 1 && (
                    <div style={{ display: "none" }} className="d-lg-block" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section className="lp-cta-banner">
        <div className="container-xl">
          <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.6rem)", color: "#fff", letterSpacing: "-0.5px", marginBottom: 16 }}>
            Ready to win more tenders?
          </h2>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: "1rem", marginBottom: 36, maxWidth: 440, margin: "0 auto 36px" }}>
            Join 18,000+ procurement professionals who use ProcureBrain to discover, bid, and win.
          </p>
          <div className="lp-cta-wrap">
            <button className="btn-lp-primary" style={{ background: "#fff", color: "#0f172a" }} onClick={() => navigate("/signup")}>
              Get Started Free →
            </button>
            <button className="btn-lp-secondary" style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,.3)", color: "#fff" }} onClick={() => navigate("/tenders")}>
              Browse Tenders
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
