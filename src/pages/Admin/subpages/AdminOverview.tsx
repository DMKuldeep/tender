const STATS = [
  { lbl:"Total Tenants",   num:"24",    icon:"🏢", bg:"#dbeafe", c:"#1d4ed8", trend:"+3 this month" },
  { lbl:"Active Users",    num:"1,284", icon:"👥", bg:"#dcfce7", c:"#15803d", trend:"+42 this week"  },
  { lbl:"Live Tenders",    num:"2,401", icon:"📋", bg:"#fef9c3", c:"#b45309", trend:"+128 today"     },
  { lbl:"Platform Revenue",num:"₹8.4L", icon:"💰", bg:"#f3e8ff", c:"#7c3aed", trend:"+18% MoM"      },
];

const TENANT_ACTIVITY = [
  { name:"Acme Infrastructure", tenant:"A", users:8,  bids:24, plan:"Premium",    status:"Active"   },
  { name:"BuildRight Corp",     tenant:"B", users:5,  bids:11, plan:"Starter",    status:"Active"   },
  { name:"TechSolutions Ltd",   tenant:"C", users:12, bids:38, plan:"Enterprise", status:"Active"   },
  { name:"GovWorks Inc",        tenant:"A", users:3,  bids:7,  plan:"Starter",    status:"Trial"    },
  { name:"InfraBuild Pvt Ltd",  tenant:"B", users:6,  bids:15, plan:"Premium",    status:"Inactive" },
];

const ST: Record<string,{bg:string;c:string}> = {
  Active:{bg:"#dcfce7",c:"#166534"}, Trial:{bg:"#fef9c3",c:"#854d0e"}, Inactive:{bg:"#f1f5f9",c:"#64748b"},
};
const TC: Record<string,string> = { A:"tenant-a", B:"tenant-b", C:"tenant-c" };

const BARS = [40,55,48,70,62,80,72,90,78,65,88,95];

export default function AdminOverview() {
  return (
    <div className="admin-content">
      <div style={{fontFamily:"Inter,sans-serif",fontWeight:800,fontSize:"1.3rem",color:"#0f172a",marginBottom:4}}>Platform Overview</div>
      <div style={{fontSize:".87rem",color:"#64748b",marginBottom:24}}>Real-time stats across all tenants and portals</div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {STATS.map(s=>(
          <div key={s.lbl} className="col-6 col-xl-3">
            <div className="admin-stat">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span className="admin-stat-label">{s.lbl}</span>
                <div style={{width:38,height:38,borderRadius:10,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem"}}>{s.icon}</div>
              </div>
              <div className="admin-stat-num" style={{color:s.c}}>{s.num}</div>
              <div className="admin-stat-trend" style={{color:"#16a34a"}}>↑ {s.trend}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + summary */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:20}}>
            <div style={{fontWeight:700,color:"#0f172a",marginBottom:4}}>Platform Growth — 2025</div>
            <div style={{fontSize:".78rem",color:"#64748b",marginBottom:16}}>Monthly active tenants and bid volume</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:5,height:90}}>
              {BARS.map((h,i)=>(
                <div key={i} style={{flex:1,height:`${h}%`,borderRadius:"3px 3px 0 0",background:i===11?"#ef4444":"#2f80ed",opacity:i===11?1:.65,transition:"opacity .2s",minWidth:6}} />
              ))}
            </div>
            <div style={{display:"flex",gap:16,marginTop:8,fontSize:".72rem",color:"#64748b"}}>
              <span style={{color:"#2f80ed"}}>● Tenants</span><span style={{color:"#ef4444"}}>● This Month</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:20,height:"100%"}}>
            <div style={{fontWeight:700,color:"#0f172a",marginBottom:14}}>Plan Distribution</div>
            {[{l:"Enterprise",v:"38%",c:"#0f172a"},{l:"Premium",v:"45%",c:"#2f80ed"},{l:"Starter",v:"17%",c:"#94a3b8"}].map(r=>(
              <div key={r.l} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:".78rem",color:"#64748b",marginBottom:3}}><span>{r.l}</span><span style={{fontWeight:700,color:r.c}}>{r.v}</span></div>
                <div style={{height:7,background:"#f1f5f9",borderRadius:4,overflow:"hidden"}}>
                  <div style={{height:"100%",width:r.v,background:r.c,borderRadius:4}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tenant table */}
      <div className="admin-table">
        <div className="admin-table-header">
          <span className="admin-table-title">Recent Tenant Activity</span>
          <button className="btn-bid" style={{fontSize:".8rem",padding:".35rem .8rem"}}>View All Tenants</button>
        </div>
        <div className="admin-table-wrap">
          <table>
            <thead><tr><th>Company</th><th>Tenant</th><th>Users</th><th>Bids</th><th>Plan</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {TENANT_ACTIVITY.map((t,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600,color:"#0f172a"}}>{t.name}</td>
                  <td><span className={`status-pill ${TC[t.tenant]}`}>{t.tenant}</span></td>
                  <td style={{color:"#374151"}}>{t.users}</td>
                  <td style={{fontWeight:600,color:"#1a56a0"}}>{t.bids}</td>
                  <td style={{color:"#64748b",fontSize:".83rem"}}>{t.plan}</td>
                  <td><span className="status-pill" style={{background:ST[t.status]?.bg,color:ST[t.status]?.c}}>{t.status}</span></td>
                  <td><button className="btn-outline-gem" style={{fontSize:".76rem",padding:".25rem .6rem"}}>Manage</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
