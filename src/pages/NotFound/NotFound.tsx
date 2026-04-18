import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8fafc",padding:"40px 16px"}}>
      <div style={{textAlign:"center",maxWidth:480}}>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:"6rem",fontWeight:900,color:"#e2e8f0",lineHeight:1,marginBottom:16}}>404</div>
        <div style={{fontSize:"2rem",marginBottom:8}}>🔍</div>
        <h2 style={{fontFamily:"Inter,sans-serif",fontWeight:800,color:"#0f172a",fontSize:"1.5rem",marginBottom:10}}>Page Not Found</h2>
        <p style={{color:"#64748b",marginBottom:32,lineHeight:1.7}}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn-bid" style={{padding:".65rem 1.6rem"}} onClick={()=>navigate("/")}>← Go Home</button>
          <button className="btn-outline-gem" style={{padding:".65rem 1.6rem"}} onClick={()=>navigate("/tenders")}>Browse Tenders</button>
        </div>
      </div>
    </div>
  );
}
