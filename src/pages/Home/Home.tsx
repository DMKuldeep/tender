import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TenderCard from "../../components/TenderCard/TenderCard";
import { PRODUCTS, CATEGORIES } from "../../data/products";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState("All");
  const [loading, setLoading]     = useState(true);
  const [query, setQuery]         = useState("");
  const [cat, setCat]             = useState("All");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    activeCat === "All"
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCat);

  const STATS = [
    { num: "2.4L+", lbl: "Active Tenders" },
    { num: "₹8.2T", lbl: "Tender Value" },
    { num: "18K+",  lbl: "Verified Buyers" },
    { num: "94%",   lbl: "Success Rate" },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container-xl position-relative">
          <div className="row gy-4 align-items-center">

            {/* Left – headline + search */}
            <div className="col-lg-7 fade-up">
              <div className="hero-badge">
                <span>🔴 Live Tenders Open</span>
              </div>
              <h1 className="hero-title mb-3">
                India's Smartest<br />
                <span>Tender Intelligence</span><br />
                Platform
              </h1>
              <p className="hero-sub mb-5">
                Discover, track, and bid on thousands of government tenders across all portals —
                CPPP, GeM, IREPS, and more — in one unified workspace.
              </p>

              <div className="hero-search-wrap mb-2">
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search tenders by keyword, department, location..."
                  onKeyDown={e => e.key === "Enter" && navigate("/tenders")}
                />
                <select value={cat} onChange={e => setCat(e.target.value)}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <button className="btn-hero-search" onClick={() => navigate("/tenders")}>
                  Search Tenders
                </button>
              </div>
              <p className="hero-popular">Popular: Infrastructure, Healthcare, IT, Solar Energy, Railways</p>
            </div>

            {/* Right – stats */}
            <div className="col-lg-5 fade-up fade-up-d2">
              <div className="row g-3">
                {STATS.map(s => (
                  <div key={s.lbl} className="col-6">
                    <div className="hero-stat">
                      <div className="num">{s.num}</div>
                      <div className="lbl">{s.lbl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      <div className="cat-bar">
        <div className="container-xl py-3">
          <div
            className="d-flex gap-2 flex-nowrap overflow-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`cat-pill ${activeCat === c ? "active" : ""}`}
                onClick={() => setActiveCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Tenders ── */}
      <div className="container-xl py-5">
        <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
          <div>
            <div className="section-divider mb-2" />
            <h2 className="section-title">
              Featured <span>Tenders</span>
            </h2>
            <p style={{ fontSize: ".9rem", color: "var(--gem-muted)", marginTop: 4 }}>
              {filtered.length} tenders matching your criteria
            </p>
          </div>
          <button className="btn-outline-gem" onClick={() => navigate("/tenders")}>
            View All →
          </button>
        </div>

        {/* Skeleton */}
        {loading ? (
          <div className="row g-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="col-sm-6 col-lg-3">
                <div style={{ background: "#fff", borderRadius: 14, padding: 22, border: "1.5px solid var(--gem-border)" }}>
                  <div className="skeleton mb-3" style={{ height: 52, width: 52, borderRadius: 14 }} />
                  <div className="skeleton mb-2" style={{ height: 16, width: "80%" }} />
                  <div className="skeleton mb-2" style={{ height: 12, width: "50%" }} />
                  <div className="skeleton" style={{ height: 32, borderRadius: 8 }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          /* Empty state */
          <div className="text-center py-5">
            <div style={{ fontSize: "4rem", marginBottom: 16 }}>📭</div>
            <h4 style={{ color: "var(--gem-navy)", fontWeight: 700 }}>No Tenders Found</h4>
            <p style={{ color: "var(--gem-muted)" }}>Try selecting a different category.</p>
          </div>
        ) : (
          <div className="row g-3">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="col-sm-6 col-lg-3 fade-up"
                style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
              >
                <TenderCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Portal Showcase ── */}
      <div style={{ background: "linear-gradient(135deg, var(--gem-navy), #0e3d7a)", padding: "56px 0" }}>
        <div className="container-xl text-center">
          <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, color: "#fff", marginBottom: 8 }}>
            Connected to All Major Portals
          </h3>
          <p style={{ color: "rgba(255,255,255,.6)", marginBottom: 36 }}>
            Real-time data from all government procurement platforms
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {["GeM Portal", "CPPP", "IREPS", "DPSU", "State Portals", "Defence Portals"].map(p => (
              <div key={p} className="portal-badge">{p}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
