import { useNavigate } from "react-router-dom";
import { Product, BADGE_COLOR } from "../../types";
import { fmt, stars, daysLeft } from "../../utils";
import "./TenderCard.css";

interface TenderCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export default function TenderCard({ product: p, viewMode = "grid" }: TenderCardProps) {
  const navigate = useNavigate();
  const dl = daysLeft(p.deadline);

  const handleClick = () => navigate(`/tenders/${p.id}`);

  if (viewMode === "list") {
    return (
      <div className="tender-card tender-card-list" onClick={handleClick}>
        <div className="card-icon">{p.icon}</div>
        <div className="flex-grow-1 min-w-0">
          <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
            <span className="card-portal">{p.portal}</span>
            {p.badge && (
              <span className={`badge bg-${BADGE_COLOR[p.badge] || "secondary"}`} style={{ fontSize: ".72rem" }}>
                {p.badge}
              </span>
            )}
            <span style={{ fontSize: ".76rem", color: "var(--gem-muted)" }}>{p.tender_no}</span>
          </div>
          <div className="card-title mb-1">{p.title}</div>
          <p className="card-desc">{p.desc}</p>
          <div className="d-flex align-items-center gap-4 flex-wrap">
            <div>
              <span style={{ fontSize: ".75rem", color: "var(--gem-muted)" }}>Value: </span>
              <span className="fw-bold" style={{ color: "var(--gem-blue)" }}>{fmt(p.price)}</span>
            </div>
            <div>
              <span style={{ fontSize: ".75rem", color: "var(--gem-muted)" }}>Closes: </span>
              <span className={`fw-bold ${dl <= 7 ? "text-danger" : ""}`}>{dl} days</span>
            </div>
            <div className="rating-stars" style={{ fontSize: ".8rem" }}>{stars(p.rating)}</div>
          </div>
        </div>
        <div className="card-actions">
          <button
            className="btn-bid"
            onClick={e => { e.stopPropagation(); navigate(`/tenders/${p.id}`); }}
          >
            Bid Now
          </button>
          <button
            className="btn-outline-gem"
            onClick={e => e.stopPropagation()}
          >
            Watchlist
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tender-card" onClick={handleClick}>
      {/* Header row */}
      <div className="d-flex align-items-start gap-3 mb-3">
        <div className="card-icon">{p.icon}</div>
        <div className="flex-grow-1 min-w-0">
          <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
            <span className="card-portal">{p.portal}</span>
            {p.badge && (
              <span className={`badge bg-${BADGE_COLOR[p.badge] || "secondary"}`} style={{ fontSize: ".72rem" }}>
                {p.badge}
              </span>
            )}
          </div>
          <div className="card-title">{p.title}</div>
        </div>
      </div>

      {/* Description */}
      <p className="card-desc">{p.desc}</p>

      {/* Value & Deadline */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <div className="card-value-label">Est. Value</div>
          <div className="card-price">{fmt(p.price)}</div>
        </div>
        <div className="text-end">
          <div className="card-deadline-label">Closes In</div>
          <div className={`card-deadline ${dl <= 7 ? "urgent" : ""}`}>
            {dl}d {dl <= 7 ? "⚠️" : ""}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <div>
          <div className="rating-stars">{stars(p.rating)}</div>
          <div className="card-reviews">{p.reviews} reviews</div>
        </div>
        <button
          className="btn-bid"
          onClick={e => { e.stopPropagation(); navigate(`/tenders/${p.id}`); }}
        >
          Place Bid
        </button>
      </div>
    </div>
  );
}
