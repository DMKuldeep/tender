const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const REVENUE = [62,78,85,91,88,104,98,115,109,122,118,134];
const BIDS    = [220,310,280,410,360,480,430,540,490,520,580,640];

const TOP_TENANTS = [
  { name:"TechSolutions Ltd",   bids:38, won:24, rate:"63%", revenue:"Custom" },
  { name:"Acme Infrastructure", bids:24, won:14, rate:"58%", revenue:"₹2,999" },
  { name:"BuildRight Corp",     bids:11, won:5,  rate:"45%", revenue:"₹999"   },
  { name:"GovWorks Inc",        bids:7,  won:2,  rate:"29%", revenue:"₹0"     },
];

const PORTAL_DATA = [
  { name:"GeM",         pct:45, c:"#2f80ed" },
  { name:"CPPP",        pct:30, c:"#0e9f85" },
  { name:"IREPS",       pct:14, c:"#f59e0b" },
  { name:"State Portal",pct:8,  c:"#7c3aed" },
  { name:"DPSU",        pct:3,  c:"#94a3b8" },
];

export default function AdminAnalytics() {
  const maxR = Math.max(...REVENUE);
  const maxB = Math.max(...BIDS);

  return (
    <div className="admin-content">
      <div style={{fontFamily:"Inter,sans-serif",fontWeight:800,fontSize:"1.3rem",color:"#0f172a",marginBottom:4}}>Platform Analytics</div>
      <div style={{fontSize:".87rem",color:"#64748b",marginBottom:24}}>Revenue, usage, and performance metrics — 2025</div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        {[
          {l:"Total Revenue",      v:"₹8.4L",  sub:"↑ 18% vs last year", c:"#1d4ed8", bg:"#dbeafe"},
          {l:"Total Bids Placed",  v:"5,280",   sub:"↑ 32% vs last year", c:"#15803d", bg:"#dcfce7"},
          {l:"Avg Win Rate",       v:"54%",     sub:"↑ 6% platform avg",  c:"#7c3aed", bg:"#f3e8ff"},
          {l:"Churn Rate",         v:"2.1%",    sub:"↓ 0.4% this quarter",c:"#dc2626", bg:"#fef2f2"},
        ].map(s => (
          <div key={s.l} className="col-6 col-xl-3">
            <div className="admin-stat">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <span className="admin-stat-label">{s.l}</span>
                <div style={{width:36,height:36,borderRadius:8,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem"}}>
                  {s.c==="#1d4ed8"?"💰":s.c==="#15803d"?"📋":s.c==="#7c3aed"?"🏆":"📉"}
                </div>
              </div>
              <div className="admin-stat-num" style={{color:s.c}}>{s.v}</div>
              <div style={{fontSize:".74rem",color:s.c,fontWeight:600,marginTop:2}}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="row g-3 mb-4">
        {/* Revenue chart */}
        <div className="col-md-7">
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:20}}>
            <div style={{fontWeight:700,color:"#0f172a",marginBottom:4}}>Monthly Revenue (₹ Thousands)</div>
            <div style={{fontSize:".78rem",color:"#64748b",marginBottom:16}}>Platform subscription + usage revenue</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:6,height:100}}>
              {REVENUE.map((v,i) => (
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{
                    width:"100%",height:`${(v/maxR)*100}%`,
                    borderRadius:"4px 4px 0 0",
                    background:i===11?"#ef4444":"#2f80ed",
                    opacity:i===11?1:.7,
                    minHeight:4,
                    transition:"opacity .2s"
                  }} />
                </div>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
              {MONTHS.map(m=>(
                <div key={m} style={{fontSize:".62rem",color:"#94a3b8",textAlign:"center",flex:1}}>{m}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Portal split */}
        <div className="col-md-5">
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:20,height:"100%"}}>
            <div style={{fontWeight:700,color:"#0f172a",marginBottom:16}}>Bids by Portal</div>
            {PORTAL_DATA.map(p => (
              <div key={p.name} style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:".82rem",marginBottom:4}}>
                  <span style={{color:"#374151",fontWeight:500}}>{p.name}</span>
                  <span style={{fontWeight:700,color:p.c}}>{p.pct}%</span>
                </div>
                <div style={{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${p.pct}%`,background:p.c,borderRadius:4,transition:"width .6s ease"}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bid volume chart */}
      <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:20,marginBottom:24}}>
        <div style={{fontWeight:700,color:"#0f172a",marginBottom:4}}>Monthly Bid Volume</div>
        <div style={{fontSize:".78rem",color:"#64748b",marginBottom:16}}>Total bids submitted across all tenants</div>
        <div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>
          {BIDS.map((v,i) => (
            <div key={i} style={{flex:1,height:`${(v/maxB)*100}%`,borderRadius:"3px 3px 0 0",background:"#0e9f85",opacity:i===11?1:.6,minHeight:4}} />
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
          {MONTHS.map(m=>(
            <div key={m} style={{fontSize:".62rem",color:"#94a3b8",textAlign:"center",flex:1}}>{m}</div>
          ))}
        </div>
      </div>

      {/* Top tenants performance */}
      <div className="admin-table">
        <div className="admin-table-header">
          <span className="admin-table-title">Top Tenant Performance</span>
        </div>
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr><th>Tenant</th><th>Bids Placed</th><th>Bids Won</th><th>Win Rate</th><th>Revenue</th></tr>
            </thead>
            <tbody>
              {TOP_TENANTS.map((t,i) => (
                <tr key={i}>
                  <td style={{fontWeight:600,color:"#0f172a"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:28,height:28,borderRadius:6,background:"#f1f5f9",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:".75rem",color:"#374151"}}>
                        {t.name[0]}
                      </div>
                      {t.name}
                    </div>
                  </td>
                  <td style={{color:"#374151"}}>{t.bids}</td>
                  <td style={{fontWeight:600,color:"#15803d"}}>{t.won}</td>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,height:6,background:"#f1f5f9",borderRadius:3,overflow:"hidden",minWidth:60}}>
                        <div style={{height:"100%",width:t.rate,background:parseInt(t.rate)>55?"#16a34a":"#f59e0b",borderRadius:3}} />
                      </div>
                      <span style={{fontSize:".8rem",fontWeight:700,color:"#374151"}}>{t.rate}</span>
                    </div>
                  </td>
                  <td style={{fontWeight:700,color:"#1a56a0"}}>{t.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
