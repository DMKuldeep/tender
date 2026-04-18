import { useState } from "react";
import { DashTab } from "../../types";
import "./Dashboard.css";

const MENU = [
  { id: "orders",   icon: "📦", label: "My Orders" },
  { id: "bids",     icon: "⚡", label: "Active Bids" },
  { id: "profile",  icon: "👤", label: "Profile" },
  { id: "alerts",   icon: "🔔", label: "Alerts" },
  { id: "reports",  icon: "📊", label: "Reports" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

const ORDERS = [
  { id: "ORD-2025-001", tender: "Road Construction Materials", value: "₹2.45 Cr", status: "Active",  date: "2025-04-01" },
  { id: "ORD-2025-002", tender: "Medical Equipment Supply",    value: "₹87.5 L",  status: "Won",     date: "2025-03-22" },
  { id: "ORD-2025-003", tender: "IT Hardware Procurement",     value: "₹32 L",    status: "Pending", date: "2025-04-10" },
  { id: "ORD-2025-004", tender: "School Furniture Supply",     value: "₹18.5 L",  status: "Lost",    date: "2025-03-15" },
  { id: "ORD-2025-005", tender: "Water Treatment Plant",       value: "₹6.7 Cr",  status: "Active",  date: "2025-04-05" },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Active:  { bg: "#dcfce7", color: "#166534" },
  Won:     { bg: "#dbeafe", color: "#1e40af" },
  Pending: { bg: "#fef9c3", color: "#854d0e" },
  Lost:    { bg: "#fee2e2", color: "#991b1b" },
};

const STATS = [
  { lbl: "Active Bids",  num: "12",     icon: "⚡", bg: "#dbeafe", c: "#1d4ed8" },
  { lbl: "Bids Won",     num: "8",      icon: "🏆", bg: "#dcfce7", c: "#15803d" },
  { lbl: "Total Value",  num: "₹4.2 Cr",icon: "💰", bg: "#fef9c3", c: "#b45309" },
  { lbl: "Win Rate",     num: "67%",    icon: "📈", bg: "#f3e8ff", c: "#7c3aed" },
];

const PROFILE_FIELDS: [string, string][] = [
  ["Full Name",    "Arjun Sharma"],
  ["Email",        "arjun@acmecorp.in"],
  ["Phone",        "+91 98765 43210"],
  ["Company",      "Acme Infrastructure Ltd."],
  ["GST No.",      "27AABCU9603R1ZX"],
];

export default function Dashboard() {
  const [tab, setTab] = useState<DashTab>("orders");

  return (
    <div className="dash-layout">
      {/* ── Desktop Sidebar ── */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-profile">
          <div className="dash-avatar">A</div>
          <div className="dash-user-name">Arjun Sharma</div>
          <div className="dash-user-role">Tenant A · Premium</div>
        </div>
        {MENU.map(m => (
          <button
            key={m.id}
            className={`dash-menu-item ${tab === m.id ? "active" : ""}`}
            onClick={() => setTab(m.id as DashTab)}
          >
            <span className="menu-icon">{m.icon}</span>
            {m.label}
          </button>
        ))}
      </aside>

      {/* ── Main ── */}
      <main className="dash-main">
        {/* Mobile Tab Bar */}
        <div className="dash-mobile-tabs d-lg-none">
          {MENU.map(m => (
            <button
              key={m.id}
              className={`dash-mobile-tab ${tab === m.id ? "active" : ""}`}
              onClick={() => setTab(m.id as DashTab)}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        {/* ── Stats Row ── */}
        <div className="row g-3 mb-4">
          {STATS.map(s => (
            <div key={s.lbl} className="col-6 col-xl-3">
              <div className="stat-card">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="stat-label">{s.lbl}</span>
                  <div className="stat-icon" style={{ background: s.bg }}>
                    <span style={{ color: s.c }}>{s.icon}</span>
                  </div>
                </div>
                <div className="stat-num" style={{ color: s.c }}>{s.num}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Orders / Bids Table ── */}
        {(tab === "orders" || tab === "bids") && (
          <div className="gem-table">
            <div className="gem-table-header">
              <span className="gem-table-title">
                {tab === "orders" ? "My Orders" : "Active Bids"}
              </span>
              <button className="btn-bid" style={{ fontSize: ".8rem", padding: ".4rem .9rem" }}>
                + New Bid
              </button>
            </div>
            <div className="gem-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Tender</th>
                    <th>Value</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ORDERS.map(o => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 600, fontSize: ".82rem", color: "var(--gem-sky)" }}>
                        {o.id}
                      </td>
                      <td style={{ fontWeight: 500 }}>{o.tender}</td>
                      <td style={{ fontWeight: 700, color: "var(--gem-blue)" }}>{o.value}</td>
                      <td style={{ color: "var(--gem-muted)", fontSize: ".83rem" }}>{o.date}</td>
                      <td>
                        <span
                          className="status-pill"
                          style={{
                            background: STATUS_STYLE[o.status]?.bg,
                            color:      STATUS_STYLE[o.status]?.color,
                          }}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-outline-gem" style={{ fontSize: ".78rem", padding: ".3rem .7rem" }}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="gem-pagination">
              <span style={{ fontSize: ".82rem", color: "var(--gem-muted)" }}>
                Showing 1–5 of 28
              </span>
              <div className="d-flex gap-1">
                {[1, 2, 3, "…", 6].map((n, i) => (
                  <button key={i} className={`page-btn ${n === 1 ? "active" : ""}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Profile ── */}
        {tab === "profile" && (
          <div className="row g-4">
            {/* Personal info */}
            <div className="col-md-6">
              <div className="profile-card">
                <h5 className="profile-card-title">Personal Information</h5>
                <div className="d-flex flex-column gap-3">
                  {PROFILE_FIELDS.map(([l, v]) => (
                    <div key={l}>
                      <label className="gem-label">{l}</label>
                      <input className="gem-input" defaultValue={v} />
                    </div>
                  ))}
                </div>
                <button
                  className="btn-primary-gem mt-4"
                  style={{ width: "auto", padding: ".6rem 1.8rem" }}
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Tenant workspace */}
            <div className="col-md-6">
              <div className="profile-card">
                <h5 className="profile-card-title">Tenant Workspace (A)</h5>
                <div
                  style={{
                    background: "var(--gem-light)",
                    borderRadius: 12,
                    padding: 20,
                    marginBottom: 16,
                  }}
                >
                  {[
                    ["Plan",    "Premium Annual",  "var(--gem-teal)"],
                    ["Users",   "3 / 10",          "var(--gem-text)"],
                    ["Renews",  "Dec 31, 2025",     "var(--gem-text)"],
                  ].map(([l, v, c]) => (
                    <div className="workspace-row" key={l}>
                      <span style={{ color: "var(--gem-muted)", fontSize: ".87rem" }}>{l}</span>
                      <span style={{ fontWeight: 700, color: c, fontSize: ".87rem" }}>{v}</span>
                    </div>
                  ))}
                </div>
                {["Users & Roles", "Alerts & Watchlists", "Custom Reports", "Bid Documents"].map(f => (
                  <div key={f} className="workspace-row">
                    <span style={{ fontSize: ".88rem" }}>✅ {f}</span>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--gem-sky)",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: ".82rem",
                        fontFamily: "inherit",
                      }}
                    >
                      Manage →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Placeholder tabs ── */}
        {(tab === "alerts" || tab === "reports" || tab === "settings") && (
          <div
            style={{
              background: "#fff",
              border: "1.5px solid var(--gem-border)",
              borderRadius: "var(--gem-radius)",
              padding: 48,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>
              {MENU.find(m => m.id === tab)?.icon}
            </div>
            <h4 style={{ color: "var(--gem-navy)", fontWeight: 700 }}>
              {MENU.find(m => m.id === tab)?.label}
            </h4>
            <p style={{ color: "var(--gem-muted)" }}>This section is coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}
