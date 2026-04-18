import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../Login/Login.css";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name:"", company:"", email:"", password:"", confirm:"" });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim())   e.name = "Full name required";
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

  const set = (f: string, v: string) => { setForm(x => ({...x,[f]:v})); setErrors(x => ({...x,[f]:""})); };

  return (
    <div className="auth-page">
      <div className="auth-dots" />
      <div className="auth-card fade-up" style={{ maxWidth:520 }}>
        <div className="text-center mb-4">
          <Link to="/" className="auth-logo">Procure<span style={{color:"var(--gem-sky)"}}>Brain</span></Link>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join India's smartest tender platform</p>
        </div>
        <div className="signup-benefits mb-3">
          {["✅ Access 2.4L+ live tenders","✅ Multi-portal sync","✅ Smart alerts","✅ Secure workspace"].map(b=>(
            <div key={b} className="signup-benefit-item">{b}</div>
          ))}
        </div>
        <div className="d-flex flex-column gap-3">
          <div><label className="gem-label">Full Name *</label>
            <input className="gem-input" placeholder="Arjun Sharma" value={form.name}
              onChange={e=>set("name",e.target.value)} style={{borderColor:errors.name?"var(--gem-red)":undefined}} />
            {errors.name && <div className="auth-field-error">⚠ {errors.name}</div>}
          </div>
          <div><label className="gem-label">Company</label>
            <input className="gem-input" placeholder="Acme Ltd." value={form.company} onChange={e=>set("company",e.target.value)} />
          </div>
          <div><label className="gem-label">Work Email *</label>
            <input className="gem-input" type="email" placeholder="you@company.in" value={form.email}
              onChange={e=>set("email",e.target.value)} style={{borderColor:errors.email?"var(--gem-red)":undefined}} />
            {errors.email && <div className="auth-field-error">⚠ {errors.email}</div>}
          </div>
          <div className="row g-3">
            <div className="col-6"><label className="gem-label">Password *</label>
              <input className="gem-input" type="password" placeholder="Min 6 chars" value={form.password}
                onChange={e=>set("password",e.target.value)} style={{borderColor:errors.password?"var(--gem-red)":undefined}} />
              {errors.password && <div className="auth-field-error">⚠ {errors.password}</div>}
            </div>
            <div className="col-6"><label className="gem-label">Confirm *</label>
              <input className="gem-input" type="password" placeholder="Repeat" value={form.confirm}
                onChange={e=>set("confirm",e.target.value)} style={{borderColor:errors.confirm?"var(--gem-red)":undefined}} />
              {errors.confirm && <div className="auth-field-error">⚠ {errors.confirm}</div>}
            </div>
          </div>
          <button className="btn-primary-gem mt-1" onClick={handleSubmit} disabled={loading}>
            {loading ? "⏳ Creating..." : "Create Free Account →"}
          </button>
          <p className="signup-terms">By registering you agree to our <a>Terms</a> and <a>Privacy Policy</a>.</p>
        </div>
        <div className="auth-switch">Already have an account? <a onClick={()=>navigate("/login")}>Sign In</a></div>
      </div>
    </div>
  );
}
