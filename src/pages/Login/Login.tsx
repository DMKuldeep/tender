import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../Login/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (form.password.length < 4) e.password = "Password required";
    return e;
  };

  const handleSubmit = (role: "user"|"admin") => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      login(role);
      navigate(role === "admin" ? "/admin" : "/dashboard");
    }, 1000);
  };

  const set = (f: string, v: string) => { setForm(x => ({...x,[f]:v})); setErrors(x => ({...x,[f]:""})); };

  return (
    <div className="auth-page">
      <div className="auth-dots" />
      <div className="auth-card fade-up">
        <div className="text-center mb-4">
          <Link to="/" className="auth-logo">Procure<span style={{color:"var(--gem-sky)"}}>Brain</span></Link>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your workspace</p>
        </div>

        <div className="d-flex flex-column gap-3">
          <div>
            <label className="gem-label">Email Address *</label>
            <input className="gem-input" type="email" placeholder="you@company.in"
              value={form.email} onChange={e => set("email", e.target.value)}
              style={{ borderColor: errors.email ? "var(--gem-red)" : undefined }} />
            {errors.email && <div className="auth-field-error">⚠ {errors.email}</div>}
          </div>
          <div>
            <label className="gem-label">Password *</label>
            <input className="gem-input" type="password" placeholder="••••••••"
              value={form.password} onChange={e => set("password", e.target.value)}
              style={{ borderColor: errors.password ? "var(--gem-red)" : undefined }} />
            {errors.password && <div className="auth-field-error">⚠ {errors.password}</div>}
          </div>
          <div className="auth-remember-row">
            <label className="auth-remember-label"><input type="checkbox" style={{ accentColor:"var(--gem-sky)" }} /> Remember me</label>
            <a className="auth-forgot">Forgot Password?</a>
          </div>

          {/* Two login buttons to demo both roles */}
          <button className="btn-primary-gem mt-1" onClick={() => handleSubmit("user")} disabled={loading}>
            {loading ? "⏳ Signing in..." : "Sign In as User →"}
          </button>
          <button className="btn-primary-gem" style={{ background:"linear-gradient(135deg,#dc2626,#ef4444)" }}
            onClick={() => handleSubmit("admin")} disabled={loading}>
            {loading ? "⏳..." : "Sign In as Admin →"}
          </button>
          <p style={{ fontSize:".74rem", color:"#94a3b8", textAlign:"center" }}>
            (Demo: use any email + 4+ char password)
          </p>
        </div>

        <div className="auth-switch">
          Don't have an account? <a onClick={() => navigate("/signup")}>Register Free</a>
        </div>
      </div>
    </div>
  );
}
