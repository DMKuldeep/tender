import { useNavigate } from "react-router-dom";
import "./Footer.css";

const FOOTER_COLS = [
  {
    title: "Platform",
    links: ["Browse Tenders", "GeM Portal", "CPPP Integration", "Bid Management", "Analytics"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press & Media", "Partners", "Contact"],
  },
  {
    title: "Support",
    links: ["Help Center", "API Docs", "Privacy Policy", "Terms of Service", "Refund Policy"],
  },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="gem-footer">
      <div className="container-xl py-5">
        <div className="row g-4">

          {/* Brand + description */}
          <div className="col-md-4">
            <div
              className="footer-brand mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Tender<span style={{ color: "var(--gem-amber)" }}>GeM</span>
            </div>
            <p style={{ fontSize: ".87rem", lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              India's most comprehensive multi-tenant tender intelligence platform. Track, bid, and win
              government contracts seamlessly.
            </p>
            <div className="d-flex gap-2">
              {["𝕏", "in", "f", "📧"].map(s => (
                <button key={s} className="footer-social-btn">{s}</button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title} className="col-6 col-md-2">
              <div className="footer-col-title">{col.title}</div>
              {col.links.map(l => (
                <button key={l} className="footer-link">{l}</button>
              ))}
            </div>
          ))}

          {/* Contact */}
          <div className="col-md-2">
            <div className="footer-col-title">Contact</div>
            <div className="footer-contact-info">
              <div>📞 1800-XXX-XXXX</div>
              <div>📧 support@tendergem.in</div>
              <div>🏢 New Delhi, India</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom py-3">
        <div className="container-xl d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span>© 2025 TenderGeM. All rights reserved. Government of India compliant platform.</span>
          <div className="d-flex gap-3">
            {["Privacy", "Terms", "Cookies"].map(l => (
              <button key={l} className="footer-link" style={{ marginBottom: 0 }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
