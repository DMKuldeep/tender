import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pricing.css";

const PLANS = [
  {
    name:"Starter", desc:"Perfect for small teams exploring government tenders.",
    monthly:"₹799", annual:"₹799", color:"#e2e8f0", featured:false,
    features:[
      {t:"5 team members",          ok:true},
      {t:"100 tender alerts/month", ok:true},
      {t:"2 portal connections",    ok:true},
      {t:"Basic bid tracking",      ok:true},
      {t:"Email support",           ok:true},
      {t:"Custom reports",          ok:false},
      {t:"API access",              ok:false},
      {t:"Dedicated manager",       ok:false},
    ],
    cta:"Get Started",
  },
  {
    name:"Premium", desc:"For growing procurement teams managing multiple tenders.", 
    monthly:"₹2,999", annual:"₹2,999", color:"#2f80ed", featured:true,
    features:[
      {t:"25 team members",          ok:true},
      {t:"Unlimited tender alerts",  ok:true},
      {t:"All portal connections",   ok:true},
      {t:"Advanced bid analytics",   ok:true},
      {t:"Priority support",         ok:true},
      {t:"Custom reports",           ok:true},
      {t:"API access",               ok:false},
      {t:"Dedicated manager",        ok:false},
    ],
    cta:"Start Free Trial",
  },
  {
    name:"Enterprise", desc:"Full-scale platform for large procurement operations.",
    monthly:"Custom", annual:"Custom", color:"#0f172a", featured:false,
    features:[
      {t:"Unlimited users",          ok:true},
      {t:"Unlimited alerts",         ok:true},
      {t:"All portals + custom",     ok:true},
      {t:"White-label option",       ok:true},
      {t:"24/7 dedicated support",   ok:true},
      {t:"Custom reports & BI",      ok:true},
      {t:"Full API access",          ok:true},
      {t:"Dedicated account manager",ok:true},
    ],
    cta:"Contact Sales",
  },
];

const FAQS = [
  { q:"Can I switch plans at any time?",           a:"Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle." },
  { q:"Is there a free trial?",                    a:"Yes! The Premium plan comes with a 14-day free trial. No credit card required to start." },
  { q:"What portals are supported?",               a:"We currently support GeM, CPPP, IREPS, DPSU, and all major state portals. New portals are added regularly." },
  { q:"How does multi-tenant isolation work?",     a:"Each company gets a completely isolated workspace — separate users, bids, documents and data. No data is shared between tenants." },
  { q:"Can I add more users to my plan?",          a:"Yes. On Starter and Premium, you can add user packs. On Enterprise, you get unlimited users included." },
  { q:"What payment methods are accepted?",        a:"We accept all major credit/debit cards, UPI, NEFT, and corporate invoicing for Enterprise plans." },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number|null>(null);

  return (
    <>
      {/* Hero */}
      <section className="pricing-hero">
        <div className="container-xl">
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#f0f9ff",border:"1px solid #bae6fd",borderRadius:50,padding:"5px 14px",fontSize:".78rem",fontWeight:600,color:"#0284c7",marginBottom:16}}>
            💎 Simple, transparent pricing
          </div>
          <h1 style={{fontFamily:"Inter,sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,4vw,3rem)",color:"#0f172a",letterSpacing:"-1px",marginBottom:12}}>
            Choose your plan
          </h1>
          <p style={{color:"#64748b",fontSize:"1rem",maxWidth:480,margin:"0 auto 32px",lineHeight:1.7}}>
            Start free, scale as you grow. All plans include a 14-day free trial — no credit card needed.
          </p>

          {/* Annual toggle */}
          <div className="pricing-toggle-wrap">
            <button className={`pricing-toggle-btn${!annual?" active":""}`} onClick={()=>setAnnual(false)}>Half-Yearly</button>
            <button className={`pricing-toggle-btn${annual?" active":""}`}  onClick={()=>setAnnual(true)}>
              Yearly <span style={{background:"#dcfce7",color:"#166534",borderRadius:50,padding:"1px 8px",fontSize:".72rem",marginLeft:4}}>Save 20%</span>
            </button>
          </div>

          {/* Plan cards */}
          <div className="row g-4 justify-content-center">
            {PLANS.map(plan => (
              <div key={plan.name} className="col-md-4">
                <div className={`pricing-card${plan.featured?" featured":""}`}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:plan.color}} />
                    <div className="pricing-plan-name">{plan.name}</div>
                  </div>
                  <div className="pricing-plan-desc">{plan.desc}</div>

                  <div style={{marginBottom:24}}>
                    {plan.monthly === "Custom" ? (
                      <div className="pricing-amount" style={{fontSize:"1.8rem"}}>Let's talk</div>
                    ) : (
                      <div>
                        <span className="pricing-amount">{annual ? plan.annual : plan.monthly}</span>
                        <span className="pricing-period">/month</span>
                        {annual && <div style={{fontSize:".78rem",color:"#16a34a",fontWeight:600,marginTop:4}}>Billed annually — Best Value</div>}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => navigate(plan.name==="Enterprise" ? "/" : "/signup")}
                    style={{
                      width:"100%", padding:"12px", borderRadius:10,
                      background:plan.featured?"#2f80ed":plan.name==="Enterprise"?"#0f172a":"#fff",
                      color:plan.featured||plan.name==="Enterprise"?"#fff":"#0f172a",
                      border: plan.featured||plan.name==="Enterprise" ? "none" : "1.5px solid #e2e8f0",
                      fontWeight:700, fontSize:".92rem", cursor:"pointer",
                      fontFamily:"inherit", marginBottom:24, transition:"all .2s",
                    } as React.CSSProperties}
                  >
                    {plan.cta} →
                  </button>

                  <div>
                    {plan.features.map(f => (
                      <div key={f.t} className="pricing-feature">
                        <span className={f.ok?"pricing-check":"pricing-cross"}>{f.ok?"✓":"✗"}</span>
                        <span style={{color:f.ok?"#374151":"#94a3b8"}}>{f.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison note */}
      <div style={{background:"#f8fafc",padding:"48px 0"}}>
        <div className="container-xl text-center">
          <p style={{color:"#64748b",fontSize:".93rem"}}>
            All plans include: SSL security · GDPR compliant · 99.9% uptime SLA · Data export · GST invoicing
          </p>
        </div>
      </div>

      {/* FAQ */}
      <section style={{background:"#fff",padding:"72px 0"}}>
        <div className="container-xl">
          <h2 style={{fontFamily:"Inter,sans-serif",fontWeight:800,fontSize:"clamp(1.4rem,3vw,2rem)",color:"#0f172a",letterSpacing:"-0.5px",marginBottom:8,textAlign:"center"}}>
            Frequently Asked Questions
          </h2>
          <p style={{color:"#64748b",textAlign:"center",marginBottom:40,fontSize:".95rem"}}>Everything you need to know before signing up.</p>
          <div style={{maxWidth:700,margin:"0 auto"}}>
            {FAQS.map((f,i) => (
              <div key={i} className="faq-item">
                <div className="faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                  {f.q}
                  <span style={{color:"#94a3b8",fontSize:"1.1rem",transition:"transform .2s",transform:openFaq===i?"rotate(45deg)":"none",display:"inline-block"}}>+</span>
                </div>
                {openFaq===i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pricing-cta">
        <div className="container-xl">
          <h2 style={{fontFamily:"Inter,sans-serif",fontWeight:800,fontSize:"clamp(1.5rem,3vw,2.4rem)",color:"#fff",letterSpacing:"-0.5px",marginBottom:12}}>
            Still not sure? Talk to our team.
          </h2>
          <p style={{color:"rgba(255,255,255,.6)",marginBottom:32,fontSize:".97rem"}}>
            We'll help you pick the right plan for your team's needs.
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>navigate("/signup")}
              style={{background:"#fff",color:"#0f172a",border:"none",borderRadius:10,padding:"12px 28px",fontWeight:700,fontSize:".95rem",cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>
              Start Free Trial →
            </button>
            <button style={{background:"transparent",color:"rgba(255,255,255,.8)",border:"1.5px solid rgba(255,255,255,.3)",borderRadius:10,padding:"12px 28px",fontWeight:600,fontSize:".95rem",cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>
              Book a Demo
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
