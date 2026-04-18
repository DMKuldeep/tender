import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminOverview  from "./subpages/AdminOverview";
import AdminTenants   from "./subpages/AdminTenants";
import AdminUsers     from "./subpages/AdminUsers";
import AdminTenders   from "./subpages/AdminTenders";
import AdminAnalytics from "./subpages/AdminAnalytics";
import "./Admin.css";

const MENU = [
  { to:"",          label:"Overview",   icon:"📊", end:true  },
  { to:"tenants",   label:"Tenants",    icon:"🏢" },
  { to:"users",     label:"Users",      icon:"👥" },
  { to:"tenders",   label:"Tenders",    icon:"📋" },
  { to:"analytics", label:"Analytics",  icon:"📈" },
];

export default function Admin() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span style={{fontWeight:800,color:"#fff",fontSize:"1rem",fontFamily:"Inter,sans-serif"}}>Procure<span style={{color:"#ef4444"}}>Brain</span></span>
          <span style={{fontSize:".7rem",color:"rgba(255,255,255,.4)",marginTop:2,display:"block"}}>Admin Panel</span>
        </div>

        <div className="admin-profile">
          <div className="admin-avatar">{user?.avatar}</div>
          <div>
            <div style={{color:"#fff",fontWeight:700,fontSize:".85rem"}}>{user?.name}</div>
            <div style={{color:"rgba(255,255,255,.4)",fontSize:".72rem"}}>Super Admin</div>
          </div>
        </div>

        <nav className="admin-menu">
          {MENU.map(m => (
            <NavLink key={m.to} to={`/admin${m.to ? "/"+m.to : ""}`} end={m.end}
              className={({ isActive }) => `admin-menu-item${isActive ? " active" : ""}`}>
              <span>{m.icon}</span> {m.label}
            </NavLink>
          ))}
        </nav>

        <button className="admin-logout" onClick={logout}>← Logout</button>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Top bar */}
        <div className="admin-topbar">
          <div style={{fontSize:".88rem",color:"#64748b"}}>
            Admin Panel · <span style={{color:"#0f172a",fontWeight:600}}>ProcureBrain Platform</span>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{background:"#fef2f2",color:"#dc2626",border:"1px solid #fecaca",borderRadius:50,padding:"3px 12px",fontSize:".74rem",fontWeight:700}}>ADMIN</span>
          </div>
        </div>

        <Routes>
          <Route index            element={<AdminOverview />} />
          <Route path="tenants"   element={<AdminTenants />} />
          <Route path="users"     element={<AdminUsers />} />
          <Route path="tenders"   element={<AdminTenders />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="*"         element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  );
}
