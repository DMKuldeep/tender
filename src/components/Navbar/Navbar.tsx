import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationBell from "../NotificationBell/NotificationBell";
import "./Navbar.css";

interface NavbarProps {
  user: boolean;
  userRole?: string;
  userName?: string;
  setUser: () => void;
}

const PUBLIC_LINKS = [
  { to: "/",        label: "Home",    end: true  },
  { to: "/tenders", label: "Tenders", end: false },
  { to: "/pricing", label: "Pricing", end: false },
];
const USER_LINKS = [
  { to: "/",              label: "Home",      end: true  },
  { to: "/tenders",       label: "Tenders",   end: false },
  { to: "/dashboard",     label: "Dashboard", end: false },
];
const ADMIN_LINKS = [
  { to: "/admin",              label: "Overview",  end: true  },
  { to: "/admin/tenants",      label: "Tenants",   end: false },
  { to: "/admin/users",        label: "Users",     end: false },
  { to: "/admin/tenders",      label: "Tenders",   end: false },
  { to: "/admin/analytics",    label: "Analytics", end: false },
];

export default function Navbar({ user, userRole, userName, setUser }: NavbarProps) {
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const links = !user ? PUBLIC_LINKS : userRole === "admin" ? ADMIN_LINKS : USER_LINKS;
  const initials = userName ? userName.split(" ").map(w => w[0]).join("").slice(0,2) : "U";

  const goSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.trim()) { navigate("/tenders"); setOpen(false); }
  };

  return (
    <nav className="gem-nav">
      <div className="container-xl px-3">
        <div className="nav-inner">

          {/* Brand */}
          <NavLink to={userRole === "admin" ? "/admin" : "/"} className="nav-brand" onClick={() => setOpen(false)}>
            Procure<span>Brain</span>
          </NavLink>

          {/* Desktop Links */}
          <div className="d-none d-lg-flex align-items-center gap-1 ms-2">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.end}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Search — hide on admin */}
          {userRole !== "admin" && (
            <div className="nav-search-wrap d-none d-md-block ms-2">
              <input className="gem-search" placeholder="🔍  Search tenders..."
                value={search} onChange={e => setSearch(e.target.value)} onKeyDown={goSearch} />
            </div>
          )}

          {/* Actions */}
          <div className="nav-actions ms-auto">
            {user ? (
              <>
                {userRole !== "admin" && <NotificationBell />}
                {userRole === "admin" && (
                  <span className="nav-admin-badge">Admin</span>
                )}
                <div className="nav-avatar" style={{ background: userRole === "admin" ? "#ef4444" : "var(--gem-sky)" }}
                  onClick={() => { navigate(userRole === "admin" ? "/admin" : "/dashboard"); setOpen(false); }}
                  title={userName}>
                  {initials}
                </div>
                <button className="btn-login-nav d-none d-md-inline-flex" onClick={setUser}>Logout</button>
              </>
            ) : (
              <>
                <button className="btn-login-nav d-none d-sm-inline-flex" onClick={() => navigate("/login")}>Log in</button>
                <button className="btn-register-nav" onClick={() => navigate("/signup")}>Get Started Free →</button>
              </>
            )}
            <button className="btn-hamburger d-lg-none" onClick={() => setOpen(o => !o)}>{open ? "✕" : "☰"}</button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <div className="nav-mobile-drawer d-lg-none">
            {userRole !== "admin" && (
              <input className="gem-search" placeholder="🔍  Search tenders..."
                value={search} onChange={e => setSearch(e.target.value)} onKeyDown={goSearch} />
            )}
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.end}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <div className="nav-mobile-divider" />
            {!user ? (
              <div className="nav-mobile-auth">
                <button className="btn-login-nav" onClick={() => { navigate("/login"); setOpen(false); }}>Log in</button>
                <button className="btn-register-nav" onClick={() => { navigate("/signup"); setOpen(false); }}>Get Started</button>
              </div>
            ) : (
              <button className="btn-login-nav" style={{ width:"100%", marginTop:4 }}
                onClick={() => { setUser(); setOpen(false); }}>Logout</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
