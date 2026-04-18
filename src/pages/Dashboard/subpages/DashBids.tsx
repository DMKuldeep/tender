import { useState } from "react";

const BIDS = [
  { id:"BID-2025-001", tender:"Road Construction Materials", portal:"CPPP", value:"₹2.45 Cr", submitted:"Apr 01", deadline:"Aug 18", status:"Active",  score:82 },
  { id:"BID-2025-002", tender:"Medical Equipment Supply",    portal:"GeM",  value:"₹87.5 L",  submitted:"Mar 22", deadline:"Aug 22", status:"Won",     score:91 },
  { id:"BID-2025-003", tender:"IT Hardware Procurement",     portal:"GeM",  value:"₹32 L",    submitted:"Apr 10", deadline:"Sep 01", status:"Pending", score:74 },
  { id:"BID-2025-004", tender:"School Furniture Supply",     portal:"State",value:"₹18.5 L",  submitted:"Mar 15", deadline:"Aug 25", status:"Lost",    score:58 },
  { id:"BID-2025-005", tender:"Water Treatment Plant",       portal:"CPPP", value:"₹6.7 Cr",  submitted:"Apr 05", deadline:"Sep 10", status:"Active",  score:88 },
  { id:"BID-2025-006", tender:"Solar Power Plant EPC",       portal:"CPPP", value:"₹14.5 Cr", submitted:"Apr 12", deadline:"Aug 30", status:"Pending", score:79 },
];

const ST: Record<string,{bg:string;c:string}> = {
  Active:{bg:"#dcfce7",c:"#166534"}, Won:{bg:"#dbeafe",c:"#1e40af"},
  Pending:{bg:"#fef9c3",c:"#854d0e"}, Lost:{bg:"#fee2e2",c:"#991b1b"},
};

export default function DashBids() {
  const [filter, setFilter] = useState("All");
  const tabs = ["All","Active","Won","Pending","Lost"];
  const filtered = filter === "All" ? BIDS : BIDS.filter(b => b.status === filter);

  return (
    <div>
      <h2 className="dash-page-title">My Bids</h2>
      <p className="dash-page-sub">Track and manage all your tender submissions</p>

      {/* Summary cards */}
      <div className="row g-3 mb-4">
        {[{lbl:"Total Bids",n:BIDS.length,c:"#1d4ed8",bg:"#dbeafe"},{lbl:"Active",n:2,c:"#15803d",bg:"#dcfce7"},{lbl:"Won",n:1,c:"#7c3aed",bg:"#f3e8ff"},{lbl:"Pending",n:2,c:"#b45309",bg:"#fef9c3"}].map(s=>(
          <div key={s.lbl} className="col-6 col-md-3">
            <div className="stat-card text-center">
              <div className="stat-num" style={{color:s.c,fontSize:"1.6rem"}}>{s.n}</div>
              <div className="stat-label">{s.lbl}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        {tabs.map(t=>(
          <button key={t} onClick={()=>setFilter(t)}
            style={{background:filter===t?"#0f172a":"#fff",color:filter===t?"#fff":"#374151",
              border:"1.5px solid",borderColor:filter===t?"#0f172a":"#e2e8f0",
              borderRadius:8,padding:"6px 14px",fontSize:".83rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
            {t}
          </button>
        ))}
      </div>

      <div className="gem-table">
        <div className="gem-table-header">
          <span className="gem-table-title">Bid History</span>
          <button className="btn-bid" style={{fontSize:".8rem",padding:".35rem .8rem"}}>+ New Bid</button>
        </div>
        <div className="gem-table-wrap">
          <table>
            <thead><tr><th>Bid ID</th><th>Tender</th><th>Portal</th><th>Value</th><th>Submitted</th><th>Deadline</th><th>Match %</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(b=>(
                <tr key={b.id}>
                  <td style={{color:"var(--gem-sky)",fontWeight:600,fontSize:".81rem"}}>{b.id}</td>
                  <td style={{fontWeight:500,maxWidth:180}}><div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.tender}</div></td>
                  <td><span style={{background:"#f0f9ff",color:"#0284c7",border:"1px solid #bae6fd",borderRadius:50,padding:"2px 8px",fontSize:".72rem",fontWeight:700}}>{b.portal}</span></td>
                  <td style={{fontWeight:700,color:"#1a56a0"}}>{b.value}</td>
                  <td style={{color:"#64748b",fontSize:".82rem"}}>{b.submitted}</td>
                  <td style={{color:"#64748b",fontSize:".82rem"}}>{b.deadline}</td>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{flex:1,height:6,background:"#f1f5f9",borderRadius:3,overflow:"hidden",minWidth:40}}>
                        <div style={{height:"100%",width:`${b.score}%`,background:b.score>80?"#16a34a":b.score>60?"#f59e0b":"#dc2626",borderRadius:3}} />
                      </div>
                      <span style={{fontSize:".75rem",fontWeight:700,color:"#374151"}}>{b.score}%</span>
                    </div>
                  </td>
                  <td><span className="status-pill" style={{background:ST[b.status]?.bg,color:ST[b.status]?.c}}>{b.status}</span></td>
                  <td><button className="btn-outline-gem" style={{fontSize:".76rem",padding:".25rem .6rem"}}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
