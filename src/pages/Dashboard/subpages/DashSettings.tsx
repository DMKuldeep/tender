import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function DashSettings() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "", email: user?.email || "",
    phone: "+91 98765 43210", company: user?.company || "", gst: "27AABCU9603R1ZX",
  });
  const [notifs, setNotifs] = useState({ email:true, sms:false, browser:true, weekly:true });
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const tn = (k: keyof typeof notifs) => setNotifs(n => ({...n,[k]:!n[k]}));

  const Toggle = ({ on, onClick }: { on:boolean; onClick:()=>void }) => (
    <div onClick={onClick} style={{width:44,height:24,borderRadius:12,background:on?"var(--gem-sky)":"#e2e8f0",cursor:"pointer",position:"relative",transition:"all .2s",flexShrink:0}}>
      <div style={{width:18,height:18,borderRadius:9,background:"#fff",position:"absolute",top:3,left:on?23:3,transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}} />
    </div>
  );

  return (
    <div>
      <h2 className="dash-page-title">Settings</h2>
      <p className="dash-page-sub">Manage your account preferences and workspace</p>

      <div className="row g-4">
        {/* Profile */}
        <div className="col-lg-6">
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:24}}>
            <div style={{fontWeight:800,color:"#0f172a",marginBottom:18,fontSize:"1rem"}}>👤 Profile Information</div>
            <div className="d-flex flex-column gap-3">
              {([["Full Name","name"],["Email","email"],["Phone","phone"],["Company","company"],["GST No.","gst"]] as [string,keyof typeof form][]).map(([l,k])=>(
                <div key={k}>
                  <label className="gem-label">{l}</label>
                  <input className="gem-input" value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} />
                </div>
              ))}
            </div>
            <button className="btn-bid mt-4" style={{padding:".6rem 1.6rem"}} onClick={save}>
              {saved ? "✅ Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Notifications + Workspace */}
        <div className="col-lg-6 d-flex flex-column gap-4">
          {/* Notifications */}
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:24}}>
            <div style={{fontWeight:800,color:"#0f172a",marginBottom:18,fontSize:"1rem"}}>🔔 Notifications</div>
            {([["Email alerts for new tenders","email"],["SMS alerts","sms"],["Browser notifications","browser"],["Weekly digest email","weekly"]] as [string,keyof typeof notifs][]).map(([l,k])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f8fafc"}}>
                <span style={{fontSize:".88rem",color:"#374151"}}>{l}</span>
                <Toggle on={notifs[k]} onClick={()=>tn(k)} />
              </div>
            ))}
          </div>

          {/* Workspace */}
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:24}}>
            <div style={{fontWeight:800,color:"#0f172a",marginBottom:18,fontSize:"1rem"}}>🏢 Tenant Workspace (A)</div>
            {[["Plan","Premium Annual","#2f80ed"],["Users","3 / 10","#374151"],["Renews","Dec 31, 2025","#374151"],["API Calls","8,240 / 10,000","#374151"]].map(([l,v,c])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #f8fafc",fontSize:".87rem"}}>
                <span style={{color:"#64748b"}}>{l}</span>
                <span style={{fontWeight:700,color:c}}>{v}</span>
              </div>
            ))}
          </div>

          {/* Danger zone */}
          <div style={{background:"#fff8f8",border:"1px solid #fecaca",borderRadius:12,padding:24}}>
            <div style={{fontWeight:800,color:"#dc2626",marginBottom:12,fontSize:"1rem"}}>⚠ Danger Zone</div>
            <button style={{background:"none",border:"1.5px solid #fecaca",color:"#dc2626",borderRadius:8,padding:"8px 16px",fontSize:".84rem",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
