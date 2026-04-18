import { useState } from "react";

const DOCS = [
  { id:1, name:"Company_Registration.pdf",  type:"Legal",    size:"2.4 MB", date:"Jan 15", status:"Verified" },
  { id:2, name:"GST_Certificate.pdf",        type:"Tax",      size:"1.1 MB", date:"Jan 15", status:"Verified" },
  { id:3, name:"PAN_Card.pdf",               type:"Identity", size:"0.5 MB", date:"Feb 01", status:"Verified" },
  { id:4, name:"Bid_Road_NH48.pdf",          type:"Bid",      size:"4.2 MB", date:"Apr 01", status:"Submitted" },
  { id:5, name:"Technical_Proposal_IT.docx", type:"Bid",      size:"3.8 MB", date:"Apr 10", status:"Draft" },
  { id:6, name:"Financial_Statement_2024.pdf",type:"Finance", size:"6.1 MB", date:"Mar 20", status:"Verified" },
];

const ST: Record<string,{bg:string;c:string}> = {
  Verified:{bg:"#dcfce7",c:"#166534"}, Submitted:{bg:"#dbeafe",c:"#1e40af"}, Draft:{bg:"#fef9c3",c:"#854d0e"},
};

export default function DashDocuments() {
  const [docs] = useState(DOCS);
  return (
    <div>
      <h2 className="dash-page-title">Bid Documents</h2>
      <p className="dash-page-sub">Manage your company documents and bid submissions</p>

      {/* Upload */}
      <div style={{background:"#f0f9ff",border:"1.5px dashed #93c5fd",borderRadius:12,padding:28,textAlign:"center",marginBottom:24,cursor:"pointer"}}>
        <div style={{fontSize:"2rem",marginBottom:8}}>📤</div>
        <div style={{fontWeight:700,color:"#0f172a",marginBottom:4}}>Drop files here or click to upload</div>
        <div style={{fontSize:".82rem",color:"#64748b"}}>PDF, DOC, DOCX up to 10 MB each</div>
      </div>

      <div className="gem-table">
        <div className="gem-table-header">
          <span className="gem-table-title">My Documents ({docs.length})</span>
          <button className="btn-bid" style={{fontSize:".8rem",padding:".35rem .8rem"}}>+ Upload</button>
        </div>
        <div className="gem-table-wrap">
          <table>
            <thead><tr><th>File Name</th><th>Type</th><th>Size</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {docs.map(d=>(
                <tr key={d.id}>
                  <td style={{fontWeight:500}}>📄 {d.name}</td>
                  <td style={{color:"#64748b",fontSize:".82rem"}}>{d.type}</td>
                  <td style={{color:"#64748b",fontSize:".82rem"}}>{d.size}</td>
                  <td style={{color:"#64748b",fontSize:".82rem"}}>{d.date}</td>
                  <td><span className="status-pill" style={{background:ST[d.status]?.bg,color:ST[d.status]?.c}}>{d.status}</span></td>
                  <td>
                    <div style={{display:"flex",gap:6}}>
                      <button className="btn-outline-gem" style={{fontSize:".76rem",padding:".25rem .6rem"}}>Download</button>
                      <button style={{background:"none",border:"1.5px solid #fecaca",color:"#dc2626",borderRadius:8,padding:".25rem .6rem",fontSize:".76rem",cursor:"pointer",fontFamily:"inherit"}}>Delete</button>
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
