import { useState } from "react";

const ALERTS = [
  { id:1, keyword:"Infrastructure",  portal:"All",   freq:"Instant", active:true  },
  { id:2, keyword:"Medical Equipment",portal:"GeM",  freq:"Daily",   active:true  },
  { id:3, keyword:"IT Hardware",      portal:"GeM",  freq:"Weekly",  active:false },
  { id:4, keyword:"Solar Energy",     portal:"CPPP", freq:"Instant", active:true  },
];

export default function DashAlerts() {
  const [alerts, setAlerts] = useState(ALERTS);
  const [newKw, setNewKw]   = useState("");
  const [newPortal, setNewPortal] = useState("All");
  const [newFreq, setNewFreq]     = useState("Instant");

  const toggle = (id:number) => setAlerts(a => a.map(x => x.id===id ? {...x,active:!x.active} : x));
  const remove = (id:number) => setAlerts(a => a.filter(x => x.id!==id));

  const addAlert = () => {
    if (!newKw.trim()) return;
    setAlerts(a => [...a, { id:Date.now(), keyword:newKw, portal:newPortal, freq:newFreq, active:true }]);
    setNewKw("");
  };

  return (
    <div>
      <h2 className="dash-page-title">Alerts & Notifications</h2>
      <p className="dash-page-sub">Get notified when matching tenders are published</p>

      {/* Add alert */}
      <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:24,marginBottom:24}}>
        <div style={{fontWeight:700,color:"#0f172a",marginBottom:16}}>➕ Create New Alert</div>
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="gem-label">Keyword / Category</label>
            <input className="gem-input" placeholder="e.g. Road Construction" value={newKw} onChange={e=>setNewKw(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="gem-label">Portal</label>
            <select className="gem-input" value={newPortal} onChange={e=>setNewPortal(e.target.value)}>
              {["All","GeM","CPPP","IREPS","DPSU","State Portal"].map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <label className="gem-label">Frequency</label>
            <select className="gem-input" value={newFreq} onChange={e=>setNewFreq(e.target.value)}>
              {["Instant","Daily","Weekly"].map(f=><option key={f}>{f}</option>)}
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn-bid" style={{width:"100%",padding:".65rem"}} onClick={addAlert}>+ Add</button>
          </div>
        </div>
      </div>

      {/* Alert list */}
      <div className="gem-table">
        <div className="gem-table-header">
          <span className="gem-table-title">Active Alerts ({alerts.filter(a=>a.active).length})</span>
        </div>
        <div className="gem-table-wrap">
          <table>
            <thead><tr><th>Keyword</th><th>Portal</th><th>Frequency</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {alerts.map(a => (
                <tr key={a.id}>
                  <td style={{fontWeight:600,color:"#0f172a"}}>🔔 {a.keyword}</td>
                  <td><span style={{background:"#f0f9ff",color:"#0284c7",border:"1px solid #bae6fd",borderRadius:50,padding:"2px 8px",fontSize:".72rem",fontWeight:700}}>{a.portal}</span></td>
                  <td style={{color:"#64748b",fontSize:".85rem"}}>{a.freq}</td>
                  <td>
                    <span style={{background:a.active?"#dcfce7":"#f1f5f9",color:a.active?"#166534":"#64748b",borderRadius:50,padding:"3px 10px",fontSize:".74rem",fontWeight:700}}>
                      {a.active ? "Active" : "Paused"}
                    </span>
                  </td>
                  <td>
                    <div style={{display:"flex",gap:6}}>
                      <button className="btn-outline-gem" style={{fontSize:".76rem",padding:".25rem .6rem"}} onClick={()=>toggle(a.id)}>
                        {a.active ? "Pause" : "Resume"}
                      </button>
                      <button style={{background:"none",border:"1.5px solid #fecaca",color:"#dc2626",borderRadius:8,padding:".25rem .6rem",fontSize:".76rem",cursor:"pointer",fontFamily:"inherit"}} onClick={()=>remove(a.id)}>Delete</button>
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
