import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
  user: boolean;
  setUser: (v: boolean) => void;
}

const NAV_LINKS = [
  { to: "/",          label: "Home",      emoji: "🏠" },
  { to: "/tenders",   label: "Tenders",   emoji: "📋" },
  { to: "/dashboard", label: "Dashboard", emoji: "📊" },
  { to: "/bids",      label: "Bids",      emoji: "⚡" },
  { to: "/reports",   label: "Reports",   emoji: "📈" },
];

export default function Navbar({ user, setUser }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      navigate("/tenders");
      setOpen(false);
    }
  };

  return (
    <nav className="gem-nav">
      <div className="container-xl px-3">

        {/* ── Top Bar ── */}
        <div className="nav-inner">

          {/* Brand */}
          <NavLink to="/" className="nav-brand" onClick={() => setOpen(false)}>
            Procure<span>Brain</span>
          </NavLink>

          {/* Desktop Search */}
          <div className="nav-search-wrap d-none d-md-block">
            <input
              className="gem-search"
              placeholder="🔍  Search tenders..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="d-none d-lg-flex align-items-center gap-1 ms-1">
            {NAV_LINKS.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="nav-actions ms-auto">
            {user ? (
              <>
                <div
                  className="nav-avatar"
                  onClick={() => { navigate("/dashboard"); setOpen(false); }}
                  title="Dashboard"
                >A</div>
                <button
                  className="btn-login-nav d-none d-md-inline-flex"
                  onClick={() => setUser(false)}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn-login-nav d-none d-sm-inline-flex"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn-register-nav"
                  onClick={() => navigate("/signup")}
                >
                  Register
                </button>
              </>
            )}

            {/* Hamburger */}
            <button
              className="btn-hamburger d-lg-none"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {open && (
          <div className="nav-mobile-drawer d-lg-none">
            <input
              className="gem-search"
              placeholder="🔍  Search tenders, categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />

            {NAV_LINKS.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {l.emoji} {l.label}
              </NavLink>
            ))}

            <div className="nav-mobile-divider" />

            {!user ? (
              <div className="nav-mobile-auth">
                <button className="btn-login-nav" onClick={() => { navigate("/login"); setOpen(false); }}>
                  Login
                </button>
                <button className="btn-register-nav" onClick={() => { navigate("/signup"); setOpen(false); }}>
                  Register Free
                </button>
              </div>
            ) : (
              <button
                className="btn-login-nav"
                style={{ width: "100%", marginTop: 4 }}
                onClick={() => { setUser(false); setOpen(false); }}
              >
                Logout
              </button>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}
