import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../data/products";
import { BADGE_COLOR } from "../../types";
import { fmt, stars, daysLeft } from "../../utils";
import "./Detail.css";

export default function Detail() {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product  = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container-xl py-5 text-center">
        <div style={{ fontSize: "4rem" }}>😕</div>
        <h3 style={{ color: "var(--gem-navy)", marginTop: 16 }}>Tender Not Found</h3>
        <button className="btn-bid mt-3" onClick={() => navigate("/tenders")}>
          ← Back to Listings
        </button>
      </div>
    );
  }

  const p  = product;
  const dl = daysLeft(p.deadline);

  const CHIPS = [
    { lbl: "Tender No.", val: p.tender_no },
    { lbl: "Category",   val: p.category },
    { lbl: "Portal",     val: p.portal },
    { lbl: "Est. Value", val: fmt(p.price) },
    { lbl: "Deadline",   val: p.deadline },
    { lbl: "Days Left",  val: `${dl} days ${dl <= 7 ? "⚠️" : ""}` },
  ];

  return (
    <div className="container-xl py-4">
      {/* Breadcrumb */}
      <nav className="detail-breadcrumb">
        <a onClick={() => navigate("/")}>Home</a>
        {" / "}
        <a onClick={() => navigate("/tenders")}>Tenders</a>
        {" / "}
        <span style={{ color: "var(--gem-muted)" }}>{p.title}</span>
      </nav>

      <div className="row g-4">
        {/* ── Left Column ── */}
        <div className="col-lg-7">
          <div className="detail-card">
            {/* Emoji display */}
            <div className="detail-emoji-display">{p.icon}</div>

            {/* Thumbnail row */}
            <div className="d-flex gap-2 mb-4">
              {[p.icon, "📄", "📊", "🗺️"].map((ic, i) => (
                <div key={i} className={`img-thumb ${i === 0 ? "active" : ""}`}>{ic}</div>
              ))}
            </div>

            {/* Tags */}
            <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
              <span className="detail-portal-tag">{p.portal}</span>
              {p.badge && (
                <span className={`badge bg-${BADGE_COLOR[p.badge] || "secondary"}`}>
                  {p.badge}
                </span>
              )}
              <span style={{ fontSize: ".78rem", color: "var(--gem-muted)" }}>{p.category}</span>
            </div>

            {/* Title */}
            <h2 className="detail-title">{p.title}</h2>

            {/* Description */}
            <p className="detail-desc">{p.desc}</p>

            {/* Info chips */}
            <div className="row g-2 mb-3">
              {CHIPS.map(c => (
                <div key={c.lbl} className="col-6 col-md-4">
                  <div className="info-chip">
                    <div className="lbl">{c.lbl}</div>
                    <div className="val">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rating */}
            <div className="d-flex align-items-center gap-2 mt-2">
              <div className="rating-stars">{stars(p.rating)}</div>
              <span style={{ fontSize: ".85rem", color: "var(--gem-muted)" }}>
                {p.rating} ({p.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Column – CTA ── */}
        <div className="col-lg-5">
          <div className="cta-panel">
            <div className="cta-value-label">Estimated Tender Value</div>
            <div className="cta-price">{fmt(p.price)}</div>
            <div className={`cta-status ${dl <= 7 ? "urgent" : "open"}`}>
              {dl <= 7 ? "⚠️ Closing Soon" : "✅ Open for Bids"} — {dl} days remaining
            </div>

            <div className="cta-bid-input-wrap">
              <div className="cta-bid-input-label">Your Bid Amount (₹)</div>
              <input
                className="gem-input"
                type="number"
                placeholder={`Enter amount up to ${fmt(p.price)}`}
              />
            </div>

            <div className="d-flex flex-column gap-3">
              <button className="btn-primary-gem">⚡ Place Bid Now</button>
              <button className="btn-outline-gem w-100" style={{ padding: ".65rem" }}>
                🔔 Add to Watchlist
              </button>
              <button className="btn-outline-gem w-100" style={{ padding: ".65rem" }}>
                📋 Download RFP
              </button>
            </div>

            <hr style={{ borderColor: "var(--gem-border)", margin: "20px 0" }} />

            <div className="cta-features">
              {[
                "✅ Verified Government Portal",
                "🔒 Secure Encrypted Bidding",
                "📨 Instant Notification on Award",
                "🏆 24/7 Bid Support Team",
              ].map(f => <div key={f}>{f}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
