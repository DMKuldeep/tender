import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { PRODUCTS } from "../../../data/products";
import { fmt } from "../../../utils";

const STATS = [
  { lbl:"Active Bids",  num:"12",      icon:"⚡", bg:"#dbeafe", c:"#1d4ed8", trend:"+3 this week",  up:true  },
  { lbl:"Bids Won",     num:"8",       icon:"🏆", bg:"#dcfce7", c:"#15803d", trend:"+2 this month", up:true  },
  { lbl:"Total Value",  num:"₹4.2 Cr", icon:"💰", bg:"#fef9c3", c:"#b45309", trend:"+12% MoM",      up:true  },
  { lbl:"Win Rate",     num:"67%",     icon:"📈", bg:"#f3e8ff", c:"#7c3aed", trend:"-2% vs avg",    up:false },
];

const RECENT = [
  { id:"ORD-001", tender:"Road Construction Materials", value:"₹2.45 Cr", status:"Active",  date:"Apr 01" },
  { id:"ORD-002", tender:"Medical Equipment Supply",    value:"₹87.5 L",  status:"Won",     date:"Mar 22" },
  { id:"ORD-003", tender:"IT Hardware Procurement",     value:"₹32 L",    status:"Pending", date:"Apr 10" },
  { id:"ORD-004", tender:"School Furniture Supply",     value:"₹18.5 L",  status:"Lost",    date:"Mar 15" },
];

const ST: Record<string,{bg:string;c:string}> = {
  Active:{bg:"#dcfce7",c:"#166534"}, Won:{bg:"#dbeafe",c:"#1e40af"},
  Pending:{bg:"#fef9c3",c:"#854d0e"}, Lost:{bg:"#fee2e2",c:"#991b1b"},
};

const BARS = [30,50,45,70,55,80,65,90,75,60,85,95];

export default function DashOverview() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-2">
        <div>
          <h2 className="dash-page-title">Good morning, {user?.name?.split(" ")[0]} 👋</h2>
          <p className="dash-page-sub">{user?.tenant} · Here's your tender activity summary</p>
        </div>
        <button className="btn-bid" onClick={() => navigate("/tenders")}>+ Find Tenders</button>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {STATS.map(s => (
          <div key={s.lbl} className="col-6 col-xl-3">
            <div className="stat-card">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="stat-label">{s.lbl}</span>
                <div className="stat-icon" style={{ background:s.bg }}><span style={{color:s.c}}>{s.icon}</span></div>
              </div>
              <div className="stat-num" style={{ color:s.c }}>{s.num}</div>
              <div className={`stat-trend ${s.up?"trend-up":"trend-down"}`}>{s.up?"↑":"↓"} {s.trend}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:20}}>
            <div style={{fontWeight:700,color:"#0f172a",marginBottom:4}}>Bid Activity — 2025</div>
            <div style={{fontSize:".78rem",color:"#64748b",marginBottom:16}}>Monthly bids submitted vs won</div>
            <div className="mini-bar-chart" style={{height:80}}>
              {BARS.map((h,i) => (
                <div key={i} className={`mini-bar${i===7?" accent":""}`} style={{height:`${h}%`}} />
              ))}
            </div>
            <div style={{display:"flex",gap:16,marginTop:8,fontSize:".72rem",color:"#64748b"}}>
              <span>● Submitted</span><span style={{color:"var(--gem-teal)"}}>● Won</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:20,height:"100%"}}>
            <div style={{fontWeight:700,color:"#0f172a",marginBottom:16}}>Portal Distribution</div>
            {[{lbl:"GeM",w:"60%",c:"#2f80ed"},{lbl:"CPPP",w:"25%",c:"#0e9f85"},{lbl:"IREPS",w:"10%",c:"#f59e0b"},{lbl:"Others",w:"5%",c:"#94a3b8"}].map(r=>(
              <div key={r.lbl} className="mb-2">
                <div style={{display:"flex",justifyContent:"space-between",fontSize:".78rem",color:"#64748b",marginBottom:3}}>
                  <span>{r.lbl}</span><span>{r.w}</span>
                </div>
                <div style={{height:7,background:"#f1f5f9",borderRadius:4,overflow:"hidden"}}>
                  <div style={{height:"100%",width:r.w,background:r.c,borderRadius:4}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="gem-table mb-4">
        <div className="gem-table-header">
          <span className="gem-table-title">Recent Bids</span>
          <button className="btn-outline-gem" style={{fontSize:".8rem",padding:".35rem .8rem"}} onClick={()=>navigate("/dashboard/bids")}>View All →</button>
        </div>
        <div className="gem-table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Tender</th><th>Value</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {RECENT.map(r=>(
                <tr key={r.id}>
                  <td style={{color:"var(--gem-sky)",fontWeight:600,fontSize:".82rem"}}>{r.id}</td>
                  <td style={{fontWeight:500}}>{r.tender}</td>
                  <td style={{fontWeight:700,color:"#1a56a0"}}>{r.value}</td>
                  <td style={{color:"#64748b",fontSize:".82rem"}}>{r.date}</td>
                  <td><span className="status-pill" style={{background:ST[r.status]?.bg,color:ST[r.status]?.c}}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Suggested Tenders */}
      <div>
        <div style={{fontWeight:800,color:"#0f172a",marginBottom:12,fontSize:"1rem"}}>🎯 Recommended for You</div>
        <div className="row g-3">
          {PRODUCTS.slice(0,3).map(p=>(
            <div key={p.id} className="col-md-4">
              <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:18,cursor:"pointer",transition:"all .2s"}}
                onClick={()=>navigate(`/tenders/${p.id}`)}>
                <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:10}}>
                  <div style={{fontSize:"1.6rem"}}>{p.icon}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:".9rem",color:"#0f172a"}}>{p.title}</div>
                    <div style={{fontSize:".76rem",color:"#64748b"}}>{p.portal}</div>
                  </div>
                </div>
                <div style={{fontWeight:800,color:"#1a56a0",fontSize:"1.05rem"}}>{fmt(p.price)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
