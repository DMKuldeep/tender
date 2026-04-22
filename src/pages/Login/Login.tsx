// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import "../Login/Login.css";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [form, setForm]     = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState<Record<string,string>>({});
//   const [loading, setLoading] = useState(false);

//   const validate = () => {
//     const e: Record<string,string> = {};
//     if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
//     if (form.password.length < 4) e.password = "Password required";
//     return e;
//   };

//   const handleSubmit = (role: "user"|"admin") => {
//     const e = validate();
//     if (Object.keys(e).length) { setErrors(e); return; }
//     setLoading(true);
//     setTimeout(() => {
//       login(role);
//       navigate(role === "admin" ? "/admin" : "/dashboard");
//     }, 1000);
//   };

//   const set = (f: string, v: string) => { setForm(x => ({...x,[f]:v})); setErrors(x => ({...x,[f]:""})); };

//   return (
//     <div className="auth-page">
//       <div className="auth-dots" />
//       <div className="auth-card fade-up">
//         <div className="text-center mb-4">
//           <Link to="/" className="auth-logo">Procure<span style={{color:"var(--gem-sky)"}}>Brain</span></Link>
//           <h2 className="auth-title">Welcome Back</h2>
//           <p className="auth-subtitle">Sign in to your workspace</p>
//         </div>

//         <div className="d-flex flex-column gap-3">
//           <div>
//             <label className="gem-label">Email Address *</label>
//             <input className="gem-input" type="email" placeholder="you@company.in"
//               value={form.email} onChange={e => set("email", e.target.value)}
//               style={{ borderColor: errors.email ? "var(--gem-red)" : undefined }} />
//             {errors.email && <div className="auth-field-error">⚠ {errors.email}</div>}
//           </div>
//           <div>
//             <label className="gem-label">Password *</label>
//             <input className="gem-input" type="password" placeholder="••••••••"
//               value={form.password} onChange={e => set("password", e.target.value)}
//               style={{ borderColor: errors.password ? "var(--gem-red)" : undefined }} />
//             {errors.password && <div className="auth-field-error">⚠ {errors.password}</div>}
//           </div>
//           <div className="auth-remember-row">
//             <label className="auth-remember-label"><input type="checkbox" style={{ accentColor:"var(--gem-sky)" }} /> Remember me</label>
//             <a className="auth-forgot">Forgot Password?</a>
//           </div>

//           {/* Two login buttons to demo both roles */}
//           <button className="btn-primary-gem mt-1" onClick={() => handleSubmit("user")} disabled={loading}>
//             {loading ? "⏳ Signing in..." : "Sign In as User →"}
//           </button>
//           <button className="btn-primary-gem" style={{ background:"linear-gradient(135deg,#dc2626,#ef4444)" }}
//             onClick={() => handleSubmit("admin")} disabled={loading}>
//             {loading ? "⏳..." : "Sign In as Admin →"}
//           </button>
//           <p style={{ fontSize:".74rem", color:"#94a3b8", textAlign:"center" }}>
//             (Demo: use any email + 4+ char password)
//           </p>
//         </div>

//         <div className="auth-switch">
//           Don't have an account? <a onClick={() => navigate("/signup")}>Register Free</a>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

type Step = "email" | "password";

export default function Login() {
  const navigate     = useNavigate();
  const { login }    = useAuth();

  const [step, setStep]         = useState<Step>("email");
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwFocus, setPwFocus]   = useState(false);
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [loading, setLoading]   = useState(false);

  /* ── Validate email ── */
  const validateEmail = () => {
    if (!email.trim()) return "Enter an email address";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Enter a valid email address";
    return "";
  };

  /* ── Step 1: Next ── */
  const handleEmailNext = () => {
    const err = validateEmail();
    if (err) { setErrors({ email: err }); return; }
    setErrors({});
    setDirection("right");
    setStep("password");
  };

  /* ── Step 2: Sign in ── */
  const handleSignIn = (role: "user" | "admin" = "user") => {
    if (password.length < 4) {
      setErrors({ password: "Wrong password. Try again or click Forgot password." });
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      login(role);
      navigate(role === "admin" ? "/admin" : "/dashboard");
    }, 1000);
  };

  /* ── Go back to email step ── */
  const handleBack = () => {
    setDirection("left");
    setErrors({});
    setPassword("");
    setStep("email");
  };

  const initials = email ? email[0].toUpperCase() : "U";

  return (
    <div className="gmail-page">

      {/* ── Header ── */}
      <header className="gmail-header">
        <Link to="/" className="gmail-header-brand">
          Procure<span>Brain</span>
        </Link>
        <div className="gmail-header-right">
          <button className="gmail-header-help" onClick={() => navigate("/")}>
            Help
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="gmail-main">
        <div className={`gmail-card ${direction === "right" ? "slide-in-right" : "slide-in-left"}`} key={step}>

          {/* Step dots */}
          <div className="gmail-steps">
            <div className={`gmail-step-dot ${step === "email" ? "active" : ""}`} />
            <div className={`gmail-step-dot ${step === "password" ? "active" : ""}`} />
          </div>

          {/* Logo */}
          <Link to="/" className="gmail-card-logo">Procure<span>Brain</span></Link>

          {/* ══════════ STEP 1 — EMAIL ══════════ */}
          {step === "email" && (
            <>
              <h1 className="gmail-card-title">Sign in</h1>
              <p className="gmail-card-subtitle">
                to continue to <strong>ProcureBrain</strong>
              </p>

              {/* Email input */}
              <div className="gmail-input-wrap">
                <label
                  className={`gmail-input-label ${emailFocus || email ? "raised" : ""} ${errors.email ? "error-label" : ""}`}
                >
                  Email address
                </label>
                <input
                  className={`gmail-input ${errors.email ? "error" : ""}`}
                  type="email"
                  value={email}
                  autoFocus
                  onChange={e => { setEmail(e.target.value); setErrors({}); }}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  onKeyDown={e => e.key === "Enter" && handleEmailNext()}
                />
                {errors.email && (
                  <div className="gmail-error-text">⚠ {errors.email}</div>
                )}
              </div>

              <p className="gmail-info-text">
                Not your computer? Use a Private Window to sign in.{" "}
                <a>Learn more about using Guest mode</a>
              </p>

              <div className="gmail-btn-row">
                <button
                  className="gmail-create-account"
                  onClick={() => navigate("/signup")}
                >
                  Create account
                </button>
                <button className="gmail-btn-primary" onClick={handleEmailNext}>
                  Next
                </button>
              </div>
            </>
          )}

          {/* ══════════ STEP 2 — PASSWORD ══════════ */}
          {step === "password" && (
            <>
              <h1 className="gmail-card-title">Welcome</h1>

              {/* Email chip — click to go back */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <div className="gmail-email-chip" onClick={handleBack}>
                  <div className="gmail-email-chip-avatar">{initials}</div>
                  {email}
                  <span style={{ marginLeft: 2, color: "#5f6368", fontSize: ".9rem" }}>▾</span>
                </div>
              </div>

              {/* Password input */}
              <div className="gmail-input-wrap">
                <label
                  className={`gmail-input-label ${pwFocus || password ? "raised" : ""} ${errors.password ? "error-label" : ""}`}
                >
                  Enter your password
                </label>
                <input
                  className={`gmail-input ${errors.password ? "error" : ""}`}
                  type={showPw ? "text" : "password"}
                  value={password}
                  autoFocus
                  onChange={e => { setPassword(e.target.value); setErrors({}); }}
                  onFocus={() => setPwFocus(true)}
                  onBlur={() => setPwFocus(false)}
                  onKeyDown={e => e.key === "Enter" && handleSignIn("user")}
                />
                <button
                  className="gmail-pw-toggle"
                  type="button"
                  onClick={() => setShowPw(s => !s)}
                  tabIndex={-1}
                >
                  {showPw ? "🙈" : "👁️"}
                </button>
                {errors.password && (
                  <div className="gmail-error-text">⚠ {errors.password}</div>
                )}
              </div>

              <a className="gmail-forgot">Forgot password?</a>

              {/* Demo note */}
              <p className="gmail-info-text" style={{ marginBottom: 16 }}>
                Demo: use any 4+ character password. Choose your role below.
              </p>

              <div className="gmail-btn-row">
                <button className="gmail-btn-secondary" onClick={handleBack}>
                  Back
                </button>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="gmail-btn-admin"
                    onClick={() => handleSignIn("admin")}
                    disabled={loading}
                    title="Sign in as Platform Admin"
                  >
                    {loading ? "..." : "Admin →"}
                  </button>
                  <button
                    className="gmail-btn-primary"
                    onClick={() => handleSignIn("user")}
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="gmail-footer">
        <div className="gmail-footer-lang">
          🌐 English (India) ▾
        </div>
        <div className="gmail-footer-links">
          <button className="gmail-footer-link">Privacy Policy</button>
          <button className="gmail-footer-link">Terms of Service</button>
          <button className="gmail-footer-link">Help</button>
          <button className="gmail-footer-link" onClick={() => navigate("/")}>
            ProcureBrain
          </button>
        </div>
      </footer>

    </div>
  );
}
