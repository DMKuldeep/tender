import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../Login/Login.css";
import "./Signup.css";

export default function Signup() {
  const navigate  = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name:"", company:"", email:"", password:"", confirm:"" });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim()) e.name = "Full name required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { login("user"); navigate("/dashboard"); }, 1200);
  };

  const set = (f: string, v: string) => {
    setForm(x => ({...x,[f]:v}));
    setErrors(x => ({...x,[f]:""}));
  };

  return (
    <div className="signup-page">

      {/* ── Header ── */}
      <header className="gmail-header">
        <Link to="/" className="gmail-header-brand">
          Procure<span>Brain</span>
        </Link>
        <div className="gmail-header-right">
          <button className="gmail-header-help" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </header>

      {/* ── Two-column layout on desktop ── */}
      <main className="signup-main">

        {/* Left panel — branding */}
        <div className="signup-left">
          <div className="signup-left-inner">
            <div className="signup-left-logo">
              Procure<span>Brain</span>
            </div>
            <h2 className="signup-left-title">
              India's Smartest<br />Tender Platform
            </h2>
            <p className="signup-left-sub">
              Join 18,000+ procurement professionals who discover, bid, and win government tenders every day.
            </p>
            <div className="signup-benefits-list">
              {[
                { icon:"📋", title:"2.4L+ Live Tenders",    sub:"From GeM, CPPP, IREPS & more" },
                { icon:"🔔", title:"Smart Alert System",     sub:"Instant notifications on matches" },
                { icon:"🏢", title:"Multi-Tenant Workspace", sub:"Isolated data per company" },
                { icon:"📊", title:"Analytics & Reports",    sub:"Win rate, bid history & insights" },
              ].map(b => (
                <div key={b.title} className="signup-benefit-row">
                  <div className="signup-benefit-icon">{b.icon}</div>
                  <div>
                    <div className="signup-benefit-title">{b.title}</div>
                    <div className="signup-benefit-sub">{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="signup-right">
          <div className="signup-form-card">

            <h1 className="signup-form-title">Create Account</h1>
            <p className="signup-form-sub">
              Already have an account?{" "}
              <button className="signup-signin-link" onClick={() => navigate("/login")}>
                Sign in
              </button>
            </p>

            <div className="signup-form-fields">

              {/* Row 1 — Name + Company */}
              <div className="signup-field-row">
                <div className="signup-field">
                  <label className="gmail-form-label">Full Name *</label>
                  <input className={`gmail-input-flat ${errors.name?"error":""}`}
                    placeholder="Arjun Sharma" value={form.name}
                    onChange={e => set("name", e.target.value)} />
                  {errors.name && <div className="gmail-error-text">⚠ {errors.name}</div>}
                </div>
                <div className="signup-field">
                  <label className="gmail-form-label">Company</label>
                  <input className="gmail-input-flat" placeholder="Acme Ltd."
                    value={form.company} onChange={e => set("company", e.target.value)} />
                </div>
              </div>

              {/* Row 2 — Email full width */}
              <div className="signup-field">
                <label className="gmail-form-label">Work Email *</label>
                <input className={`gmail-input-flat ${errors.email?"error":""}`}
                  type="email" placeholder="you@company.in" value={form.email}
                  onChange={e => set("email", e.target.value)} />
                {errors.email && <div className="gmail-error-text">⚠ {errors.email}</div>}
              </div>

              {/* Row 3 — Password + Confirm */}
              <div className="signup-field-row">
                <div className="signup-field">
                  <label className="gmail-form-label">Password *</label>
                  <input className={`gmail-input-flat ${errors.password?"error":""}`}
                    type="password" placeholder="Min 6 chars" value={form.password}
                    onChange={e => set("password", e.target.value)} />
                  {errors.password && <div className="gmail-error-text">⚠ {errors.password}</div>}
                </div>
                <div className="signup-field">
                  <label className="gmail-form-label">Confirm Password *</label>
                  <input className={`gmail-input-flat ${errors.confirm?"error":""}`}
                    type="password" placeholder="Repeat password" value={form.confirm}
                    onChange={e => set("confirm", e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()} />
                  {errors.confirm && <div className="gmail-error-text">⚠ {errors.confirm}</div>}
                </div>
              </div>

              {/* Submit */}
              <button className="signup-submit-btn"
                onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating account..." : "Create Free Account →"}
              </button>

              <p className="signup-terms-text">
                By registering you agree to our{" "}
                <a>Terms of Service</a> and <a>Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="gmail-footer">
        <div className="gmail-footer-lang">🌐 English (India) ▾</div>
        <div className="gmail-footer-links">
          <button className="gmail-footer-link">Privacy Policy</button>
          <button className="gmail-footer-link">Terms of Service</button>
          <button className="gmail-footer-link">Help</button>
          <button className="gmail-footer-link" onClick={() => navigate("/")}>ProcureBrain</button>
        </div>
      </footer>

    </div>
  );
}