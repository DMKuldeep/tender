import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../../data/products";
import { fmt, daysLeft } from "../../../utils";

export default function DashWatchlist() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState([1,2,4,6]);

  const watched = PRODUCTS.filter(p => saved.includes(p.id));
  const remove  = (id: number) => setSaved(s => s.filter(x => x !== id));

  return (
    <div>
      <h2 className="dash-page-title">Watchlist</h2>
      <p className="dash-page-sub">Tenders you've saved — {watched.length} items</p>

      {watched.length === 0 ? (
        <div style={{textAlign:"center",padding:"60px 20px",background:"#fff",borderRadius:12,border:"1px solid #e2e8f0"}}>
          <div style={{fontSize:"3rem",marginBottom:12}}>🔖</div>
          <h5 style={{color:"#0f172a",fontWeight:700}}>No saved tenders yet</h5>
          <p style={{color:"#64748b",marginBottom:16}}>Browse tenders and click the save button to add them here.</p>
          <button className="btn-bid" onClick={() => navigate("/tenders")}>Browse Tenders</button>
        </div>
      ) : (
        <div className="row g-3">
          {watched.map(p => {
            const dl = daysLeft(p.deadline);
            return (
              <div key={p.id} className="col-md-6">
                <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:20,position:"relative",transition:"all .2s",cursor:"pointer"}}
                  onClick={() => navigate(`/tenders/${p.id}`)}>
                  <button onClick={e=>{e.stopPropagation();remove(p.id)}}
                    style={{position:"absolute",top:12,right:12,background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:"1rem",padding:4}}>✕</button>
                  <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
                    <div style={{fontSize:"1.8rem"}}>{p.icon}</div>
                    <div>
                      <div style={{fontWeight:700,color:"#0f172a",fontSize:".95rem",marginBottom:3}}>{p.title}</div>
                      <span style={{background:"#f0f9ff",color:"#0284c7",border:"1px solid #bae6fd",borderRadius:50,padding:"2px 8px",fontSize:".72rem",fontWeight:700}}>{p.portal}</span>
                    </div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontWeight:800,color:"#1a56a0",fontSize:"1.05rem"}}>{fmt(p.price)}</div>
                    <div style={{fontSize:".78rem",color:dl<=7?"#dc2626":"#64748b",fontWeight:dl<=7?700:400}}>
                      {dl<=7?"⚠ ":""}{dl} days left
                    </div>
                  </div>
                  <div style={{marginTop:12}}>
                    <button className="btn-bid" style={{fontSize:".82rem",padding:".42rem .9rem",width:"100%"}}
                      onClick={e=>{e.stopPropagation();navigate(`/tenders/${p.id}`)}}>
                      Place Bid →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
