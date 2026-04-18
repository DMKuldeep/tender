import { useState } from "react";

const PLANS = [
  { name:"Starter",  price:"₹999/mo",  features:["5 users","100 tender alerts","2 portals","Email support"],        current:false, color:"#e2e8f0" },
  { name:"Premium",  price:"₹2,999/mo", features:["25 users","Unlimited alerts","All portals","Priority support","Custom reports"], current:true,  color:"#2f80ed" },
  { name:"Enterprise",price:"Custom",  features:["Unlimited users","Dedicated manager","SLA","API access","White-label"], current:false, color:"#0f172a" },
];

const INVOICES = [
  { id:"INV-2025-004", date:"Apr 01, 2025", amount:"₹2,999", status:"Paid" },
  { id:"INV-2025-003", date:"Mar 01, 2025", amount:"₹2,999", status:"Paid" },
  { id:"INV-2025-002", date:"Feb 01, 2025", amount:"₹2,999", status:"Paid" },
  { id:"INV-2025-001", date:"Jan 01, 2025", amount:"₹2,999", status:"Paid" },
];

export default function DashBilling() {
  const [selected, setSelected] = useState("Premium");

  return (
    <div>
      <h2 className="dash-page-title">Subscription & Billing</h2>
      <p className="dash-page-sub">Manage your plan and payment history</p>

      {/* Current plan banner */}
      <div style={{background:"linear-gradient(135deg,#1d4ed8,#2f80ed)",borderRadius:12,padding:24,marginBottom:28,color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:".78rem",opacity:.7,fontWeight:600,marginBottom:4}}>CURRENT PLAN</div>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:"1.4rem",fontWeight:800}}>Premium Annual</div>
          <div style={{opacity:.75,fontSize:".87rem",marginTop:4}}>Renews December 31, 2025 · ₹2,999/month</div>
        </div>
        <button style={{background:"rgba(255,255,255,.15)",border:"1.5px solid rgba(255,255,255,.3)",color:"#fff",borderRadius:10,padding:"10px 20px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:".9rem"}}>
          Manage Plan
        </button>
      </div>

      {/* Plan cards */}
      <div className="row g-3 mb-4">
        {PLANS.map(p => (
          <div key={p.name} className="col-md-4">
            <div style={{background:"#fff",border:`2px solid ${p.current?"#2f80ed":"#e2e8f0"}`,borderRadius:14,padding:24,height:"100%",cursor:"pointer",transition:"all .2s"}}
              onClick={() => setSelected(p.name)}>
              {p.current && <div style={{background:"#2f80ed",color:"#fff",borderRadius:50,padding:"2px 12px",fontSize:".72rem",fontWeight:700,display:"inline-block",marginBottom:10}}>CURRENT</div>}
              <div style={{fontWeight:800,fontSize:"1.1rem",color:"#0f172a",marginBottom:4}}>{p.name}</div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:"1.4rem",fontWeight:800,color:p.current?"#2f80ed":"#0f172a",marginBottom:16}}>{p.price}</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {p.features.map(f => <div key={f} style={{fontSize:".84rem",color:"#374151"}}>✅ {f}</div>)}
              </div>
              {!p.current && (
                <button className="btn-bid" style={{width:"100%",marginTop:16,fontSize:".85rem"}}>Switch Plan</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Invoice history */}
      <div className="gem-table">
        <div className="gem-table-header">
          <span className="gem-table-title">Invoice History</span>
          <button className="btn-outline-gem" style={{fontSize:".8rem",padding:".35rem .8rem"}}>Download All</button>
        </div>
        <div className="gem-table-wrap">
          <table>
            <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {INVOICES.map(inv=>(
                <tr key={inv.id}>
                  <td style={{color:"var(--gem-sky)",fontWeight:600,fontSize:".82rem"}}>{inv.id}</td>
                  <td style={{color:"#64748b"}}>{inv.date}</td>
                  <td style={{fontWeight:700,color:"#0f172a"}}>{inv.amount}</td>
                  <td><span style={{background:"#dcfce7",color:"#166534",borderRadius:50,padding:"2px 10px",fontSize:".74rem",fontWeight:700}}>{inv.status}</span></td>
                  <td><button className="btn-outline-gem" style={{fontSize:".76rem",padding:".25rem .6rem"}}>📄 PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
