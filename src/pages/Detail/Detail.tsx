import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PRODUCTS } from "../../data/products";
import { BADGE_COLOR } from "../../types";
import { fmt, stars, daysLeft } from "../../utils";
import Toast, { useToast } from "../../components/Toast/Toast";
import "./Detail.css";

// Dummy RFP PDF URL (replace with real API later)
const DUMMY_PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export default function Detail() {
  const { id }     = useParams<{ id: string }>();
  const navigate   = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toasts, remove, success, error, loading, dismiss } = useToast();

  const product = PRODUCTS.find(p => p.id === Number(id));
  const [bidAmount, setBidAmount]     = useState("");
  const [activeThumb, setActiveThumb] = useState(0);
  const [downloading, setDownloading] = useState(false);

  if (!product) {
    return (
      <div className="container-xl py-5 text-center">
        <div style={{ fontSize:"4rem" }}>😕</div>
        <h3 style={{ color:"#0f172a", marginTop:16 }}>Tender Not Found</h3>
        <button className="btn-bid mt-3" onClick={() => navigate("/tenders")}>
          ← Back to Listings
        </button>
      </div>
    );
  }

  const p  = product;
  const dl = daysLeft(p.deadline);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleBid = () => {
    if (!isAuthenticated) { navigate("/login"); return; }
    if (!bidAmount) { error("Enter bid amount", "Please enter your bid amount before submitting."); return; }
    const loadId = loading("Submitting your bid...", "Please wait while we process your bid.");
    setTimeout(() => {
      dismiss(loadId);
      success("Bid Submitted!", `Your bid of ₹${bidAmount} has been submitted for ${p.title}.`);
      setBidAmount("");
    }, 2000);
  };

  const handleWatchlist = () => {
    if (!isAuthenticated) { navigate("/login"); return; }
    success("Added to Watchlist", `${p.title} has been saved to your watchlist.`);
  };

  const handleDownloadRFP = async () => {
    if (!isAuthenticated) { navigate("/login"); return; }
    if (downloading) return;
    setDownloading(true);
    const loadId = loading("Preparing RFP document...", "Fetching document from portal servers.");
    try {
      await new Promise(res => setTimeout(res, 2000)); // simulate API delay
      dismiss(loadId);
      // Open PDF in new tab (replace DUMMY_PDF with real API endpoint later)
      window.open(DUMMY_PDF, "_blank");
      success("RFP Downloaded!", `${p.tender_no} — document opened in a new tab.`);
    } catch {
      dismiss(loadId);
      error("Download Failed", "Could not fetch the document. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const CHIPS = [
    { lbl:"Tender No.", val:p.tender_no },
    { lbl:"Category",   val:p.category  },
    { lbl:"Portal",     val:p.portal    },
    { lbl:"Est. Value", val:fmt(p.price)},
    { lbl:"Deadline",   val:p.deadline  },
    { lbl:"Days Left",  val:`${Math.abs(dl)} days ${dl <= 0 ? "⚠️ Expired" : dl <= 7 ? "⚠️" : ""}` },
  ];

  const THUMBS = [p.icon, "📄", "📊", "🗺️"];

  return (
    <>
      <div className="container-xl py-4">
        {/* Breadcrumb */}
        <nav className="detail-breadcrumb">
          <a onClick={() => navigate("/")}>Home</a> {" / "}
          <a onClick={() => navigate("/tenders")}>Tenders</a> {" / "}
          <span style={{ color:"#94a3b8" }}>{p.title}</span>
        </nav>

        <div className="row g-4">
          {/* ── Left ── */}
          <div className="col-lg-7">
            <div className="detail-card">
              {/* Main display */}
              <div className="detail-emoji-display">{THUMBS[activeThumb]}</div>

              {/* Thumbs */}
              <div className="d-flex gap-2 mb-4">
                {THUMBS.map((ic, i) => (
                  <div key={i}
                    className={`img-thumb ${activeThumb === i ? "active" : ""}`}
                    onClick={() => setActiveThumb(i)}
                  >{ic}</div>
                ))}
              </div>

              {/* Tags */}
              <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                <span className="detail-portal-tag">{p.portal}</span>
                {p.badge && (
                  <span className={`badge bg-${BADGE_COLOR[p.badge] || "secondary"}`}>{p.badge}</span>
                )}
                <span style={{ fontSize:".78rem", color:"#64748b" }}>{p.category}</span>
              </div>

              <h2 className="detail-title">{p.title}</h2>
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
                <span style={{ fontSize:".85rem", color:"#64748b" }}>
                  {p.rating} ({p.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* ── Right — CTA ── */}
          <div className="col-lg-5">
            <div className="cta-panel">
              <div className="cta-value-label">Estimated Tender Value</div>
              <div className="cta-price">{fmt(p.price)}</div>
              <div className={`cta-status ${dl <= 7 ? "urgent" : "open"}`}>
                {dl <= 0
                  ? "⚠️ This tender has expired"
                  : dl <= 7
                  ? `⚠️ Closing Soon — ${dl} days remaining`
                  : `✅ Open for Bids — ${dl} days remaining`}
              </div>

              {/* Bid input */}
              <div className="cta-bid-input-wrap">
                <div className="cta-bid-input-label">Your Bid Amount (₹)</div>
                <input
                  className="gem-input"
                  type="number"
                  placeholder={`Enter amount up to ${fmt(p.price)}`}
                  value={bidAmount}
                  onChange={e => setBidAmount(e.target.value)}
                />
              </div>

              {/* CTA Buttons */}
              <div className="d-flex flex-column gap-3">

                {/* Place Bid */}
                <button className="btn-primary-gem" onClick={handleBid}>
                  ⚡ Place Bid Now
                </button>

                {/* Watchlist */}
                <button
                  className="btn-outline-gem w-100"
                  style={{ padding:".65rem" }}
                  onClick={handleWatchlist}
                >
                  🔔 Add to Watchlist
                </button>

                {/* Download RFP */}
                <button
                  className={`btn-download-rfp ${downloading ? "loading" : ""}`}
                  onClick={handleDownloadRFP}
                  disabled={downloading}
                >
                  {downloading ? (
                    <>
                      <span className="rfp-spinner" /> Preparing Document...
                    </>
                  ) : (
                    <>📋 Download RFP Document</>
                  )}
                </button>
              </div>

              <hr style={{ borderColor:"#e2e8f0", margin:"20px 0" }} />

              {/* Trust badges */}
              <div style={{ display:"flex", flexDirection:"column", gap:8, fontSize:".83rem", color:"#64748b" }}>
                {[
                  "✅ Verified Government Portal",
                  "🔒 Secure Encrypted Bidding",
                  "📨 Instant Notification on Award",
                  "🏆 24/7 Bid Support Team",
                  "📋 RFP documents sourced from official portals",
                ].map(f => <div key={f}>{f}</div>)}
              </div>

              {/* Login prompt if not authenticated */}
              {!isAuthenticated && (
                <div style={{
                  marginTop:16, background:"#fffbeb", border:"1px solid #fde68a",
                  borderRadius:10, padding:"12px 14px", fontSize:".83rem", color:"#92400e"
                }}>
                  🔐 <strong>Login required</strong> to place bids, save tenders or download RFP documents.{" "}
                  <a style={{ color:"#1a56a0", cursor:"pointer", fontWeight:700 }}
                    onClick={() => navigate("/login")}>Sign in →</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast notifications */}
      <Toast toasts={toasts} remove={remove} />
    </>
  );
}
