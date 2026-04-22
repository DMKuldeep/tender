import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Companies.css";

// ─── Brand / Company Data ─────────────────────────────────────────────────────
const COMPANIES = [
  {
    id: 1,
    name: "CPWD",
    fullName: "Central Public Works Department",
    icon: "🏛️",
    bg: "#eff6ff",
    industry: "Infrastructure",
    industryBg: "#dbeafe", industryColor: "#1d4ed8",
    location: "New Delhi",
    employees: "30,000+",
    tenders: 48,
    totalValue: "₹12.4 Cr",
    desc: "India's premier central government construction agency handling all civil & electrical works for government buildings.",
    verified: true,
    portals: ["CPPP", "GeM"],
    established: "1854",
  },
  {
    id: 2,
    name: "NHPC",
    fullName: "National Hydroelectric Power Corporation",
    icon: "💧",
    bg: "#f0fdfa",
    industry: "Energy",
    industryBg: "#ccfbf1", industryColor: "#0f766e",
    location: "Faridabad, Haryana",
    employees: "12,000+",
    tenders: 31,
    totalValue: "₹8.7 Cr",
    desc: "India's premier hydropower company developing and operating large-scale hydro projects across the country.",
    verified: true,
    portals: ["CPPP", "IREPS"],
    established: "1975",
  },
  {
    id: 3,
    name: "ONGC",
    fullName: "Oil and Natural Gas Corporation",
    icon: "⛽",
    bg: "#fefce8",
    industry: "Energy",
    industryBg: "#fef9c3", industryColor: "#854d0e",
    location: "Dehradun, Uttarakhand",
    employees: "32,000+",
    tenders: 67,
    totalValue: "₹42.1 Cr",
    desc: "India's largest crude oil and natural gas company, contributing over 70% of domestic production.",
    verified: true,
    portals: ["CPPP", "GeM"],
    established: "1956",
  },
  {
    id: 4,
    name: "IRCON",
    fullName: "IRCON International Limited",
    icon: "🚂",
    bg: "#fdf4ff",
    industry: "Transport",
    industryBg: "#f3e8ff", industryColor: "#7c3aed",
    location: "New Delhi",
    employees: "3,500+",
    tenders: 29,
    totalValue: "₹18.3 Cr",
    desc: "A premier public sector undertaking under Ministry of Railways executing infrastructure projects in India and abroad.",
    verified: true,
    portals: ["IREPS", "CPPP"],
    established: "1976",
  },
  {
    id: 5,
    name: "BHEL",
    fullName: "Bharat Heavy Electricals Limited",
    icon: "⚡",
    bg: "#fff1f2",
    industry: "Manufacturing",
    industryBg: "#fee2e2", industryColor: "#dc2626",
    location: "New Delhi",
    employees: "35,000+",
    tenders: 54,
    totalValue: "₹31.6 Cr",
    desc: "India's largest engineering and manufacturing enterprise in energy-related and infrastructure sectors.",
    verified: true,
    portals: ["GeM", "CPPP"],
    established: "1964",
  },
  {
    id: 6,
    name: "NTPC",
    fullName: "National Thermal Power Corporation",
    icon: "🔌",
    bg: "#f0f9ff",
    industry: "Energy",
    industryBg: "#e0f2fe", industryColor: "#0284c7",
    location: "New Delhi",
    employees: "20,000+",
    tenders: 72,
    totalValue: "₹56.8 Cr",
    desc: "India's largest power company, contributing over one-fourth of total power generation in the country.",
    verified: true,
    portals: ["CPPP", "GeM", "IREPS"],
    established: "1975",
  },
  {
    id: 7,
    name: "SAIL",
    fullName: "Steel Authority of India Limited",
    icon: "🏗️",
    bg: "#f8fafc",
    industry: "Manufacturing",
    industryBg: "#f1f5f9", industryColor: "#475569",
    location: "New Delhi",
    employees: "65,000+",
    tenders: 38,
    totalValue: "₹22.4 Cr",
    desc: "India's largest steel-making company and one of the Maharatna group of PSUs under the Ministry of Steel.",
    verified: true,
    portals: ["GeM", "CPPP"],
    established: "1954",
  },
  {
    id: 8,
    name: "AAI",
    fullName: "Airports Authority of India",
    icon: "✈️",
    bg: "#f0f9ff",
    industry: "Transport",
    industryBg: "#dbeafe", industryColor: "#1d4ed8",
    location: "New Delhi",
    employees: "15,000+",
    tenders: 41,
    totalValue: "₹28.9 Cr",
    desc: "Manages 137 airports in India including international and domestic airports and provides air navigation services.",
    verified: true,
    portals: ["CPPP", "GeM"],
    established: "1995",
  },
  {
    id: 9,
    name: "NMDC",
    fullName: "National Mineral Development Corporation",
    icon: "⛏️",
    bg: "#fefce8",
    industry: "Mining",
    industryBg: "#fef9c3", industryColor: "#a16207",
    location: "Hyderabad",
    employees: "6,000+",
    tenders: 22,
    totalValue: "₹9.1 Cr",
    desc: "India's single largest iron ore producer and a Navratna PSU under Ministry of Steel.",
    verified: false,
    portals: ["CPPP"],
    established: "1958",
  },
  {
    id: 10,
    name: "BSNL",
    fullName: "Bharat Sanchar Nigam Limited",
    icon: "📡",
    bg: "#f0fdf4",
    industry: "Telecom",
    industryBg: "#dcfce7", industryColor: "#15803d",
    location: "New Delhi",
    employees: "70,000+",
    tenders: 58,
    totalValue: "₹14.7 Cr",
    desc: "India's largest government-owned telecom company providing nationwide mobile and broadband services.",
    verified: true,
    portals: ["GeM", "CPPP"],
    established: "2000",
  },
  {
    id: 11,
    name: "IOCL",
    fullName: "Indian Oil Corporation Limited",
    icon: "🛢️",
    bg: "#fff7ed",
    industry: "Energy",
    industryBg: "#fed7aa", industryColor: "#c2410c",
    location: "New Delhi",
    employees: "33,000+",
    tenders: 83,
    totalValue: "₹68.2 Cr",
    desc: "India's largest commercial enterprise and the only Indian company to feature in Fortune's Most Admired Companies.",
    verified: true,
    portals: ["GeM", "CPPP", "State Portal"],
    established: "1959",
  },
  {
    id: 12,
    name: "HAL",
    fullName: "Hindustan Aeronautics Limited",
    icon: "🛩️",
    bg: "#fdf4ff",
    industry: "Defence",
    industryBg: "#f3e8ff", industryColor: "#6d28d9",
    location: "Bengaluru",
    employees: "30,000+",
    tenders: 19,
    totalValue: "₹94.5 Cr",
    desc: "India's premier aeronautical company designing, manufacturing and maintaining military and civil aircraft.",
    verified: true,
    portals: ["DPSU", "CPPP"],
    established: "1940",
  },
];

const INDUSTRIES = ["All", "Infrastructure", "Energy", "Transport", "Manufacturing", "Telecom", "Mining", "Defence"];

const STATS = [
  { num: "200+", lbl: "Registered Companies" },
  { num: "₹380 Cr", lbl: "Total Tender Value" },
  { num: "12",      lbl: "Industry Sectors" },
  { num: "6",       lbl: "Portal Integrations" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Companies() {
  const navigate  = useNavigate();
  const [search, setSearch]       = useState("");
  const [industry, setIndustry]   = useState("All");

  const filtered = COMPANIES.filter(c => {
    const matchSearch = !search.trim() ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchIndustry = industry === "All" || c.industry === industry;
    return matchSearch && matchIndustry;
  });

  return (
    <>
      {/* ── Hero ── */}
      <section className="companies-hero">
        <div className="container-xl">
          <div className="companies-hero-tag">🏢 Trusted by India's top PSUs</div>
          <h1>Companies on ProcureBrain</h1>
          <p>
            Explore India's leading public sector and private companies actively
            publishing and bidding on government tenders across all major portals.
          </p>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <div className="companies-stats-strip">
        <div className="container-xl">
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            {STATS.map(s => (
              <div key={s.lbl} className="stat-strip-item">
                <div className="stat-strip-num">{s.num}</div>
                <div className="stat-strip-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="companies-filter-bar">
        <div className="container-xl">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="companies-search-wrap">
              <span className="companies-search-icon">🔍</span>
              <input
                className="companies-search-input"
                placeholder="Search companies, sectors..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Industry pills */}
            <div
              className="d-flex gap-2 flex-nowrap overflow-auto pb-1"
              style={{ scrollbarWidth: "none" }}
            >
              {INDUSTRIES.map(ind => (
                <button
                  key={ind}
                  className={`industry-pill ${industry === ind ? "active" : ""}`}
                  onClick={() => setIndustry(ind)}
                >
                  {ind}
                </button>
              ))}
            </div>

            {/* Result count */}
            <div style={{ marginLeft: "auto", fontSize: ".85rem", color: "#64748b", whiteSpace: "nowrap" }}>
              <strong style={{ color: "#0f172a" }}>{filtered.length}</strong> companies
            </div>
          </div>
        </div>
      </div>

      {/* ── Companies Grid ── */}
      <section className="companies-grid-section">
        <div className="container-xl">
          {filtered.length === 0 ? (
            <div className="companies-empty">
              <div className="empty-icon">🏢</div>
              <h5 style={{ color: "#0f172a", fontWeight: 700 }}>No Companies Found</h5>
              <p style={{ color: "#64748b" }}>Try a different search term or industry filter.</p>
              <button
                className="btn-bid mt-3"
                onClick={() => { setSearch(""); setIndustry("All"); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filtered.map(c => (
                <div key={c.id} className="col-sm-6 col-lg-4">
                  <div
                    className="company-card"
                    onClick={() => navigate("/tenders")}
                  >
                    {/* Verified badge */}
                    {c.verified && (
                      <div className="verified-badge">✓ Verified</div>
                    )}

                    {/* Logo */}
                    <div
                      className="company-logo-wrap"
                      style={{ background: c.bg }}
                    >
                      {c.icon}
                    </div>

                    {/* Name + Industry */}
                    <div className="company-name">{c.name}</div>
                    <div style={{ fontSize: ".78rem", color: "#64748b", marginBottom: 8 }}>
                      {c.fullName}
                    </div>
                    <span
                      className="company-industry-tag"
                      style={{ background: c.industryBg, color: c.industryColor }}
                    >
                      {c.industry}
                    </span>

                    {/* Description */}
                    <p className="company-desc">{c.desc}</p>

                    {/* Meta */}
                    <div className="company-meta-row">
                      <div className="company-meta-item">
                        📍 <strong>{c.location}</strong>
                      </div>
                      <div className="company-meta-item">
                        👥 <strong>{c.employees}</strong>
                      </div>
                      <div className="company-meta-item">
                        📅 Est. <strong>{c.established}</strong>
                      </div>
                    </div>

                    {/* Portals */}
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
                      {c.portals.map(p => (
                        <span
                          key={p}
                          style={{
                            background: "#f0f9ff",
                            color: "#0284c7",
                            border: "1px solid #bae6fd",
                            borderRadius: 50,
                            padding: "2px 8px",
                            fontSize: ".7rem",
                            fontWeight: 700,
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* Tender count badge */}
                    <div className="company-tenders-badge">
                      <span>📋 Active Tenders</span>
                      <span style={{ fontWeight: 800, color: "#1d4ed8" }}>
                        {c.tenders} tenders
                      </span>
                    </div>

                    {/* CTA */}
                    <button
                      className="btn-company-view"
                      onClick={e => { e.stopPropagation(); navigate("/tenders"); }}
                    >
                      View Tenders →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Featured / Top Brands Strip ── */}
      <section className="featured-strip">
        <div className="container-xl">
          <div className="text-center mb-4">
            <div
              style={{
                fontSize: ".78rem", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1, color: "rgba(255,255,255,.4)", marginBottom: 8,
              }}
            >
              Top Brands by Tender Volume
            </div>
            <h3
              style={{
                fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "1.4rem",
                color: "#fff", marginBottom: 0,
              }}
            >
              Most Active Companies This Month
            </h3>
          </div>
          <div className="row g-3">
            {COMPANIES
              .sort((a, b) => b.tenders - a.tenders)
              .slice(0, 6)
              .map(c => (
                <div key={c.id} className="col-6 col-md-4 col-lg-2">
                  <div
                    className="featured-company-chip"
                    onClick={() => navigate("/tenders")}
                  >
                    <div
                      className="featured-chip-logo"
                      style={{ background: c.bg }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 800, color: "#fff",
                          fontSize: ".88rem", lineHeight: 1.2,
                        }}
                      >
                        {c.name}
                      </div>
                      <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.45)" }}>
                        {c.tenders} tenders
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="companies-cta">
        <div className="container-xl">
          <div
            style={{
              fontFamily: "Inter, sans-serif", fontWeight: 800,
              fontSize: "clamp(1.4rem,3vw,2rem)", color: "#0f172a",
              letterSpacing: "-0.5px", marginBottom: 10,
            }}
          >
            Is your company not listed?
          </div>
          <p style={{ color: "#64748b", marginBottom: 28, fontSize: ".97rem" }}>
            Register your organisation and start publishing tenders on ProcureBrain today.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="btn-bid"
              style={{ padding: ".75rem 2rem", fontSize: ".95rem" }}
              onClick={() => navigate("/signup")}
            >
              Register Your Company →
            </button>
            <button
              className="btn-outline-gem"
              style={{ padding: ".75rem 2rem", fontSize: ".95rem" }}
              onClick={() => navigate("/tenders")}
            >
              Browse All Tenders
            </button>
          </div>
        </div>
      </section>
    </>
  );
}