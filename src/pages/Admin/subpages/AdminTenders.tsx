import { useState } from "react";
import { PRODUCTS } from "../../../data/products";
import { fmt, daysLeft } from "../../../utils";

const STATUS_MAP: Record<string,{bg:string;c:string}> = {
  Active:{bg:"#dcfce7",c:"#166534"}, Hot:{bg:"#fef2f2",c:"#dc2626"},
  New:{bg:"#fef9c3",c:"#854d0e"}, Expired:{bg:"#f1f5f9",c:"#64748b"},
};

export default function AdminTenders() {
  const [search, setSearch] = useState("");
  const [filterPortal, setFilterPortal] = useState("All");

  const portals = ["All", "GeM", "CPPP", "IREPS", "DPSU", "State Portal"];
  const filtered = PRODUCTS
    .filter(p => filterPortal === "All" || p.portal === filterPortal)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-content">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:"Inter,sans-serif",fontWeight:800,fontSize:"1.3rem",color:"#0f172a",marginBottom:4}}>Tender Management</div>
          <div style={{fontSize:".87rem",color:"#64748b"}}>{PRODUCTS.length} tenders in system</div>
        </div>
        <button className="btn-bid">+ Add Tender</button>
      </div>

      {/* Summary stats */}
      <div className="row g-3 mb-4">
        {[
          {l:"Total Tenders", n:PRODUCTS.length, c:"#1d4ed8"},
          {l:"Active",        n:PRODUCTS.filter(p=>p.badge==="Active").length, c:"#15803d"},
          {l:"Hot",           n:PRODUCTS.filter(p=>p.badge==="Hot").length,    c:"#dc2626"},
          {l:"New",           n:PRODUCTS.filter(p=>p.badge==="New").length,    c:"#b45309"},
        ].map(s => (
          <div key={s.l} className="col-6 col-md-3">
            <div className="admin-stat text-center">
              <div className="admin-stat-num" style={{color:s.c,fontSize:"1.6rem"}}>{s.n}</div>
              <div className="admin-stat-label">{s.l}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
        <input
          style={{border:"1.5px solid #e2e8f0",borderRadius:8,padding:"7px 12px",fontSize:".84rem",fontFamily:"inherit",color:"#374151",flex:1,minWidth:200}}
          placeholder="🔍 Search tenders..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select
          style={{border:"1.5px solid #e2e8f0",borderRadius:8,padding:"7px 12px",fontSize:".84rem",fontFamily:"inherit",color:"#374151",background:"#fff"}}
          value={filterPortal} onChange={e=>setFilterPortal(e.target.value)}>
          {portals.map(p=><option key={p}>{p}</option>)}
        </select>
      </div>

      <div className="admin-table">
        <div className="admin-table-header">
          <span className="admin-table-title">All Tenders ({filtered.length})</span>
          <button className="btn-outline-gem" style={{fontSize:".8rem",padding:".35rem .8rem"}}>Export CSV</button>
        </div>
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tender No.</th><th>Title</th><th>Category</th><th>Portal</th>
                <th>Value</th><th>Deadline</th><th>Days Left</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const dl = daysLeft(p.deadline);
                return (
                  <tr key={p.id}>
                    <td style={{color:"var(--gem-sky)",fontWeight:600,fontSize:".8rem"}}>{p.tender_no}</td>
                    <td style={{fontWeight:500,maxWidth:160}}>
                      <div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.title}</div>
                    </td>
                    <td style={{color:"#64748b",fontSize:".82rem"}}>{p.category}</td>
                    <td>
                      <span style={{background:"#f0f9ff",color:"#0284c7",border:"1px solid #bae6fd",borderRadius:50,padding:"2px 8px",fontSize:".72rem",fontWeight:700}}>
                        {p.portal}
                      </span>
                    </td>
                    <td style={{fontWeight:700,color:"#1a56a0"}}>{fmt(p.price)}</td>
                    <td style={{color:"#64748b",fontSize:".82rem"}}>{p.deadline}</td>
                    <td style={{color:dl<=7?"#dc2626":"#374151",fontWeight:dl<=7?700:400,fontSize:".83rem"}}>
                      {dl<=7?"⚠ ":""}{dl}d
                    </td>
                    <td>
                      <span className="status-pill" style={{
                        background:STATUS_MAP[p.badge||"Active"]?.bg,
                        color:STATUS_MAP[p.badge||"Active"]?.c
                      }}>
                        {p.badge||"Active"}
                      </span>
                    </td>
                    <td>
                      <div style={{display:"flex",gap:4}}>
                        <button className="btn-outline-gem" style={{fontSize:".74rem",padding:".22rem .6rem"}}>Edit</button>
                        <button style={{background:"none",border:"1.5px solid #fecaca",color:"#dc2626",borderRadius:8,padding:".22rem .6rem",fontSize:".74rem",cursor:"pointer",fontFamily:"inherit"}}>
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
