import { useState } from "react";
import { Routes, Route, NavLink, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashOverview  from "./subpages/DashOverview";
import DashBids      from "./subpages/DashBids";
import DashWatchlist from "./subpages/DashWatchlist";
import DashAlerts    from "./subpages/DashAlerts";
import DashDocuments from "./subpages/DashDocuments";
import DashBilling   from "./subpages/DashBilling";
import DashSettings  from "./subpages/DashSettings";
import "./Dashboard.css";

const MENU = [
  { to:"",         label:"Overview",   icon:"📊", end:true },
  { to:"bids",     label:"My Bids",    icon:"⚡" },
  { to:"watchlist",label:"Watchlist",  icon:"🔖" },
  { to:"alerts",   label:"Alerts",     icon:"🔔" },
  { to:"documents",label:"Documents",  icon:"📋" },
  { to:"billing",  label:"Billing",    icon:"💳" },
  { to:"settings", label:"Settings",   icon:"⚙️" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="dash-layout">
      {/* ── Sidebar ── */}
      <aside className={`dash-sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="dash-sidebar-top">
          <button className="dash-collapse-btn" onClick={() => setCollapsed(c => !c)}>
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Profile */}
        <div className="dash-profile">
          <div className="dash-avatar">{user?.avatar || "U"}</div>
          {!collapsed && (
            <div className="dash-profile-info">
              <div className="dash-user-name">{user?.name}</div>
              <div className="dash-user-role">{user?.tenant} · Premium</div>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="dash-menu">
          {MENU.map(m => (
            <NavLink key={m.to}
              to={`/dashboard${m.to ? "/"+m.to : ""}`}
              end={m.end}
              className={({ isActive }) => `dash-menu-item${isActive ? " active" : ""}`}>
              <span className="menu-icon">{m.icon}</span>
              {!collapsed && <span className="menu-label">{m.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        {!collapsed && (
          <div className="dash-sidebar-bottom">
            <button className="dash-goto-tenders" onClick={() => navigate("/tenders")}>
              📋 Browse Tenders
            </button>
            <button className="dash-logout-btn" onClick={logout}>
              ← Logout
            </button>
          </div>
        )}
      </aside>

      {/* ── Main ── */}
      <main className="dash-main">
        {/* Mobile tabs */}
        <div className="dash-mobile-tabs d-lg-none">
          {MENU.map(m => (
            <NavLink key={m.to}
              to={`/dashboard${m.to ? "/"+m.to : ""}`}
              end={m.end}
              className={({ isActive }) => `dash-mobile-tab${isActive ? " active" : ""}`}>
              {m.icon} {m.label}
            </NavLink>
          ))}
        </div>

        <Routes>
          <Route index          element={<DashOverview />} />
          <Route path="bids"      element={<DashBids />} />
          <Route path="watchlist" element={<DashWatchlist />} />
          <Route path="alerts"    element={<DashAlerts />} />
          <Route path="documents" element={<DashDocuments />} />
          <Route path="billing"   element={<DashBilling />} />
          <Route path="settings"  element={<DashSettings />} />
          <Route path="*"         element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}
