import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

interface LoginProps {
  setUser: (v: boolean) => void;
}

export default function Login({ setUser }: LoginProps) {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Enter a valid email address";
    if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser(true);
      navigate("/dashboard");
    }, 1200);
  };

  const set = (field: string, val: string) => {
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: "" }));
  };

  return (
    <div className="auth-page">
      <div className="auth-dots" />
      <div className="auth-card fade-up">
        <div className="text-center mb-4">
          <Link to="/" className="auth-logo">Tender<span>GeM</span></Link>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your Tenant Workspace</p>
        </div>

        <div className="d-flex flex-column gap-3">
          {/* Email */}
          <div>
            <label className="gem-label">Email Address *</label>
            <input
              className="gem-input"
              type="email"
              placeholder="you@company.in"
              value={form.email}
              onChange={e => set("email", e.target.value)}
              style={{ borderColor: errors.email ? "var(--gem-red)" : undefined }}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
            {errors.email && <div className="auth-field-error">⚠ {errors.email}</div>}
          </div>

          {/* Password */}
          <div>
            <label className="gem-label">Password *</label>
            <input
              className="gem-input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => set("password", e.target.value)}
              style={{ borderColor: errors.password ? "var(--gem-red)" : undefined }}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
            {errors.password && <div className="auth-field-error">⚠ {errors.password}</div>}
          </div>

          {/* Remember + Forgot */}
          <div className="auth-remember-row">
            <label className="auth-remember-label">
              <input type="checkbox" style={{ accentColor: "var(--gem-sky)" }} />
              Remember me
            </label>
            <a className="auth-forgot">Forgot Password?</a>
          </div>

          <button
            className="btn-primary-gem mt-1"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "⏳ Signing in..." : "Sign In to Workspace"}
          </button>
        </div>

        <div className="auth-switch">
          Don't have an account?{" "}
          <a onClick={() => navigate("/signup")}>Register Free</a>
        </div>
      </div>
    </div>
  );
}
