import { useState } from "react";

const TENANTS = [
  { id:"TEN-001", name:"Acme Infrastructure Ltd.", email:"admin@acme.in",   plan:"Premium",    users:8,  bids:24, joined:"Jan 15", status:"Active",   revenue:"₹2,999" },
  { id:"TEN-002", name:"BuildRight Corp",          email:"info@buildright.in",plan:"Starter",   users:5,  bids:11, joined:"Feb 02", status:"Active",   revenue:"₹999"   },
  { id:"TEN-003", name:"TechSolutions Ltd",        email:"ops@techsol.in",  plan:"Enterprise", users:12, bids:38, joined:"Jan 01", status:"Active",   revenue:"Custom" },
  { id:"TEN-004", name:"GovWorks Inc",             email:"gw@govworks.in",  plan:"Starter",    users:3,  bids:7,  joined:"Mar 20", status:"Trial",    revenue:"₹0"     },
  { id:"TEN-005", name:"InfraBuild Pvt Ltd",       email:"ib@infrabuild.in",plan:"Premium",    users:6,  bids:0,  joined:"Dec 10", status:"Inactive", revenue:"₹2,999" },
];

const ST: Record<string,{bg:string;c:string}> = {
  Active:{bg:"#dcfce7",c:"#166534"}, Trial:{bg:"#fef9c3",c:"#854d0e"}, Inactive:{bg:"#f1f5f9",c:"#64748b"},
};

export default function AdminTenants() {
  const [search, setSearch] = useState("");
  const filtered = TENANTS.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-content">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:"Inter,sans-serif",fontWeight:800,fontSize:"1.3rem",color:"#0f172a",marginBottom:4}}>Tenant Management</div>
          <div style={{fontSize:".87rem",color:"#64748b"}}>{TENANTS.length} tenants registered</div>
        </div>
        <button className="btn-bid">+ Add Tenant</button>
      </div>

      {/* Summary */}
      <div className="row g-3 mb-4">
        {[{l:"Total",n:TENANTS.length,c:"#1d4ed8"},{l:"Active",n:3,c:"#15803d"},{l:"Trial",n:1,c:"#b45309"},{l:"Inactive",n:1,c:"#64748b"}].map(s=>(
          <div key={s.l} className="col-6 col-md-3">
            <div className="admin-stat text-center">
              <div className="admin-stat-num" style={{color:s.c,fontSize:"1.6rem"}}>{s.n}</div>
              <div className="admin-stat-label">{s.l} Tenants</div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-table">
        <div className="admin-table-header">
          <span className="admin-table-title">All Tenants</span>
          <input style={{border:"1.5px solid #e2e8f0",borderRadius:8,padding:"6px 12px",fontSize:".84rem",fontFamily:"inherit",color:"#374151"}}
            placeholder="🔍 Search tenants..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div className="admin-table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Company</th><th>Email</th><th>Plan</th><th>Users</th><th>Bids</th><th>Joined</th><th>Revenue</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(t=>(
                <tr key={t.id}>
                  <td style={{color:"var(--gem-sky)",fontWeight:600,fontSize:".8rem"}}>{t.id}</td>
                  <td style={{fontWeight:600,color:"#0f172a"}}>{t.name}</td>
                  <td style={{color:"#64748b",fontSize:".82rem"}}>{t.email}</td>
                  <td><span style={{background:"#f0f9ff",color:"#0284c7",border:"1px solid #bae6fd",borderRadius:50,padding:"2px 8px",fontSize:".72rem",fontWeight:700}}>{t.plan}</span></td>
                  <td>{t.users}</td>
                  <td style={{fontWeight:600,color:"#1a56a0"}}>{t.bids}</td>
                  <td style={{color:"#64748b",fontSize:".82rem"}}>{t.joined}</td>
                  <td style={{fontWeight:700,color:"#0f172a"}}>{t.revenue}</td>
                  <td><span className="status-pill" style={{background:ST[t.status]?.bg,color:ST[t.status]?.c}}>{t.status}</span></td>
                  <td>
                    <div style={{display:"flex",gap:4}}>
                      <button className="btn-outline-gem" style={{fontSize:".74rem",padding:".22rem .6rem"}}>Edit</button>
                      <button style={{background:"none",border:"1.5px solid #fecaca",color:"#dc2626",borderRadius:8,padding:".22rem .6rem",fontSize:".74rem",cursor:"pointer",fontFamily:"inherit"}}>
                        {t.status==="Active"?"Suspend":"Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
