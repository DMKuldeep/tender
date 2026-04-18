import { useState } from "react";

const USERS = [
  { id:"USR-001", name:"Arjun Sharma",   email:"arjun@acme.in",     role:"Manager",  tenant:"Acme Infrastructure", lastLogin:"2h ago",  status:"Active" },
  { id:"USR-002", name:"Priya Mehta",    email:"priya@buildright.in",role:"Analyst",  tenant:"BuildRight Corp",     lastLogin:"1d ago",  status:"Active" },
  { id:"USR-003", name:"Rahul Verma",    email:"rahul@techsol.in",   role:"Admin",    tenant:"TechSolutions Ltd",   lastLogin:"5m ago",  status:"Active" },
  { id:"USR-004", name:"Sneha Kapoor",   email:"sneha@govworks.in",  role:"Viewer",   tenant:"GovWorks Inc",        lastLogin:"3d ago",  status:"Trial"  },
  { id:"USR-005", name:"Vikram Singh",   email:"vikram@acme.in",     role:"Analyst",  tenant:"Acme Infrastructure", lastLogin:"1h ago",  status:"Active" },
  { id:"USR-006", name:"Anita Roy",      email:"anita@infrabuild.in",role:"Manager",  tenant:"InfraBuild Pvt Ltd",  lastLogin:"2w ago",  status:"Inactive"},
];

const ST: Record<string,{bg:string;c:string}> = {
  Active:{bg:"#dcfce7",c:"#166534"}, Trial:{bg:"#fef9c3",c:"#854d0e"}, Inactive:{bg:"#f1f5f9",c:"#64748b"},
};
const RL: Record<string,{bg:string;c:string}> = {
  Admin:{bg:"#fef2f2",c:"#dc2626"}, Manager:{bg:"#f0f9ff",c:"#0284c7"}, Analyst:{bg:"#f5f3ff",c:"#7c3aed"}, Viewer:{bg:"#f8fafc",c:"#64748b"},
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.tenant.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-content">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:"Inter,sans-serif",fontWeight:800,fontSize:"1.3rem",color:"#0f172a",marginBottom:4}}>User Management</div>
          <div style={{fontSize:".87rem",color:"#64748b"}}>{USERS.length} users across all tenants</div>
        </div>
        <button className="btn-bid">+ Invite User</button>
      </div>

      <div className="admin-table">
        <div className="admin-table-header">
          <span className="admin-table-title">All Users</span>
          <input style={{border:"1.5px solid #e2e8f0",borderRadius:8,padding:"6px 12px",fontSize:".84rem",fontFamily:"inherit",color:"#374151"}}
            placeholder="🔍 Search..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div className="admin-table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Tenant</th><th>Last Login</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(u=>(
                <tr key={u.id}>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:30,height:30,borderRadius:"50%",background:"var(--gem-sky)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:".78rem",flexShrink:0}}>
                        {u.name.split(" ").map(w=>w[0]).join("")}
                      </div>
                      <span style={{fontWeight:600,color:"#0f172a"}}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{color:"#64748b",fontSize:".82rem"}}>{u.email}</td>
                  <td><span className="status-pill" style={{background:RL[u.role]?.bg,color:RL[u.role]?.c}}>{u.role}</span></td>
                  <td style={{fontSize:".83rem",color:"#374151"}}>{u.tenant}</td>
                  <td style={{color:"#64748b",fontSize:".82rem"}}>{u.lastLogin}</td>
                  <td><span className="status-pill" style={{background:ST[u.status]?.bg,color:ST[u.status]?.c}}>{u.status}</span></td>
                  <td>
                    <div style={{display:"flex",gap:4}}>
                      <button className="btn-outline-gem" style={{fontSize:".74rem",padding:".22rem .6rem"}}>Edit</button>
                      <button style={{background:"none",border:"1.5px solid #fecaca",color:"#dc2626",borderRadius:8,padding:".22rem .6rem",fontSize:".74rem",cursor:"pointer",fontFamily:"inherit"}}>Remove</button>
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
